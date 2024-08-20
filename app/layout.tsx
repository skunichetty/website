import Footer from "@/components/server/footer";
import Navbar from "@/components/client/navbar";
import { NavbarItem } from "@/components/server/navbar_static";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import "@wooorm/starry-night/style/both";

const inter_tight = Inter_Tight({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | skunichetty.dev",
    default: "skunichetty.dev",
  },
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
  ];

  return (
    <html lang="en">
      <body className={`${inter_tight.className} flex flex-col min-h-screen`}>
        <Navbar links={links} />
        <main className="content my-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
