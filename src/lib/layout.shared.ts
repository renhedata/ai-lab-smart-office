import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export const githubRepositoryUrl = "https://github.com/renhedata/ai-lab-smart-office";
export const githubDiscussionsUrl = `${githubRepositoryUrl}/discussions`;

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: "AI实验室 · 智能办公室",
  },
  links: [
    { text: "文档", url: "/docs", active: "nested-url" },
    { text: "讨论", url: githubDiscussionsUrl, active: "none", external: true },
  ],
  githubUrl: githubRepositoryUrl,
};
