# 安装与第一次运行

> 内容核对日期：2026-10-18；涉及的功能以 Claude Code 当时版本为准，请以官方文档为准。

## 学完这页你能…

- 安装 VS Code 和 Claude Code 扩展，并登录账号
- 打开一个工作文件夹，认识对话面板上的主要部分
- 让 Claude Code 完成第一个读文件、写文件的任务
- 知道桌面应用和终端这两种替代入口

## 开始之前

你需要：

- 一台 macOS 或 Windows 电脑，能安装软件
- 一个可用于 Claude Code 的账号。官方说明为：任何付费 Claude 订阅（Pro、Max、Team、Enterprise）或 Claude Console 账号均可，不需要另外申请 API 密钥。套餐和价格请看 [Anthropic 官方定价页](https://claude.com/pricing)，本教程不列具体数字。
- 上一页准备的练习文件夹"练习-调研资料"

## 第一步：安装 VS Code

**VS Code（Visual Studio Code）** 是微软出品的免费编辑软件。我们并不是要用它写程序，而是借它的窗口来放 Claude Code 的对话面板。你可以把它理解为"一个能同时看文件和聊天的工作台"。

1. 打开浏览器，访问 VS Code 官网 `code.visualstudio.com`，下载适合你系统的安装包
2. 双击安装，一路按默认选项点击"下一步"即可
3. 启动 VS Code。Claude Code 扩展要求 **VS Code 1.94.0 及以上**版本。如果你的版本较旧，在 VS Code 里检查更新即可

## 第二步：安装 Claude Code 扩展

**扩展**就是给 VS Code 增加功能的插件。

1. 在 VS Code 中按快捷键打开扩展面板：Mac 按 `Cmd+Shift+X`，Windows 按 `Ctrl+Shift+X`
2. 在搜索框输入 **Claude Code**，找到发布者为 Anthropic 的那一项，点击 **Install**（安装）
3. 如果安装后没有出现，重启 VS Code，或按 `Cmd+Shift+P`（Windows 为 `Ctrl+Shift+P`）打开命令面板，输入 `Developer: Reload Window` 回车

> 小提醒：搜索结果里可能有名字相近的第三方扩展，请认准发布者是 Anthropic。

## 第三步：打开工作文件夹

Claude Code 的工作范围就是你在 VS Code 里打开的这个文件夹。

1. 在 VS Code 菜单选 **文件 → 打开文件夹**（英文界面是 File → Open Folder）
2. 选择"练习-调研资料"，点击打开
3. 如果弹出"是否信任此文件夹中的作者"，确认是你自己的文件夹后选择信任

这一步很重要：**打开哪个文件夹，Claude 就在哪个文件夹里工作**。永远不要打开整个"文档"或"桌面"这类大范围文件夹。

## 第四步：打开面板并登录

打开 Claude Code 面板有几种方式，任选其一：

- 点击编辑区右上角的 **Spark 图标**（需要先打开一个文件才会显示）
- 点击左侧活动栏里的 Spark 图标
- 点击窗口右下角状态栏的 **✻ Claude Code**
- 命令面板里输入 `Claude Code`，选择 **Open in New Tab**

第一次打开会出现登录界面：

1. 点击 **Sign in**
2. 浏览器会自动打开授权页面，用你的 Claude 账号登录并确认授权
3. 回到 VS Code，面板变成对话框，就表示成功了

登录后可能出现 **Learn Claude Code** 清单，可以点 **Show me** 逐项体验，也可以直接关掉。

::: warning 账号提醒
请使用自己合规开通的账号登录，不要和他人共享账号，也不要在公共电脑上保存登录状态。账号安全见 [账号安全设置](/guide/account-security)。
:::

## 认识面板

对话面板底部是输入框，有几个值得先认识的部分：

| 位置 | 作用 |
|---|---|
| 输入框 | 用日常语言写任务，回车发送 |
| 底部的"模式指示器" | 显示当前权限模式（Manual、Edit automatically、Plan、Auto 等），点击可切换。详见 [3.5 权限与安全](/advanced/permissions) |
| 模型名称 | 点击可切换模型，详见 [3.8 模型选择与推理强度](/advanced/models) |
| 输入框里输入 `/` | 弹出命令菜单，详见 [3.4 命令与快捷操作](/advanced/commands) |
| 输入框里输入 `@` | 提及某个文件，让 Claude 重点看它 |

## 第五步：第一个任务

先让它"看"，不要一上来就让它改。在输入框里输入：

```text
请浏览这个文件夹里的所有文件，告诉我：
1. 每个文件大概讲什么（一句话）
2. 哪些文件之间内容有关联
用表格的形式列出来。先不要修改任何文件。
```

观察它的行为：它会逐个读取文件，读取时面板里会显示它正在做什么。

再来一个会产生新文件的任务：

```text
请把上面的文件清单保存为一个新文件，名字叫"资料清单.md"，放在这个文件夹里。
```

根据当前的权限模式，它可能直接完成，也可能弹出提示问你是否同意。在 **Manual** 模式下，写文件前会展示修改内容并等你确认；在 **Auto** 模式下，后台有安全检查，不会每步都打断你。无论哪种，**请务必看一眼它写了什么**。完成后，左侧文件列表里应该多出了"资料清单.md"。

> 版本说明：需 Claude Code v2.1.283 及以上，VS Code 和终端的新会话默认进入 Auto 模式；旧版本可能默认为 Manual。如果你的界面显示不同，属于正常现象，3.5 会详细说明。

## 另外两个入口（了解即可）

### 桌面应用

Claude 桌面应用里有 **Code** 标签，安装并登录后点进去即可使用，已内置 Claude Code，不用另装命令行工具。需要付费订阅。它适合不想装 VS Code 的人，也便于并排运行多个会话。

### 终端（命令行）

**终端**是一个只能敲字的窗口：Mac 上叫"终端"（Terminal），Windows 上叫 PowerShell。官方推荐的安装方式是在终端中粘贴一行安装命令。

- macOS：打开"终端"应用，粘贴并回车：`curl -fsSL https://claude.ai/install.sh | bash`
- Windows：打开 PowerShell，粘贴并回车：`irm https://claude.ai/install.ps1 | iex`

安装完成后**关闭并重新打开终端**，输入 `claude --version`，看到版本号说明成功。之后用 `cd` 命令进入你的文件夹（例如 `cd ~/Documents/练习-调研资料`），再输入 `claude` 回车就能开始。第一次会提示登录。

注意：只装 VS Code 扩展不会让终端里有 `claude` 命令，两者是分开的。零基础学员只用 VS Code 面板就够了，不必装终端版。

<!-- TODO 核实：Windows 原生环境是否需要 Git for Windows（官方说"推荐"，缺失时改用 PowerShell），课堂前按学员系统再确认 -->

## 常见问题

| 现象 | 处理 |
|---|---|
| 找不到 Spark 图标 | 先打开任意一个文件；或点右下角状态栏的 ✻ Claude Code |
| 提示 Not logged in | 在输入框输入 `/login` 重新登录；仍不行就重载窗口 |
| 面板没有任何反应 | 重载窗口（`Developer: Reload Window`），再不行重启 VS Code |
| Mac 上 `Cmd+Esc` 没反应 | macOS 新版本中系统占用了该快捷键，可在系统键盘快捷键设置里释放，或在 VS Code 里重新绑定 |

## 动手任务

1. 完成上述安装，打开"练习-调研资料"文件夹
2. 让 Claude Code 生成"资料清单.md"
3. 检查清单：有没有漏文件？有没有把文件内容说错？把你发现的一处问题告诉它，让它修正

## 小结

- 安装路径：VS Code → Claude Code 扩展 → 打开工作文件夹 → 登录
- 打开哪个文件夹，Claude 就在哪里工作，范围越小越安全
- 第一次先让它"看"，再让它"写"

[下一页：3.3 日常操作](/advanced/daily-use)
