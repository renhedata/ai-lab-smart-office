import { Card, Cards } from "fumadocs-ui/components/card";
import { ArrowRight, Lightbulb, Network, Workflow } from "lucide-react";
import type { Metadata } from "next";

import { githubNewSolutionUrl } from "@/lib/layout.shared";

export const metadata: Metadata = {
  title: {
    absolute: "AI实验室 · DIY 智能办公室",
  },
  description: "查看已经整理好的智能办公室方案，或通过简单表单提供新方案。",
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-4 pt-12 pb-10 sm:pt-16">
        <p className="mb-3 text-sm font-medium text-fd-primary">AI 实验室 · 办公室改造</p>
        <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">智能办公室方案库</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-fd-muted-foreground">
          这里保存已经整理好的方案。你有更简单或更合适的做法，直接填写方案表单即可。
        </p>
        <a
          href={githubNewSolutionUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md bg-fd-primary px-4 py-2 text-sm font-medium text-fd-primary-foreground hover:opacity-90"
        >
          提供方案
          <ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-16" aria-labelledby="solutions-title">
        <h2 id="solutions-title" className="mb-4 text-xl font-semibold tracking-normal">
          已收录方案
        </h2>
        <Cards>
          <Card
            href="/docs/implementation/smart-office-plan/"
            icon={<Lightbulb />}
            title="智能化总体方案"
            description="照明、窗帘、环境与本地控制。"
          />
          <Card
            href="/docs/implementation/network/"
            icon={<Network />}
            title="网络与弱电"
            description="网络分区、供电、布线与验收。"
          />
          <Card
            href="/docs/implementation/automation/"
            icon={<Workflow />}
            title="自动化场景"
            description="控制顺序、回退方式与测试。"
          />
        </Cards>
      </section>
    </>
  );
}
