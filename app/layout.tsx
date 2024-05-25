import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar, { NavbarItem } from "@/components/navbar";

const inter_tight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "skunichetty.dev",
  description: "Sachchit Kunichetty's Personal Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links: NavbarItem[] = [
    {
      title: "Posts",
      href: "/posts",
    },
    {
      title: "About Me",
      href: "/aboutme",
    },
  ];

  return (
    <html lang="en">
      <body className={`${inter_tight.className} p-10`}>
        <Navbar links={links} />
        {children}
      </body>
    </html>
  );
}
