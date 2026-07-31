import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI实验室',
  description: 'DIY 智能办公室方案与实施文档库',
  base: process.env.GITHUB_PAGES || process.env.GITHUB_ACTIONS ? '/ai-lab-smart-office/' : '/',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'AI实验室 · 智能办公室',
    nav: [
      { text: '项目首页', link: '/' },
      { text: '方案设计', link: '/guide/project-overview' },
      { text: '实施与运维', link: '/implementation/network' },
      { text: '项目管理', link: '/management/procurement' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '方案设计',
          items: [
            { text: '项目总览', link: '/guide/project-overview' },
            { text: '系统架构', link: '/guide/architecture' },
            { text: '协作与变更流程', link: '/guide/workflow' },
            { text: '决策记录', link: '/guide/decision-log' },
          ],
        },
      ],
      '/implementation/': [
        {
          text: '实施与运维',
          items: [
            { text: '网络与弱电', link: '/implementation/network' },
            { text: '自动化场景', link: '/implementation/automation' },
          ],
        },
      ],
      '/management/': [
        {
          text: '项目管理',
          items: [
            { text: '采购与设备台账', link: '/management/procurement' },
            { text: '施工与验收', link: '/management/acceptance' },
          ],
        },
      ],
    },
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
    editLink: {
      pattern: 'https://github.com/renhedata/ai-lab-smart-office/edit/main/docs/:path',
      text: '在 GitHub 中编辑此页',
    },
    footer: {
      message: '内部项目资料 · 请按权限访问与共享',
      copyright: 'Copyright © 2026 AI实验室',
    },
  },
})
