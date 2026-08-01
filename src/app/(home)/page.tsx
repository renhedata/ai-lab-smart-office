import { Callout } from "fumadocs-ui/components/callout";
import { Card, Cards } from "fumadocs-ui/components/card";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  DraftingCompass,
  Map,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

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
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:py-20">
        <div>
          <p className="mb-4 text-sm font-medium text-fd-primary">
            AI 实验室 · 办公室改造项目
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            DIY 智能办公室
            <br />
            方案与实施
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-fd-muted-foreground">
            从二维底图和现网基线出发，统一规划网络、照明、窗帘、环境感知与自动化，
            并用可复核的记录完成试点、施工和验收。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/docs/"
              className={buttonVariants({
                color: "primary",
                className: "gap-2 px-4 py-2",
              })}
            >
              进入项目文档
              <ArrowRight />
            </Link>
            <Link
              href="/docs/guide/project-overview/"
              className={buttonVariants({
                color: "outline",
                className: "px-4 py-2",
              })}
            >
              查看项目总览
            </Link>
          </div>
        </div>

        <Card
          href="/docs/guide/office-layout/"
          title="项目空间底图"
          description="二维平面底图初稿；内部尺寸、墙厚和门窗位置仍须现场复核。"
        >
          <img
            src={`${basePath}/layout/office-layout-2d.svg`}
            alt="AI实验室办公室二维平面底图"
            className="mt-4 max-h-[440px] w-full rounded-lg border bg-white object-contain"
          />
        </Card>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <Callout type="warning" title="当前阶段：方案设计与现场复核">
          文档中的点位、设备数量和部分尺寸在现场确认前均为规划值。下一步是冻结试点点位、
          设备清单、预算和验收标准。
        </Callout>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">从这里开始</h2>
          <p className="mt-2 text-fd-muted-foreground">
            首页只提供项目入口；完整目录、全文搜索和维护方法都在文档中。
          </p>
          <Cards className="mt-6">
            <Card
              href="/docs/guide/project-overview/"
              icon={<BookOpen />}
              title="项目总览"
              description="先了解改造目标、工作范围、交付物和建议阶段。"
            />
            <Card
              href="/docs/guide/office-layout/"
              icon={<Map />}
              title="空间与现状"
              description="从办公室底图、功能分区和现网基线确认改造边界。"
            />
            <Card
              href="/docs/implementation/smart-office-plan/"
              icon={<DraftingCompass />}
              title="方案与实施"
              description="查看灯光、窗帘、环境、网络和本地自动化的总体设计。"
            />
            <Card
              href="/docs/management/acceptance/"
              icon={<ClipboardCheck />}
              title="交付与运维"
              description="用采购记录、施工证据和异常回退测试完成交付闭环。"
            />
          </Cards>
        </div>
      </section>
    </>
  );
}
