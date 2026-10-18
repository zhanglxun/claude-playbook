# 术语表与速查表

本页收录全篇出现的概念、Claude Code 常用命令和快捷键。命令与快捷键会随版本变化，以官方文档为准：[命令](https://code.claude.com/docs/en/commands)、[交互模式](https://code.claude.com/docs/en/interactive-mode)。在 Claude Code 里输入 `/` 可以看到当前可用的命令。

## 一、术语表

### 基础概念

| 术语 | 大白话解释 | 学习位置 |
|---|---|---|
| 大模型 | 读过海量文字、擅长理解和生成文字的 AI 程序。Claude 就是其中一个 | [Claude 是什么](/guide/what-is-claude) |
| 提示词 | 你对 AI 说的话，也就是任务说明 | [提示词写法](/basics/prompting) |
| 上下文窗口 | AI 一次能"记住"的内容量，像工作台的大小，放满了就会遗漏早期内容 | [AI 的能力与局限](/guide/limits) |
| 幻觉 | AI 一本正经地编造不存在的内容。关键信息必须核实 | [AI 的能力与局限](/guide/limits) |
| 知识截止日期 | 模型训练资料的截止时间，之后的新事物它不一定知道，需联网搜索 | [AI 的能力与局限](/guide/limits) |
| 推理强度 | 让模型"想多久"的档位。越高越细致，但越慢、越耗额度 | [模型选择与推理强度](/advanced/models) |
| 模型 | 具体的 Claude 版本，如 Claude Fable 5.1、Opus 5.5、Sonnet 5.5、Haiku 5.5 | [界面与模型选择](/basics/interface) |

### 网页端与桌面端功能

| 术语 | 大白话解释 | 学习位置 |
|---|---|---|
| Projects（项目） | 一个带资料库和固定指令的"专属工作间"，适合长期任务 | [Projects 项目功能](/basics/projects) |
| Artifacts | 对话旁边生成的成品，如网页、图表、文档、小工具，可继续修改 | [Artifacts](/basics/artifacts) |
| 连接器 | 让 Claude 读取你的日历、云盘等外部应用的"接口" | [连接外部应用](/basics/connectors) |
| 深度研究 | 让 Claude 自动多轮搜索、阅读并写出带来源的报告 | [联网搜索与深度研究](/basics/research) |

### Claude Code 相关

| 术语 | 大白话解释 | 学习位置 |
|---|---|---|
| Claude Code | 能在你电脑上读文件、改文件、执行任务的 Claude 工作方式 | [Claude Code 是什么](/advanced/what-is-claude-code) |
| CLAUDE.md | 放在文件夹里的说明书，每次启动都会被读取，写规则和约定 | [CLAUDE.md 记忆文件](/advanced/claude-md) |
| MCP | 一种统一的连接标准，让 Claude 接入各种外部工具和数据 | [MCP 与连接](/advanced/mcp) |
| Skills（技能） | 把某类工作的做法写成可复用的"操作手册"，需要时自动调用 | [Skills 技能](/advanced/skills) |
| Agent（智能体） | 能自己分步骤、调用工具完成目标的 AI | [智能体与子代理](/advanced/agents) |
| 子代理 | 主任务派出去干活的"助手"，各自独立处理一块，再汇报 | [智能体与子代理](/advanced/agents) |
| Hooks（钩子） | 在特定时刻自动执行的小动作，比如改完文件自动检查 | [Hooks](/advanced/optional/hooks) |
| 插件 | 把技能、命令、连接等打包好的扩展，安装即用 | [插件与 Mods](/advanced/optional/plugins-mods) |
| Mods | 定制 Claude Code 界面或行为的扩展 | [插件与 Mods](/advanced/optional/plugins-mods) |
| Plan 模式（规划模式） | 只做计划、不动文件，你批准后再执行 | [权限与安全](/advanced/permissions) |
| 权限模式 | 决定 Claude 做事前要不要问你：每步确认、自动批准编辑、先规划、自动模式 | [权限与安全](/advanced/permissions) |
| 自动模式 | 由系统自动判断哪些操作可以放行，不必每步确认，仍有安全检查 | [权限与安全](/advanced/permissions) |
| 压缩（compact） | 把长对话总结成短摘要，腾出上下文空间 | [上下文与用量](/advanced/context-usage) |
| 检查点 | 可回到之前某一步的存档，改坏了可以退回 | [命令与快捷操作](/advanced/commands) |

<!-- TODO 核实：自动模式的准确描述及"新会话默认模式"以官方权限文档为准（各篇需口径一致） -->

## 二、模型名称对照

| 全名 | 简要定位（以官方说明为准） |
|---|---|
| Claude Fable 5.1 | 能力定位以官方模型页为准 |
| Claude Opus 5.5 | 复杂分析、长文档、需要深度思考的任务 |
| Claude Sonnet 5.5 | 日常主力，速度与能力均衡 |
| Claude Haiku 5.5 | 简单、重复、要求速度的任务 |

各模型的最新能力、价格与用量规则请看官方模型页面，并参见 [模型选择与推理强度](/advanced/models)。

<!-- TODO 核实：Fable 5.1 的官方定位描述；各模型定位以 advanced/models 页口径为准 -->

## 三、斜杠命令速查

在 Claude Code 输入框里以 `/` 开头输入。核对来源：官方 commands 文档。

### 会话与上下文

| 命令 | 作用 |
|---|---|
| `/clear` | 开始新对话，清空上下文 |
| `/compact [说明]` | 压缩当前对话；可补充"重点保留什么" |
| `/context` | 查看上下文占用情况 |
| `/rewind` | 把对话和/或文件回退到之前某个时间点 |
| `/resume [会话]` | 恢复之前的对话，或打开选择列表 |
| `/export [文件名]` | 把当前对话导出为文本 |
| `/btw [问题]` | 问一个顺带的问题，不计入当前对话 |

### 模型与速度

| 命令 | 作用 |
|---|---|
| `/model [模型]` | 切换模型 |
| `/effort [档位]` | 设置推理强度（低到最高，或自动） |
| `/fast [on\|off]` | 开关快速模式 |
| `/usage` | 查看本次会话用量与套餐用量情况 |

### 设置与诊断

| 命令 | 作用 |
|---|---|
| `/init` | 为当前文件夹生成 CLAUDE.md |
| `/memory` | 编辑 CLAUDE.md 与记忆设置 |
| `/permissions` | 管理允许、询问、禁止的权限规则 |
| `/config` | 打开设置界面 |
| `/status` | 查看版本、模型、账号与连接状态 |
| `/doctor` | 体检：诊断安装、设置、扩展问题并提出修复 |
| `/help` | 显示帮助与可用命令 |

### 扩展与自动化

| 命令 | 作用 |
|---|---|
| `/mcp` | 管理 MCP 连接 |
| `/plugin` | 管理插件 |
| `/skills` | 列出可用技能 |
| `/hooks` | 查看钩子配置 |
| `/agents` | 子代理相关（创建与管理请直接对 Claude 说，或编辑配置文件） |
| `/plan [任务]` | 直接进入规划模式 |
| `/loop [间隔] [提示词]` | 在会话开着时按间隔重复执行某个任务 |
| `/goal [条件]` | 设定目标，Claude 跨多轮持续工作直到达成 |
| `/add-dir <路径>` | 本次会话增加一个可访问的文件夹 |
| `/review` | 审查当前改动（偏代码场景） |

<!-- TODO 核实：/agents 在不同版本行为不同；/goal、/loop 为较新功能，用法以所装版本的官方文档为准 -->

## 四、快捷键速查

快捷键可能因系统和终端而异；macOS 上部分 Option 组合键需要在终端中把 Option 设为 Meta 键。

| 快捷键 | 作用 |
|---|---|
| `Shift+Tab` | 切换权限模式 |
| `Esc` | 中断 Claude，保留已完成的工作 |
| `Esc` 连按两次 | 清空输入；输入为空时进入回退 |
| `Ctrl+C` | 中断运行中的操作；无操作时清空输入，再按退出 |
| `Ctrl+D` | 退出 |
| `Ctrl+G` | 在文本编辑器中编辑当前提示词 |
| `Ctrl+O` | 切换详细记录视图 |
| `Ctrl+R` | 搜索历史输入 |
| `Ctrl+B` | 让正在运行的任务转入后台 |
| `Ctrl+T` | 显示或隐藏任务清单 |
| `Ctrl+L` | 重绘屏幕 |
| `Ctrl+V` | 粘贴剪贴板图片（部分终端按键不同） |
| `Option+P`（macOS）/ `Alt+P` | 切换模型 |
| `Option+O`（macOS）/ `Alt+O` | 开关快速模式 |
| `Tab` | 接受自动补全 |
| `↑` / `↓` | 翻阅历史输入 |
| 行首输入 `/` | 调出命令或技能 |
| 行首输入 `!` | 直接运行一条命令并把结果交给 Claude |
| 输入 `@` | 引用文件（自动补全路径） |
| 输入 `?`（输入框为空时） | 显示快捷键帮助 |

<!-- TODO 核实：换行快捷键（Shift+Enter 或 \ 加回车）因终端而异，本页未列出；可在 /terminal-setup 或官方 terminal-config 页确认后补充 -->

## 五、延伸阅读

- 提示词模板：[提示词模板库](/prompts/)、[Claude Code 模板](/prompts/claude-code)
- 遇到问题：[常见问题](/faq/)
- 数据安全：[使用规范与数据安全](/security/)
