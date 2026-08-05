import { Card, Cards } from "fumadocs-ui/components/card";
import { BookOpen, ClipboardCheck, DraftingCompass } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "AI实验室 · DIY 智能办公室",
  },
  description:
    "AI实验室智能办公室改造项目入口：查看空间底图、现网基线、智能化方案、试点、采购与验收资料。",
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:py-24">
        <p className="mb-4 text-sm font-medium text-fd-primary">AI 实验室 · 办公室改造项目</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">DIY 智能办公室</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-fd-muted-foreground">
          项目现状、实施方案和验收资料集中在这里；从左到右按实际工作阶段阅读即可。
        </p>
      </section>

      <section className="mx-auto w-full max-w-4xl px-4 pb-16">
        <Cards>
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
            href="/docs/management/acceptance/"
            icon={<ClipboardCheck />}
            title="采购与验收"
            description="设备台账、施工记录和交付检查。"
          />
        </Cards>
      </section>
    </>
  );
}
