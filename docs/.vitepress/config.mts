import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'AI实验室',
  description: 'DIY 智能办公室方案与实施文档库',
  base: process.env.GITHUB_PAGES || process.env.GITHUB_ACTIONS ? '/ai-lab-smart-office/' : '/',
  lang: 'zh-CN',
  cleanUrls: true,
  ignoreDeadLinks: [
    /^\/layout\/office-layout-2d\.dxf(?:\?.*)?$/,
    /^\/layout\/office-layout-2d-cad\.zip$/,
  ],
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'AI实验室 · 智能办公室',
    nav: [
      { text: '首页', link: '/', activeMatch: '^/$' },
      {
        text: '快速开始',
        link: '/guide/getting-started',
        activeMatch: '^/guide/(getting-started|project-overview)$',
      },
      {
        text: '规划设计',
        link: '/guide/office-layout',
        activeMatch:
          '^/(guide/office-layout|implementation/(smart-office-plan|network))$',
      },
      {
        text: '实施交付',
        link: '/implementation/automation',
        activeMatch:
          '^/(implementation/automation|management/(procurement|acceptance))$',
      },
      {
        text: '运行维护',
        link: '/guide/architecture',
        activeMatch: '^/guide/(architecture|workflow|decision-log)$',
      },
    ],
    sidebar: [
      {
        text: '快速开始',
        collapsed: false,
        items: [
          { text: '使用指南', link: '/guide/getting-started' },
          { text: '项目总览', link: '/guide/project-overview' },
        ],
      },
      {
        text: '规划设计',
        collapsed: false,
        items: [
          { text: '办公室布局', link: '/guide/office-layout' },
          {
            text: '智能化总体方案',
            link: '/implementation/smart-office-plan',
          },
          { text: '网络与弱电规划', link: '/implementation/network' },
        ],
      },
      {
        text: '实施交付',
        collapsed: false,
        items: [
          { text: '自动化场景', link: '/implementation/automation' },
          { text: '采购与设备台账', link: '/management/procurement' },
          { text: '施工与验收', link: '/management/acceptance' },
        ],
      },
      {
        text: '运行维护',
        collapsed: false,
        items: [
          { text: '当前网络现状', link: '/guide/architecture' },
          { text: '协作与变更流程', link: '/guide/workflow' },
          { text: '决策记录', link: '/guide/decision-log' },
        ],
      },
    ],
    outline: {
      level: [2, 3],
      label: '本页目录',
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        disableQueryPersistence: true,
        translations: {
          button: {
            buttonText: '搜索方案、设备、房间…',
            buttonAriaLabel: '搜索方案、设备或房间',
          },
          modal: {
            displayDetails: '显示详细结果',
            resetButtonTitle: '清除搜索内容',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到匹配内容',
            footer: {
              selectText: '打开',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换结果',
              navigateUpKeyAriaLabel: '向上箭头',
              navigateDownKeyAriaLabel: '向下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc 键',
            },
          },
        },
      },
    },
    lastUpdated: {
      text: '最后更新',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '文档目录',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳到正文',
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
