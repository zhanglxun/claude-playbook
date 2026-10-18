import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Claude 实战手册',
  description: 'Claude 企业应用实战手册：账号选择、提示词、产品调研与市场分析（非 Anthropic 官方）',
  base: '/claude-playbook/',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    nav: [
      { text: '开始学习', link: '/guide/' },
      { text: '场景实战', link: '/scenarios/product-research' },
      { text: '行业篇', link: '/industries/trade/' },
      { text: '提示词模板', link: '/prompts/' },
    ],

    sidebar: [
      {
        text: '一、入门篇',
        items: [
          { text: '课程介绍', link: '/guide/' },
          { text: 'Claude 是什么', link: '/guide/what-is-claude' },
          { text: '账号类型怎么选', link: '/guide/plans' },
          { text: '账号安全设置', link: '/guide/account-security' },
        ],
      },
      {
        text: '二、基础篇',
        items: [
          { text: '提示词写法', link: '/basics/prompting' },
          { text: '文件与表格分析', link: '/basics/files' },
          { text: 'Projects 项目功能', link: '/basics/projects' },
        ],
      },
      {
        text: '三、场景篇',
        items: [
          { text: '产品调研分析', link: '/scenarios/product-research' },
          { text: '市场分析', link: '/scenarios/market-analysis' },
          { text: '竞品对比', link: '/scenarios/competitor' },
        ],
      },
      {
        text: '四、行业篇',
        items: [
          { text: '贸易行业', link: '/industries/trade/' },
        ],
      },
      {
        text: '五、工具与规范',
        items: [
          { text: '提示词模板库', link: '/prompts/' },
          { text: '使用规范与数据安全', link: '/security/' },
          { text: '常见问题', link: '/faq/' },
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
