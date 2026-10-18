# claude-playbook

Claude 企业应用实战手册：**公开**的 VitePress 培训教程，发布到 GitHub Pages。
仓库：https://github.com/zhanglxun/claude-playbook（公开仓库）

## 内容边界（最重要）

本仓库公开可见，只放可复用、可公开的通用培训内容。

- **禁止**写入任何客户信息：客户名称、联系人、账号/邮箱、合同金额、客户的产品资料或调研结果。案例一律使用虚构公司。
- **禁止**写入账号开通的具体操作细节、内部报价、合同、履约 SOP。
- 以上私有内容一律放在 iCloud 交付目录：
  `/Users/jarvis/Library/Mobile Documents/com~apple~CloudDocs/Documents/2.项目文档/50.claude账号和培训/`
  （客户与履约资料在其中的 `3.交付文档/`，合同在 `4.合同文档/`）
- 不写任何绕过地区限制或平台规则的内容。
- 套餐价格、额度等易变信息不写具体数字，链接到 Anthropic 官方页面。
- 每页保持"非 Anthropic 官方"的定位，不使用暗示官方的措辞。

## 目录结构

```
docs/
├─ .vitepress/config.mts   导航、侧边栏（新增页面要同步加到 sidebar）
├─ index.md                首页
├─ guide/                  入门篇：介绍、账号类型、安全设置
├─ basics/                 基础篇：提示词、文件分析、Projects
├─ scenarios/              场景篇：产品调研、市场分析、竞品对比
├─ industries/<行业>/      行业篇：每个行业一个目录（trade=贸易）
├─ prompts/                提示词模板库
├─ security/               使用规范与数据安全
└─ faq/                    常见问题
```

章节顺序即讲课顺序，与服务合同附件一《服务内容与培训大纲》对应。
复用方式：通用章节不动，新行业客户在 `industries/` 下新增一个目录。

## 命令

- `npm run docs:dev` 本地预览
- `npm run docs:build` 构建（提交前确认能通过）
- 推送到 `main` 后由 `.github/workflows/deploy.yml` 自动发布到 GitHub Pages

## 写作约定

- 中文为主，面向非技术业务人员，少用术语
- 示范提示词放在 ```text 代码块中，可替换部分用【】标出
- 每个场景页包含：分析框架 → 示范提示词 → 课堂练习/注意事项
