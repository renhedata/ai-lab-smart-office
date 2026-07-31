import { RootProvider } from "fumadocs-ui/provider/next";
import { defineTranslations } from "fumadocs-core/i18n";
import { uiTranslations } from "fumadocs-ui/i18n";
import { zhCN } from "@fumadocs/language/zh-cn";
import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./global.css";

const translations = defineTranslations().extend(uiTranslations()).preset(zhCN()).get();

export const metadata: Metadata = {
  metadataBase: new URL("https://renhedata.github.io/ai-lab-smart-office/"),
  title: {
    default: "AI实验室 · DIY 智能办公室",
    template: "%s | AI实验室 · 智能办公室",
  },
  description: "从现状、设计、实施到验收维护的智能办公室项目文档。",
  icons: {
    icon: "/ai-lab-smart-office/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <RootProvider
          search={{
            options: {
              type: "static",
              api: "/ai-lab-smart-office/api/search",
            },
          }}
          i18n={{
            locale: "zh-CN",
            translations,
          }}
          theme={{
            enableSystem: true,
            defaultTheme: "system",
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
