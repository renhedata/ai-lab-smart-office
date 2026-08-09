import { Card, Cards } from "fumadocs-ui/components/card";
import { BookOpen, ClipboardCheck, DraftingCompass, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AI实验室 · DIY 智能办公室",
  },
  description:
    "AI实验室智能办公室共创项目入口：提交真实需求，参加试点，查看方案、决策与验收记录。",
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-24">
        <p className="mb-4 text-sm font-medium text-fd-primary">AI 实验室 · 办公室改造项目</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">DIY 智能办公室</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">
          从真实办公问题出发，让每位同事都能提建议、看处理结果、参加试点；
          只把经过验证、可维护、可回退的方案推广。
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-16">
        <Cards>
          <Card
            href="/docs/participation/"
            icon={<MessageSquare />}
            title="参与共创"
            description="提问题、参加讨论或报名试点。"
          />
          <Card
            href="/docs/guide/project-overview/"
            icon={<BookOpen />}
            title="项目概览"
            description="目标、办公室布局和现有网络。"
          />
          <Card
            href="/docs/implementation/smart-office-plan/"
            icon={<DraftingCompass />}
            title="方案与实施"
            description="智能化、网络和自动化设计。"
          />
          <Card
            href="/docs/management/records/"
            icon={<ClipboardCheck />}
            title="记录与验收"
            description="需求、试点、决策、台账和交付证据。"
          />
        </Cards>
      </section>
    </>
  );
}
