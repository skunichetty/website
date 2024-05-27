import Footer from "@/app/components/footer";
import Navbar, { NavbarItem } from "@/app/components/navbar";
import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

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
        <div className="content my-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
