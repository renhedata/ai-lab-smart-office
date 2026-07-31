// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
  site: 'https://renhedata.github.io',
  base: '/ai-lab-smart-office',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'AI实验室 · 智能办公室',
      description: 'DIY 智能办公室方案与实施文档库',
      logo: {
        src: './src/assets/logo.svg',
      },
      locales: {
        root: {
          label: '简体中文',
          lang: 'zh-CN',
        },
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/renhedata/ai-lab-smart-office',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/renhedata/ai-lab-smart-office/edit/main/',
      },
      lastUpdated: true,
      sidebar: [
        {
          label: '快速开始',
          items: ['guide/getting-started', 'guide/project-overview'],
        },
        {
          label: '规划设计',
          items: [
            'guide/office-layout',
            'implementation/smart-office-plan',
            'implementation/network',
          ],
        },
        {
          label: '实施交付',
          items: [
            'implementation/automation',
            'management/procurement',
            'management/acceptance',
          ],
        },
        {
          label: '运行维护',
          items: [
            'guide/architecture',
            'guide/workflow',
            'guide/decision-log',
          ],
        },
      ],
    }),
  ],
})
