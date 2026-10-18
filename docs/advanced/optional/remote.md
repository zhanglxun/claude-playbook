# 跨设备与远程使用

> 内容核对日期：2026-10-18；选学内容。部分功能为研究预览/公测，且按套餐和版本开放，请以官方文档为准。

**适合谁**：经常外出，希望在手机或另一台电脑上继续手头任务的人。

**学完这页你能**：区分"远程接管本机会话"和"云端会话"两种模式；用 Remote Control 在手机上继续电脑上的会话；设置推送通知；知道 `--teleport` 和 Dispatch 是什么。

## 先搞清：代码到底在哪台机器上跑

| 方式 | 任务实际运行在 | 电脑要开着吗 | 适合 |
|---|---|---|---|
| Remote Control | 你自己的电脑 | 要 | 任务依赖本机文件、工具 |
| 云端网页版（claude.ai/code） | Anthropic 云端 | 不用 | 代码在 GitHub 上、想让它自己跑 |
| Dispatch | 桌面应用所在电脑 | 要 | 发一句话让它自己决定怎么做 |

手机上的 Claude 应用只是"遥控器和显示屏"，Claude Code 并没有单独的手机程序，入口在应用里的 **Code** 标签页。

## Remote Control：用手机接管电脑上的会话

Claude 一直在你的电脑上运行，文件也不离开电脑，网页和手机只是一扇窗。对话在终端、网页、手机之间同步。

**要求**：Pro、Max、Team、Enterprise 套餐，需用 claude.ai 账号登录（不支持 API 密钥，也不支持 Bedrock 等第三方平台）；Team/Enterprise 需管理员先在后台打开 Remote Control 开关。

**启动**，三选一（在系统终端或 Claude Code 里输入）：

```text
claude remote-control
```

```text
claude --remote-control "晨星贸易周报"
```

```text
/remote-control
```

第一种是"服务器模式"，持续等待远程连接；第二种是带远程功能启动普通会话；第三种在已有会话里开启，会带上当前对话。启动后终端会显示会话网址，按空格键可显示二维码，用手机扫码，或打开 Claude 应用 → **Code** 标签页 → 选择会话。

可从手机或网页发图片、文件给 Claude；电脑休眠或断网后会自动重连。注意：**电脑需保持开机，`claude` 进程要继续运行**。

## 推送通知

Remote Control 开启时，Claude 可以在长任务完成或需要你拍板时给手机发推送。设置：在 Claude Code 里输入 `/config`，打开 **Push when Claude decides**（Claude 自己判断时推送）和/或 **Push when actions required**（需要确认权限或回答问题时推送）。也可以直接在提示词里说"测试跑完后通知我"。如果 `/config` 显示 **No mobile registered**，打开一次手机上的 Claude 应用即可。

## 云端网页版：claude.ai/code

云端会话运行在云端虚拟机里，**关掉电脑也继续跑**，手机、网页、桌面应用、终端都能看。面向 Pro、Max、Team 套餐以及部分 Enterprise 席位。它需要连接 GitHub 才能拉取代码；用量计入你的套餐，没有单独的虚拟机费用。

在终端里也可以发起云端会话：

```text
claude --cloud "【任务描述】"
```

云端会话运行在隔离环境中，网络访问有默认限制，涉及公司资料的仓库使用前请先确认公司规定。

## --teleport：把云端会话拉回本地

云端会话做了一半，想回到自己电脑上继续：

```text
claude --teleport
```

会弹出会话选择器；已知会话编号可写 `claude --teleport <会话ID>`。在已打开的会话里也可输入 `/teleport`。要求：本地代码目录没有未提交改动、是同一个仓库、使用同一个账号。拉回后是一份独立副本，本地的新进展不会同步回云端。

## Dispatch

Dispatch 是在手机的 Claude 应用里**给桌面应用发一句话任务**，由它决定怎么用 Code 会话执行；完成或需要批准时给你推送。要求 Pro 或 Max 套餐，**Team 和 Enterprise 不可用**，且电脑上的桌面应用需保持运行。

<!-- TODO 核实：Dispatch 的详细设置步骤在 desktop 页，本页只做概念介绍 -->

## 动手任务

1. 在电脑上进入练习文件夹，输入 `claude remote-control`，按空格键显示二维码。
2. 用手机登录同一账号的 Claude 应用，扫码或在 **Code** 标签页找到该会话，发送一句"列出当前文件夹的文件"。
3. 在 `/config` 里打开推送，让 Claude 做一个稍长的任务并"完成后通知我"，锁屏等待通知。

## 小结

- 本机资料用 Remote Control；代码在 GitHub、要离开电脑跑，用云端会话。
- `--teleport` 把云端会话拉回本地；Dispatch 是手机给桌面发任务。
- 这些功能都需要 claude.ai 账号登录，请遵守公司的数据安全规定，不要在公共网络和他人设备上登录。

上一页：[多会话并行与 Agent 视图](/advanced/optional/multi-session)　|　下一页：[Claude Tag](/advanced/optional/claude-tag)　|　返回 [高级篇导览](/advanced/)
