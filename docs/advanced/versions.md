# 版本动态（近半年）

> 核对说明：核对日期 2026-10-18。数据来源为官方 What's New 周报（第 13–37 周，2026 年 3 月 23 日至 9 月 11 日，第 31 周官方无条目）和更新日志（Changelog）。9 月 12 日之后官方没有周报，这段由更新日志整理，仅覆盖主要条目。标 ※ 的条目本次未能在官方页面逐条复核，使用前请再核对。本页每半年更新一次，内容为独立整理，非 Anthropic 官方发布。

**怎么用这页**：想知道"某个功能是哪个版本、哪周出现的"，或者讲课前要确认"哪些功能是研究预览、需要什么套餐"，就查这张表。章节列给出本教程里对应的页面。

很多功能是"研究预览"或"公测"，且按套餐和平台开放。表里只写出现时间和关键条件，**具体套餐、版本要求以官方 [功能可用性](https://code.claude.com/docs/en/feature-availability) 页为准**。

## 时间线（由新到旧）

| 时间 | 版本 | 主要特性 | 对应章节 |
|---|---|---|---|
| 2026-10-07 至 10-16 | 2.1.293–2.1.302 | **Claude Haiku 5.5** 成为 Anthropic API 上的默认 Haiku（2.1.293，10/7）；钩子失败时可阻止动作（`onFailure: "block"`，2.1.295）；终端对 20 万 token 以上的长对话闲置时自动压缩（2.1.299）；Mods 新增事件和接口（2.1.295–301）；fork 子代理在非终端界面也默认开启（2.1.302）；VS Code 支持 LaTeX 公式（2.1.301）；Claude Tag 支持 Slack Connect（2.1.300） | [3.7](/advanced/context-usage)、[3.8](/advanced/models)、[3.13](/advanced/optional/hooks)、[3.18](/advanced/optional/claude-tag)、[3.21](/advanced/optional/plugins-mods) |
| 2026-09-22 至 10-06 | 2.1.280–2.1.292 | **Claude Opus 5.5**（9/22，默认 Opus，1M 上下文）※；**Claude Sonnet 5.5**（9/28，默认 Sonnet）※；**自动模式成为终端和 VS Code 交互会话的内置起始权限模式**（2.1.283 起，所有套餐；更早版本仅 Pro、Max、Team）；**Mods 正式推出**（2.1.287，10/1），内置"You should know"提示；`allowedProviders` 托管设置（2.1.285）；`claude -p` 在第三方云平台或关闭遥测时，未指定权限模式默认自动模式（2.1.285）；`claude plugin install --marketplace`（命令行，2.1.292）；Agent 工具可指定推理强度（2.1.292）；`/code-review --max-findings`（2.1.288）；Ultracode 在 `/effort` 里成为独立开关 ※；`/doctor prompt-audit` ※；AGENTS.md 兼容 ※；Claude Tag 快速模式、Slack 原生进度提示 ※ | [3.5](/advanced/permissions)、[3.6](/advanced/claude-md)、[3.8](/advanced/models)、[3.18](/advanced/optional/claude-tag)、[3.21](/advanced/optional/plugins-mods)、[3.22](/advanced/optional/code-review) |
| 2026-09 中旬 | 2.1.270–2.1.279 ※ | 远程会话支持快速模式；自动模式支持按命令设置域名白名单；动态工作流遇用量上限自动暂停并恢复；无 CLAUDE.md 时读取 AGENTS.md；Fable 始终出现在 `/model`；子代理结果加标识，避免被当成用户指令；服务端自动模式分类器成为 API 和 Enterprise 默认。（2.1.279 的条目被截断，未核对） | [3.5](/advanced/permissions)、[3.6](/advanced/claude-md)、[3.8](/advanced/models)、[3.14](/advanced/optional/workflows) |
| 2026-09-07 至 09-11 | 第 37 周（2.1.263–269） | `claude plugin eval`：用测试用例评测插件并与"不装插件"的基线对比；桌面应用的面板可弹出为独立窗口；`maxEffortLevel` 设置可为所有平台的推理强度封顶 | [3.21](/advanced/optional/plugins-mods)、[3.24](/advanced/optional/admin) |
| 2026-08-31 至 09-04 | 第 36 周（2.1.251–261） | **Claude Fable 5.1**（1M 上下文）；Pro、Max 在桌面应用的电脑操作可在 macOS 后台运行；`/diff` 在全屏渲染下打开实时面板；`/skill-doctor` 查看技能的上下文开销和使用频率 | [3.8](/advanced/models)、[3.9](/advanced/skills)、[3.19](/advanced/optional/browser-computer) |
| 2026-08-17 至 08-28 | 第 34–35 周（2.1.234–250） | `/design`（设计画板，研究预览）；简洁（Concise）输出风格；运行 `claude remote-control` 的电脑在手机上显示为设备卡片；桌面端 `/resume` 接续终端会话；`ANTHROPIC_DEFAULT_MODEL`、`modelPicker` 设置 | [3.8](/advanced/models)、[3.17](/advanced/optional/remote) |
| 2026-08-03 至 08-14 | 第 32–33 周（2.1.220–233） | 会话之间互相发消息（macOS、Linux）；自托管环境（Team、Enterprise 公测）；**自动模式自 8/14 起成为 Pro、Max、Team 新会话的默认权限模式**；交互会话默认开启 fork 模式；桌面应用达到用量上限后可"限额重置后自动继续"；提示框里 `@` 可提及其他会话 | [3.5](/advanced/permissions)、[3.16](/advanced/optional/multi-session) |
| 2026-07-20 至 07-24 | 第 30 周（2.1.214–219） | Claude Opus 5（当时的默认 Opus）；桌面应用 iOS 模拟器面板（公测）；Claude Security 插件；`/code-review` 改为后台子代理运行 | [3.8](/advanced/models)、[3.19](/advanced/optional/browser-computer)、[3.22](/advanced/optional/code-review) |
| 2026-07-13 至 07-17 | 第 29 周（2.1.207–212） | **Artifacts 可调用 MCP 连接器**（2.1.209）；公开分享链接、Team/Enterprise 编辑者角色；`/fork` 派生后台会话；自动模式在 Bedrock、Agent Platform、Foundry 上不再需要额外开关 | [3.10](/advanced/mcp)、[3.16](/advanced/optional/multi-session)、[3.20](/advanced/optional/publish-artifacts) |
| 2026-07-06 至 07-10 | 第 28 周（2.1.202–206） | **桌面应用内置浏览器**；`/doctor` 变为完整体检（别名 `/checkup`）；自动模式拦截篡改会话记录，对 `rm -rf` 未解析变量先询问 | [3.5](/advanced/permissions)、[3.19](/advanced/optional/browser-computer) |
| 2026-06-29 至 07-03 | 第 27 周（2.1.195–201） | Claude Sonnet 5；**Claude in Chrome 对所有直连 Anthropic 的套餐正式发布**；子代理默认后台运行 | [3.8](/advanced/models)、[3.11](/advanced/agents)、[3.19](/advanced/optional/browser-computer) |
| 2026-06-15 至 06-26 | 第 25–26 周（2.1.178–193） | **Artifacts**（Team、Enterprise 公测）；`claude mcp login`；`/rewind` 可回到 `/clear` 之前；后台子代理的权限询问回到主会话；自动模式拦截破坏性 Git 操作；`/config key=value` | [3.3](/advanced/daily-use)、[3.5](/advanced/permissions)、[3.10](/advanced/mcp)、[3.20](/advanced/optional/publish-artifacts) |
| 2026-06-01 至 06-12 | 第 23–24 周（2.1.158–176） | `/cd` 切换工作目录；子代理可再派子代理（最深 5 层）；`--safe-mode`；自动模式扩展到第三方云平台；`/plugin list` | [3.11](/advanced/agents)、[3.5](/advanced/permissions)、[3.21](/advanced/optional/plugins-mods) |
| 2026-05-18 至 05-29 | 第 21–22 周（2.1.143–157） | Claude Opus 4.8（当时的默认 Opus）；**动态工作流**；安全指引（security-guidance）插件；`/usage` 按技能、子代理、插件、MCP 拆分用量；`/code-review` 命令；自动模式扩展到 Pro | [3.7](/advanced/context-usage)、[3.14](/advanced/optional/workflows)、[3.22](/advanced/optional/code-review) |
| 2026-05-04 至 05-15 | 第 19–20 周（2.1.128–142） | **Agent 视图**（`claude agents`）；**`/goal`**；Rewind 菜单可压缩上下文；插件支持 `.zip` 和 URL 加载 | [3.15](/advanced/optional/goal-schedule)、[3.16](/advanced/optional/multi-session) |
| 2026-04-06 至 05-01 | 第 15–18 周（2.1.92–126） | Claude Opus 4.7 与 `xhigh` 推理强度（第 16 周）；**Routines** 云端例行任务（第 16 周）；手机推送（第 16 周）；Ultraplan 云端规划、Monitor 工具（第 15 周）；`/ultrareview` 研究预览（第 17 周）；`claude ultrareview` 用于脚本和 CI（第 18 周） | [3.8](/advanced/models)、[3.15](/advanced/optional/goal-schedule)、[3.17](/advanced/optional/remote)、[3.22](/advanced/optional/code-review) |
| 2026-03-23 至 04-03 | 第 13–14 周（2.1.83–91） | **自动模式**（研究预览）；**电脑操作**：桌面应用（第 13 周）、命令行（第 14 周，研究预览）；`/powerup` 互动教程 | [3.5](/advanced/permissions)、[3.19](/advanced/optional/browser-computer) |

> 另外：Mods 在终端需要 2.1.287 及以上版本，桌面应用需要 2.1.286 及以上版本，默认开启。

## 教学提醒

1. 版本动态里很多功能是"研究预览"或"公测"，且按套餐开放，写正文前逐项核对套餐和版本要求。
2. 自动模式已成为新会话的默认权限模式（终端和 VS Code 交互会话自 2.1.283 起为内置起始模式），[权限与安全](/advanced/permissions) 要围绕它讲，而不是只讲"每步确认"。
3. 版本信息变化快，正文用"功能 + 最低版本"写法，并在页首标注核对日期。

<!-- TODO 核实：下列条目本次未在官方页面逐条确认：Opus 5.5（9/22）与 Sonnet 5.5（9/28）的发布日期与版本号；Ultracode 独立开关；`/doctor prompt-audit`；AGENTS.md 兼容；Claude Tag 快速模式与 Slack 原生进度；2.1.270–279 整段；2.1.280–284 的逐条内容 -->
<!-- 核对中对 OUTLINE 版本表的修正：1) 10 月中旬一行中 Haiku 5.5 实为 10/7（2.1.293），"子代理 fork 默认开启"实为 2.1.302 起在非终端界面默认开启（交互会话的 fork 默认开启在第 33 周）；2) 自动模式默认：第 32 周为 8/14 起 Pro/Max/Team 新会话默认，终端与 VS Code 交互会话自 2.1.283 起对所有套餐为内置起始模式；3) "claude -p 默认自动模式"官方仅写明 2.1.285 起在第三方云平台或关闭遥测时生效；4) 第 30 周/第 27 周的 Opus 5 / Sonnet 5 为当时默认，现为 Opus 5.5 / Sonnet 5.5 -->

返回 [高级篇导览](/advanced/)
