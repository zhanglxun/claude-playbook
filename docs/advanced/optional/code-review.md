# 代码与安全审查（研发向）

> 内容核对日期：2026-10-18；选学内容。部分功能为研究预览/公测，且按套餐和版本开放，请以官方文档为准。

::: tip 面向研发
本页面向研发团队（写代码、管代码仓库的人）。非研发岗位可以跳过。
:::

**适合谁**：团队里有人写代码、用 GitHub 或 GitLab 管理代码的研发人员或技术负责人。

**学完能**：用 `/code-review` 在本地检查改动里的错误；知道什么时候该用更深的云端审查 `/ultrareview`；知道安全扫描类插件各自管什么；了解怎样把审查接入 GitHub Actions 或 GitLab CI。

## 先理解"分层防护"

代码质量和安全不靠某一个工具，而是多层叠加，越早发现越省事：

| 阶段 | 工具 | 管什么 |
|---|---|---|
| 写代码时 | `security-guidance` 插件 | Claude 写代码的同时检查常见漏洞，并在同一会话里修掉 |
| 随时按需，单次 | `/code-review` | 检查当前分支的改动，找出会出错的地方 |
| 随时按需，深度 | `/code-review ultra`（别名 `/ultrareview`） | 云端多个"审查员"并行检查并逐条复现验证 |
| 随时按需，安全扫描 | `claude-security` 插件 | 对整个代码仓库或某次改动做多代理漏洞扫描，并给出补丁 |
| 提交合并请求时 | GitHub Actions / GitLab CI | 自动化触发 Claude 做审查或处理任务 |
| 流水线里 | 你们现有的静态分析、依赖扫描 | 语言专属规则、供应链检查，Claude 不替代它们 |

## 一、/code-review：本地快速审查

在会话里输入：

```text
/code-review
```

不带参数时，它审查你当前分支比上游多出的提交，加上尚未提交的修改。它在后台作为一个子代理运行，有自己的上下文，不会占满你的对话；结果出来后回到对话里。**任何套餐都能用**，用量计入你的正常额度。

指定审查对象：

| 想审查 | 输入 |
|---|---|
| 当前分支和未提交的修改 | `/code-review` |
| 某个合并请求（按编号） | `/code-review 1234` |
| 两个分支之间的差异 | `/code-review main...my-feature` |
| 某个文件夹 | `/code-review src/auth` |

常用选项：

- `--fix`：审查后让 Claude 把发现的问题改到你的工作区里（改动仍要经过你的权限模式）。
- `--comment`：把审查结果作为评论贴到 GitHub 合并请求上（GitLab 合并请求需要装 `glab` 命令行）。
- `--max-findings 数量`：最多报告几条（需 2.1.288 及以上）。
- 推理强度：加上 `low` 到 `max`，如 `/code-review high`。`low` 只报最有把握的，误报少；更高的级别覆盖更广。不写时会沿用你上次写的级别。

使用提醒：

- 审查**默认只出报告**；加了 `--fix` 才会改文件。用 `--fix` 后，后台审查的改动不一定能被 `/rewind` 撤回，请用 Git 检查和还原。
- 审查会遵循你的 `CLAUDE.md`，想让它按团队的规矩审，就把规则写进去。
- `/review` 是 `/code-review` 的别名（2.1.223 起）。
- 同类命令：`/simplify` 只做精简整理并直接修改；`/security-review` 对当前分支做一次安全检查。

## 二、/ultrareview：云端深度审查（研究预览）

当你要在合并前对一次较大的改动"再把一道关"，可以用：

```text
/code-review ultra
```

（官方说明：当 ultrareview 对你的账号可用时，`/ultrareview` 是它的别名。）

特点：在 Anthropic 云端沙箱里放出一组审查代理并行检查，**每条结果都会被独立复现验证**，所以更少误报；运行大约 15–25 分钟，期间你可以继续做别的。

使用前要知道：

