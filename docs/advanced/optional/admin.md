# 企业管理（管理员向）

> 内容核对日期：2026-10-18；选学内容。部分功能为研究预览/公测，且按套餐和版本开放，请以官方文档为准。

::: tip 面向管理员
本页面向企业 IT、安全或管理员，是**概览性质**：帮你搞清楚"有哪些旋钮、该去哪里查"，具体配置请以官方文档为准。普通使用者不需要读。
:::

**适合谁**：负责在公司内部署和管控 Claude Code 的 IT 管理员、安全负责人。

**学完能**：说出企业部署要做的五类决定；知道托管设置有哪几种下发方式；知道能管什么（权限、插件、MCP、模型、钩子）；知道怎么看用量；知道不同套餐和云平台下哪些功能不可用。

## 总览：管理员要做的五个决定

| 决定 | 要选什么 |
|---|---|
| 1. 选模型来源 | 通过什么账号或平台使用 Claude（Team / Enterprise 订阅、Console API、Amazon Bedrock、Google Cloud 的 Agent Platform、Microsoft Foundry） |
| 2. 怎么下发设置 | 托管设置怎么送到每个人的电脑 |
| 3. 管什么 | 允许哪些工具、命令、集成 |
| 4. 怎么看用量 | 如何跟踪花费和使用情况 |
| 5. 数据怎么处理 | 数据保留与合规立场 |

账号单点登录（SSO）、SCIM、席位分配在 Claude 账号层面配置，不在 Claude Code 里，请看官方的企业管理员指南。

## 一、模型来源与功能差异（feature availability）

官方提供一张"功能可用性"对照表，说明不同套餐和平台能用哪些功能。几个要点：

- 命令行和所有本地运行的功能（子代理、钩子、技能、CLAUDE.md、插件、MCP、沙箱、动态工作流）在所有平台都可用。
- 一批功能**需要 claude.ai 订阅账号**，只用 Console API 密钥或云平台时用不了，包括：云端会话与手机端、桌面应用、例行任务（Routines）、`/ultrareview`、Code Review（还要求 Team 或 Enterprise）、Remote Control、Chrome 扩展、电脑操作（仅 Pro、Max）、Artifacts、语音输入。
- 部分功能按套餐开放，如 Code Review 为 Team 和 Enterprise；电脑操作为 Pro 和 Max；服务端托管设置为 Team 和 Enterprise；分析面板为 Team 和 Enterprise；Compliance API、SCIM 为 Enterprise。
- Bedrock、Agent Platform、Foundry 等云平台下，网页搜索、快速模式、顾问（advisor）、托管设置的服务端下发、分析面板等会有缺失或限制。

选哪种来源之前，**一定先对照这张表**：如果你的团队需要 Chrome 扩展、Artifacts 或例行任务，单走云平台是不够的，还需要订阅席位。表格会更新，请以官方页面为准。
<!-- TODO 核实：feature-availability 页面表格可能持续更新；本页只引用了 2026-10-18 的抓取结果，具体套餐与云平台矩阵上线前请再对一次 -->

## 二、托管设置：把公司策略压在个人设置之上

**托管设置（managed settings）**是组织统一下发的配置文件，优先级高于用户、项目和本地的任何设置，用户无法覆盖（少数安全相关的例外除外）。列表类设置（如允许/拒绝规则）会合并各来源，所以个人可以增加限制，但不能删掉公司写的限制。

下发方式，按优先级从高到低：

