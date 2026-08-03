"use client";

import { MessageCircleIcon } from "lucide-react";
import { useEffect, useRef } from "react";

import { githubDiscussionsUrl } from "@/lib/layout.shared";

const giscusOrigin = "https://giscus.app";

function getGiscusTheme() {
  return document.documentElement.classList.contains("dark") ? "dark_dimmed" : "light";
}

function updateGiscusTheme(container: HTMLDivElement) {
  const iframe = container.querySelector<HTMLIFrameElement>("iframe.giscus-frame");

  iframe?.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: getGiscusTheme(),
        },
      },
    },
    giscusOrigin,
  );
}

export function GiscusComments({ pageKey }: { pageKey: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();

    const script = document.createElement("script");
    script.src = `${giscusOrigin}/client.js`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "renhedata/ai-lab-smart-office");
    script.setAttribute("data-repo-id", "R_kgDOTo6ovw");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOTo6ov84DCkJg");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "1");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", getGiscusTheme());
    script.setAttribute("data-lang", "zh-CN");
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, [pageKey]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new MutationObserver(() => updateGiscusTheme(container));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="mt-12 border-t pt-8" aria-labelledby="document-discussion-title">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <MessageCircleIcon className="size-5 text-fd-primary" aria-hidden="true" />
        <h2 id="document-discussion-title" className="text-xl font-semibold tracking-tight">
          讨论本文
        </h2>
      </div>
      <p className="mt-2 text-sm text-fd-muted-foreground">
        登录 GitHub 后即可对本页留言、回复和添加表情。需要讨论跨页面议题时，请前往
        {" "}
        <a href={githubDiscussionsUrl} target="_blank" rel="noreferrer noopener" className="underline">
          项目讨论区
        </a>
        。
      </p>
      <div ref={containerRef} className="mt-6 min-h-40" />
    </section>
  );
}