- 必须用 claude.ai 账号登录；Bedrock、Foundry 等第三方平台、开了零数据保留或 HIPAA 配置的组织不可用（会退回本地审查）。
- 它按**使用额度（usage credits）计费**，Pro 和 Max 有一次性的免费次数，用完后按量付费。启动前的确认对话框会显示预估费用。具体数字请以官方页面为准，这里不写。
- 审查分支时会把仓库内容上传到云端沙箱；审查 GitHub 合并请求（`/code-review ultra 1234`）则直接在云端克隆，不上传你的本地文件。**涉及敏感代码前，请先确认公司规定。**
- 可以在脚本里用 `claude ultrareview`（带可选的 `--json`、`--timeout`），它会等待结果并打印到标准输出。

## 三、安全扫描插件

两个插件都通过 `/plugin install` 从官方市场安装，**都以你的权限运行**（见 [插件与 Mods](/advanced/optional/plugins-mods)）：

### security-guidance：边写边查

安装后自动运行，不需要额外命令：

```text
/plugin install security-guidance@claude-plugins-official
```

它在三个时机检查：每次改文件（快速模式匹配，不额外消耗额度）；每个回合结束（后台由另一个 Claude 审改动）；Claude 执行提交或推送时（更深入的审查）。它**不会阻止**写入或提交，只是把发现的问题交给 Claude 去修，所以只能当作"一层防护"，不能当作完整的安全方案。需要 Python 3.7 及以上和一个 Git 仓库。

### claude-security：整库漏洞扫描

```text
/plugin install claude-security@claude-plugins-official
```

装好后用 `/claude-security` 打开菜单，三个功能：扫描整个仓库、只扫描某次改动（分支、合并请求、单个提交）、对选中的问题生成补丁。每个问题都经过独立验证才写进报告；补丁**永远不会自动应用**，由你用 `git apply` 决定，并且建议每个补丁单独走一次代码评审。结果写入仓库里带时间戳的 `CLAUDE-SECURITY-…` 文件夹。扫描要消耗相当多的额度，需要 Python 3.9 及以上。

## 四、接入 GitHub Actions 与 GitLab CI

### GitHub Actions

Claude Code GitHub Action 让你在 GitHub 的工作流里运行 Claude：在合并请求或议题评论里输入 `@claude`，它就会分析代码、改代码、推送提交；也可以按事件自动触发。

- **快速安装**：在项目里运行 `/install-github-app`，按提示安装 Claude 的 GitHub 应用、保存认证密钥、生成工作流文件的合并请求（只支持 github.com，需要仓库管理员权限和 GitHub 命令行 `gh`）。
- **认证**：把密钥放进仓库的 Secrets（`ANTHROPIC_API_KEY` 或订阅令牌 `CLAUDE_CODE_OAUTH_TOKEN`），**绝不要写进代码里**。
- 它会消耗两种资源：GitHub 运行分钟数和 API 额度。用 `--max-turns`、超时设置控制成本。
- 谁能触发：默认要求触发者对仓库有写权限，机器人账号默认被拒绝。
- 若只想要"每个合并请求自动审查"而不想维护工作流文件，可以了解官方托管的 Code Review 服务（Team 和 Enterprise 套餐，由 Owner 开启）。

### GitLab CI/CD

官方标注为**公测**，由 GitLab 维护。思路类似：在 `.gitlab-ci.yml` 里加一个作业，用掩码变量保存 `ANTHROPIC_API_KEY`，作业里调用 `claude -p "…"`（见 [编程接口与 Agent SDK](/advanced/optional/sdk)），结果通过合并请求回到团队面前。

两种集成的共同安全原则：

1. 密钥只放平台的加密变量里；
2. 给工作流最小权限；
3. Claude 的改动像同事的提交一样，**经评审再合并**。

## 动手任务

在一个**非敏感的演示仓库**里：

1. 新建分支，故意写一个有明显问题的小函数（比如没有检查空输入）。
2. 运行 `/code-review`，看它是否发现问题。
3. 再试 `/code-review high`，对比报告差异。
4. 用 `--fix`，再用 `git diff` 检查它到底改了什么。

## 小结

- 日常用 `/code-review`；大改动合并前考虑 `/code-review ultra`。
- 安全方面叠加使用：写时有 `security-guidance`，按需有 `claude-security`，合并时有 CI。
- 任何自动化都要最小权限、密钥入保险箱、改动要评审。

相邻选学页：[上一页：插件与 Mods](/advanced/optional/plugins-mods) ｜ [下一页：编程接口与 Agent SDK](/advanced/optional/sdk) ｜ 返回 [高级篇导览](/advanced/)
