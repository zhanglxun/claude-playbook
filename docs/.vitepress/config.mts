import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Claude 实战手册',
  description: 'Claude 企业应用实战手册：账号选择、提示词、产品调研与市场分析（非 Anthropic 官方）',
  // GitHub Pages 用 /claude-playbook/；独立域名（根路径）构建时设置 DOCS_BASE=/
  base: process.env.DOCS_BASE ?? '/claude-playbook/',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '开始学习', link: '/guide/' },
      { text: '基础篇', link: '/basics/prompting' },
      { text: '高级篇', link: '/advanced/' },
      { text: '场景与行业', link: '/cases/' },
      { text: '提示词模板', link: '/prompts/' },
    ],

    sidebar: [
      {
        text: '一、入门篇',
        items: [
          { text: '1.1 课程介绍', link: '/guide/' },
          { text: '1.2 Claude 是什么', link: '/guide/what-is-claude' },
          { text: '1.3 AI 的能力与局限', link: '/guide/limits' },
          { text: '1.4 与 AI 协作的基本心态', link: '/guide/mindset' },
          { text: '1.5 账号类型怎么选', link: '/guide/plans' },
          { text: '1.6 账号安全设置', link: '/guide/account-security' },
          { text: '1.7 概念地图', link: '/guide/concept-map' },
        ],
      },
      {
        text: '二、基础篇',
        items: [
          { text: '2.1 界面与模型选择', link: '/basics/interface' },
          { text: '2.2 提示词写法', link: '/basics/prompting' },
          { text: '2.3 文件与表格分析', link: '/basics/files' },
          { text: '2.4 Projects 项目功能', link: '/basics/projects' },
          { text: '2.5 Artifacts', link: '/basics/artifacts' },
          { text: '2.6 联网搜索与深度研究', link: '/basics/research' },
          { text: '2.7 连接外部应用与技能', link: '/basics/connectors' },
        ],
      },
      {
        text: '三、高级篇（Claude Code）',
        items: [
          { text: '高级篇导览', link: '/advanced/' },
          {
            text: '核心课（必学）',
            items: [
              { text: '3.1 Claude Code 是什么', link: '/advanced/what-is-claude-code' },
              { text: '3.2 安装与第一次运行', link: '/advanced/install' },
              { text: '3.3 日常操作', link: '/advanced/daily-use' },
              { text: '3.4 命令与快捷操作', link: '/advanced/commands' },
              { text: '3.5 权限与安全', link: '/advanced/permissions' },
              { text: '3.6 记忆与规则：CLAUDE.md', link: '/advanced/claude-md' },
              { text: '3.7 上下文与用量管理', link: '/advanced/context-usage' },
              { text: '3.8 模型选择与推理强度', link: '/advanced/models' },
              { text: '3.9 Skills', link: '/advanced/skills' },
              { text: '3.10 MCP', link: '/advanced/mcp' },
              { text: '3.11 子代理与 Agent 循环', link: '/advanced/agents' },
              { text: '3.12 数据沉淀', link: '/advanced/knowledge' },
            ],
          },
          {
            text: '选学专题',
            collapsed: true,
            items: [
              { text: '3.13 Hooks', link: '/advanced/optional/hooks' },
              { text: '3.14 动态工作流', link: '/advanced/optional/workflows' },
              { text: '3.15 目标与定时任务', link: '/advanced/optional/goal-schedule' },
              { text: '3.16 多会话并行与 Agent 视图', link: '/advanced/optional/multi-session' },
              { text: '3.17 跨设备与远程使用', link: '/advanced/optional/remote' },
              { text: '3.18 Claude Tag（了解即可）', link: '/advanced/optional/claude-tag' },
              { text: '3.19 浏览器与电脑操作', link: '/advanced/optional/browser-computer' },
              { text: '3.20 发布为 Artifacts', link: '/advanced/optional/publish-artifacts' },
              { text: '3.21 插件与 Mods', link: '/advanced/optional/plugins-mods' },
              { text: '3.22 代码与安全审查', link: '/advanced/optional/code-review' },
              { text: '3.23 编程接口与 Agent SDK', link: '/advanced/optional/sdk' },
              { text: '3.24 企业管理', link: '/advanced/optional/admin' },
            ],
          },
          { text: '附：版本动态', link: '/advanced/versions' },
        ],
      },
      {
        text: '四、场景与行业篇',
        items: [
          { text: '导览', link: '/cases/' },
          {
            text: '通用场景',
            items: [
              { text: '产品调研分析', link: '/cases/common/product-research' },
              { text: '市场分析', link: '/cases/common/market-analysis' },
              { text: '竞品对比', link: '/cases/common/competitor' },
            ],
          },
          {
            text: '行业场景',
            items: [
              {
                text: '贸易',
                collapsed: false,
                items: [
                  { text: '贸易行业总览', link: '/cases/industries/trade/' },
                  { text: '客户开发信与跟进', link: '/cases/industries/trade/outreach' },
                  { text: '询盘与报价回复', link: '/cases/industries/trade/inquiry-quote' },
                  { text: '海外市场与展会资料整理', link: '/cases/industries/trade/market-exhibition' },
                ],
              },
              { text: '研发（预留）', link: '/cases/industries/rd/' },
              { text: '研究（预留）', link: '/cases/industries/research/' },
              { text: '游戏（预留）', link: '/cases/industries/game/' },
            ],
          },
        ],
      },
      {
        text: '五、工具与规范',
        items: [
          { text: '提示词模板库', link: '/prompts/' },
          { text: 'Claude Code 模板', link: '/prompts/claude-code' },
          { text: '使用规范与数据安全', link: '/security/' },
          { text: '常见问题', link: '/faq/' },
          { text: '术语表与速查表', link: '/reference/' },
        ],
      },
    ],

    outline: { level: [2, 3], label: '本页目录' },
    lastUpdated: { text: '最后更新' },
    docFooter: { prev: '上一章', next: '下一章' },
    search: { provider: 'local' },
    socialLinks: [{ icon: 'github', link: 'https://github.com/zhanglxun/claude-playbook' }],

    footer: {
      message: '本教程为独立编写的培训资料，非 Anthropic 官方出品。Claude 是 Anthropic 的商标。',
      copyright: '© 2026 深圳市速睿森视科技有限公司',
    },
  },
})
