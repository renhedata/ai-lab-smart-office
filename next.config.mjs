import { createMDX } from "fumadocs-mdx/next";

const nextConfig = {
  output: "export",
  basePath: "/ai-lab-smart-office",
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/ai-lab-smart-office",
  },
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
