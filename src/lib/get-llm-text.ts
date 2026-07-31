import type { InferPageType } from "fumadocs-core/source";

import type { source } from "@/lib/source";

export async function getLLMText(page: InferPageType<typeof source>) {
  const raw = await page.data.getText("raw");
  const content = raw.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "").trimStart();

  return `# ${page.data.title} (${page.url})

${content}`;
}
