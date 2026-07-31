import { notFound } from "next/navigation";

import { getLLMText } from "@/lib/get-llm-text";
import { source } from "@/lib/source";

export const dynamic = "force-static";
export const revalidate = false;

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

function getMarkdownSegments(slugs: string[]) {
  const segments = slugs.length > 0 ? slugs : ["index"];
  const filename = segments.at(-1);

  return [...segments.slice(0, -1), `${filename}.md`];
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const page = source
    .getPages()
    .find((candidate) => getMarkdownSegments(candidate.slugs).join("/") === slug.join("/"));

  if (!page) notFound();

  return new Response(await getLLMText(page), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getMarkdownSegments(page.slugs),
  }));
}
