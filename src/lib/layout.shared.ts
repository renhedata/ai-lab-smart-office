import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "AI实验室 · 智能办公室",
  },
  links: [
    { text: "指南", url: "/guide/getting-started/", active: "url" },
    { text: "总览", url: "/guide/project-overview/", active: "url" },
    { text: "布局", url: "/guide/office-layout/", active: "url" },
    {
      text: "智能化",
      url: "/implementation/smart-office-plan/",
      active: "url",
    },
    { text: "验收", url: "/management/acceptance/", active: "url" },
  ],
  githubUrl: "https://github.com/renhedata/ai-lab-smart-office",
};
