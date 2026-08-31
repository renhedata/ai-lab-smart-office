import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const githubRepositoryUrl = "https://github.com/renhedata/ai-lab-smart-office";
export const githubNewSolutionUrl = `${githubRepositoryUrl}/issues/new?template=idea.yml`;

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "AI实验室 · 智能办公室",
  },
  links: [
    { text: "方案库", url: "/docs", active: "nested-url" },
    { text: "提供方案", url: githubNewSolutionUrl, active: "none", external: true },
  ],
};
