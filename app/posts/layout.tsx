import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Posts",
  description: "All Blog Posts by Sachchit Kunichetty",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function PostLayout({ children }: LayoutProps) {
  return <div className="px-10">{children}</div>;
}
