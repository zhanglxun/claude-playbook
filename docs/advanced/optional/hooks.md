# Hooks：自动检查与记录

> 内容核对日期：2026-10-18；选学内容。部分功能为研究预览/公测，且按套餐和版本开放，请以官方文档为准。

**适合谁**：想把"每次都要检查一遍"的事情交给机器、对配置文件不排斥的人。本页偏专业，看不懂可以先跳过，不影响核心课程。

**学完这页你能**：说清 Hooks 是什么；看懂一段 Hooks 配置；让 Claude Code 在保存文件前自动检查命名、在改动后自动记一笔日志，并在检查不通过时拦住动作。

## Hooks 是什么

Hooks 直译是"钩子"。你可以把它想成**门口的保安**：Claude Code 每做一类动作（比如写文件、运行命令、结束一轮回答），保安就按你事先写好的规矩看一眼，该放行放行，该记录记录，不合规就拦下。

它和 CLAUDE.md 的区别要分清：

| | CLAUDE.md（3.6） | Hooks |
|---|---|---|
| 性质 | 写给 Claude 的"要求"，它大概率照做 | 由程序自动执行的"规矩"，每次必执行 |
| 能否被"忘记" | 可能 | 不会 |
| 适合 | 写作风格、业务背景 | 命名检查、留痕、拦截危险操作 |

> 术语：Hooks 在特定时机运行的是**命令**（shell command，就是你在终端里能敲的那种指令）。你不需要自己会写，可以让 Claude 帮你写，但要看懂它在检查什么。

## 常用的"时机"

| 时机（事件名） | 什么时候触发 | 业务上能干什么 |
|---|---|---|
| `PreToolUse` | 工具动作执行**之前**，可以拦截 | 保存前检查文件名；禁止改某些文件 |
| `PostToolUse` | 工具动作成功**之后** | 记操作日志；自动整理格式 |
| `UserPromptSubmit` | 你提交提问、Claude 处理之前 | 自动补充当天日期等信息 |
| `Notification` | Claude 在等你确认或输入时 | 弹桌面通知，不用盯着屏幕 |
| `Stop` | Claude 回答结束时 | 收尾检查 |
| `SessionStart` | 会话开始或恢复时 | 开场自动载入背景资料 |

此外还有"匹配器"（matcher）：用来限定只对哪些工具生效，例如 `Edit|Write` 表示只在"修改文件"和"新建文件"时触发。

## 失败时如何阻止动作

Hooks 通过**退出码**告诉 Claude Code 结果：

- **退出码 0**：没有意见，继续。
- **退出码 2**：**拦下这个动作**，并把你写的原因反馈给 Claude，它会据此调整做法。
- 其他退出码：多数情况下只是报个非阻止性错误，动作照常进行。

所以"要拦截"就让检查脚本以退出码 2 结束，并把原因写到错误输出里。注意：只有 `PreToolUse` 这类"动作之前"的时机才能真正拦住；`PostToolUse` 时动作已经发生了。

<!-- TODO 核实：各事件对退出码 2 的具体表现不同，已按官方 hooks-guide 保守描述，细节请对照 hooks 参考页的 exit code 2 behavior per event -->

## 配置放在哪里

Hooks 写在设置文件的 `hooks` 区块里：

- `.claude/settings.json`：只对当前项目文件夹生效，可随项目共享
- `~/.claude/settings.json`：个人全局设置，对所有项目生效

配好后，在 Claude Code 里输入 `/hooks`（在对话框里输入，不是在系统终端）可以查看已生效的 Hooks，确认配置没写错。

## 业务例子一：保存前检查文件命名

场景：某虚构公司"晨星贸易"规定，报价文件必须叫 `报价_客户简称_日期.xlsx` 这类格式。希望 Claude 在 `quotes/` 文件夹里新建文件时自动校验。

在项目的 `.claude/settings.json` 里加入：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/check-name.sh"
          }
        ]
      }
    ]
  }
}
```

再准备检查脚本 `.claude/hooks/check-name.sh`（示意，路径和规则按你的业务改）：

```bash
#!/bin/bash
# 从 Claude Code 传来的信息里取出即将写入的文件路径
FILE=$(jq -r '.tool_input.file_path')

# 只检查 quotes 文件夹
case "$FILE" in
  */quotes/*)
    NAME=$(basename "$FILE")
    if [[ ! "$NAME" =~ ^报价_.+_[0-9]{8}\. ]]; then
      echo "文件名不合规：应为 报价_客户简称_日期(8位数字).扩展名" >&2
      exit 2   # 退出码 2：拦下这次保存，原因会反馈给 Claude
    fi
    ;;
esac
exit 0
```

这个例子依赖 `jq`（一个读取数据的小工具），需要提前装好；脚本需要加上可执行权限。这些步骤不确定怎么做时，直接让 Claude 帮你完成并解释。

效果：Claude 如果想保存一个叫 `新报价.xlsx` 的文件，会被拦下并收到"文件名不合规"的原因，随后自己改成合规的名字再保存。

## 业务例子二：自动记录操作日志

场景：需要留痕"今天 Claude 改过哪些文件"。用 `PostToolUse`，每次改完文件追加一行：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' >> \"$CLAUDE_PROJECT_DIR\"/.claude/edit-log.txt"
          }
        ]
      }
    ]
  }
}
```

之后打开 `.claude/edit-log.txt` 就能看到被改动的文件清单。想加上时间，可以让 Claude 帮你扩充这条命令。

## 安全提醒

- Hooks 是**以你的电脑权限运行的命令**，只配置你看得懂、信任的内容；不要照搬来路不明的配置。
- 匹配器尽量写窄。官方文档特别提醒：用 Hooks 自动批准权限时，匹配器留空会放行所有操作，风险很大。
- 日志里可能含文件名等业务信息，注意不要把日志文件分享到公开位置。

## 动手任务

1. 让 Claude 帮你在练习文件夹里配置"例子二"的日志 Hook：

```text
请在当前项目的 .claude/settings.json 里添加一个 PostToolUse Hook：
每次修改或新建文件后，把文件路径追加记录到【日志文件名，如 .claude/edit-log.txt】。
添加后用 /hooks 带我确认它已生效，并解释这段配置每一行的作用。
```

2. 让 Claude 随便新建两个文件，打开日志文件核对是否有记录。
3. 进阶：参照"例子一"，把你们公司的一条真实命名规则做成拦截检查，故意用错误名字试一次，观察是否被拦下。

## 小结

- Hooks 是"自动执行的规矩"，比口头要求更可靠。
- 想拦截，用"动作之前"的时机加退出码 2；想留痕，用"动作之后"的时机。
- 配完用 `/hooks` 检查；只配置自己信任的内容。

下一页：[动态工作流](/advanced/optional/workflows)　|　返回 [高级篇导览](/advanced/)
