import * as FilesComponents from "fumadocs-ui/components/files";
import * as TabsComponents from "fumadocs-ui/components/tabs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/notebook/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DiscussionButton, LLMCopyButton, ViewOptions } from "@/components/ai/page-actions";
import { githubRepositoryUrl } from "@/lib/layout.shared";
import { source } from "@/lib/source";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  const MDX = page.data.body;
  const markdownSlug = page.slugs.length > 0 ? page.slugs.join("/") : "index";
  const markdownUrl = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/markdown/${markdownSlug}.md`;

  return (
    <DocsPage toc={page.data.toc} tableOfContent={{ style: "clerk" }} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <div className="flex flex-row items-center gap-2 border-b pt-2 pb-6">
        <LLMCopyButton markdownUrl={markdownUrl} />
        <DiscussionButton />
        <ViewOptions
          markdownUrl={markdownUrl}
          githubUrl={`${githubRepositoryUrl}/blob/main/content/docs/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX components={{ ...defaultMdxComponents, ...TabsComponents, ...FilesComponents }} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
