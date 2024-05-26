import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  output: "export",
  images: { unoptimized: true },
};

const withMDX = createMDX({});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
