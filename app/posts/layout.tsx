import { Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Posts",
  description: "All Blog Posts by Sachchit Kunichetty",
};

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: LayoutProps) {
  return <div className={`${inter.className} lg:mx-60 mx-10 block`}>{children}</div>;
}