| 方式 | 说明 |
|---|---|
| 服务端托管 | 在 claude.ai 管理后台配置，需 Team 或 Enterprise；启动时拉取，会话中每小时刷新；也可由自建的 Claude apps 网关提供给云平台用户 |
| 系统策略 | macOS 的 plist（`com.anthropic.claudecode`）或 Windows 注册表 `HKLM\SOFTWARE\Policies\ClaudeCode`，需要管理员权限写入，不易被篡改 |
| 本地托管文件 | `managed-settings.json`，路径因系统而异（macOS 在 `/Library/Application Support/ClaudeCode/`，Linux 在 `/etc/claude-code/`，Windows 在 `C:\Program Files\ClaudeCode\`） |
| Windows 用户注册表 | 优先级最低，无需提权即可写，只当便利项，不要当强制手段 |

验证是否生效：让用户在 Claude Code 里输入 `/status`，看 `Setting sources` 一行是否显示 `Enterprise managed settings`。

## 三、能管什么：权限与策略

| 控制项 | 做什么 | 关键设置 |
|---|---|---|
| 权限规则 | 允许、询问、拒绝具体工具或命令 | `permissions.allow`、`permissions.deny` |
| 权限锁定 | 只认托管设置里的规则；禁用跳过权限的模式 | `allowManagedPermissionRulesOnly`、`permissions.disableBypassPermissionsMode` |
| 起始权限模式 | 决定会话默认从哪个模式开始，或禁用自动模式 | `permissions.defaultMode`、`permissions.disableAutoMode` |
| 沙箱 | 操作系统级文件与网络隔离，可设域名白名单 | `sandbox.enabled`、`sandbox.network.allowedDomains` |
| 组织级 CLAUDE.md | 在每个会话加载的全公司规则，无法被排除 | 放在托管策略路径下 |
| MCP 管控 | 限制能连接哪些 MCP 服务器 | `allowedMcpServers`、`deniedMcpServers`、`managed-mcp.json` |
| 插件与市场 | 限制能添加的市场、禁止旁路加载 | `strictKnownMarketplaces`、`blockedMarketplaces`、`disableSideloadFlags` |
| 钩子限制 | 只允许托管设置里的钩子运行 | `allowManagedHooksOnly` |
| Mods 管控 | 禁止用户自装的 Mod 运行 | 在 `cc-plugin-sec-default@builtin` 上设 `allowManagedModsOnly` |
| 登录限制 | 限制登录方式或所属组织 | `forceLoginMethod`、`forceLoginOrgUUID` |
| 云平台限制 | 限定允许使用的 API 来源 | `allowedProviders`（2.1.285 及以上） |
| 模型限制 | 限制模型选择器里出现哪些模型 | `availableModels`、`enforceAvailableModels` |
| 推理强度上限 | 给所有模型封顶 | `maxEffortLevel` |
| 版本下限 | 防止自动更新到低于组织要求的版本 | `minimumVersion`；更严的有 `requiredMinimumVersion` 等 |

两个提醒：

- 权限规则和沙箱管的是**不同层**。比如拒绝了网页读取工具，如果仍允许 shell 命令，`curl` 之类仍可能访问网络；沙箱的网络白名单才能在系统层堵上。
- 插件、Mods 都以用户权限运行，不在沙箱里（见 [插件与 Mods](/advanced/optional/plugins-mods)）；管理员需要决定是否放开。

## 四、网关：在公司与模型之间加一个"收费站"

**LLM 网关**是组织自己运行的中转服务，所有 Claude Code 请求先经过它再转发给模型提供方。能带来的好处：

- 密钥集中在服务端，员工只持有网关凭证；
- 按人或团队统计用量；
- 集中设定预算和限速；
- 记录每次模型请求，满足审计；
- 更换模型提供方时不需要改每台电脑。

代价是网关成为你要自己运维的基础设施，Claude Code 每次新增能力都需要网关同步支持转发，否则对应功能失效。官方也提供自托管的 **Claude apps 网关**（支持单点登录和 OTLP 遥测）。通过非官方地址访问时，部分仅限官方接口的功能（如 Remote Control、服务端托管设置）会被关闭。

## 五、用量监控

| 手段 | 能得到什么 | 适用 |
|---|---|---|
| OpenTelemetry 导出 | 会话、工具调用、令牌、花费等指标与事件 | 所有平台 |
| 分析面板 | 采用率、贡献指标 | Team、Enterprise（claude.ai）；Console 有按用户用量面板 |
| 分析 API | 按用户的用量数据 | Enterprise 分析 API；Console 的 Claude Code 分析 API |
| 花费与限速 | 组织设置里的额度、限速 | Team、Enterprise；Console 用工作区限额；云平台用云账单 |

OpenTelemetry 要点：设置环境变量 `CLAUDE_CODE_ENABLE_TELEMETRY=1`，再选导出器（如 `OTEL_METRICS_EXPORTER`、`OTEL_LOGS_EXPORTER`）和接收端地址。管理员可通过托管设置下发；项目里的 `.claude/settings.json` 不能自行开启遥测或指定目的地。提示词内容、工具细节等默认**不**记录，需要单独开启，开启前请评估隐私影响。

## 六、数据处理

- Team、Enterprise、API 和云平台方案下，Anthropic 不用你的代码和提示词训练模型（以官方数据使用页面为准）。
- 零数据保留、HIPAA 配置等属于特定方案，开启后会关闭一部分功能（比如 Artifacts、`/ultrareview`、Chrome 扩展等在这些配置下可能不可用）。
- 需要请求级审计，建议在员工与提供方之间放网关。

<!-- TODO 核实：HIPAA/ZDR 对各功能的具体影响以官方 hipaa-setup、zero-data-retention 页为准，本页只作提示 -->

## 动手任务（给管理员）

1. 打开官方 admin-setup 页面，对照"五个决定"，在一张表里写下你们公司当前的选择。
2. 选一台测试机，下发一个只含 `permissions.deny`（例如拒绝读取 `.env` 文件）的托管设置文件，再在 Claude Code 里用 `/status` 验证。
3. 写一页纸：哪些功能你们必须要订阅账号（对照 feature availability），哪些只用云平台就能满足。

## 小结

- 先选模型来源，再对照功能可用性表。
- 托管设置是策略的"最高层"，用 `/status` 验证。
- 插件、MCP、钩子、Mods 都要有明确的"谁能装"规则。
- 用量靠 OpenTelemetry 和分析面板；需要审计时用网关。

相邻选学页：[上一页：编程接口与 Agent SDK](/advanced/optional/sdk) ｜ 返回 [高级篇导览](/advanced/) ｜ 版本变化见 [版本动态](/advanced/versions)
