import Link from "next/link";

export interface NavbarItem {
  title: string;
  href: string;
}

interface NavbarItemProps extends NavbarItem {
  active: boolean;
}

export interface NavbarProps {
  links: NavbarItem[];
};

export function Logo() {
  return (
    <Link
      href="/"
      className="sm:text-xl text-md font-bold text-pretty hover:text-blue-500 transition"
    >
      skunichetty.dev
    </Link>
  );
}

export function DesktopNavbarItem({ title, href, active }: NavbarItemProps) {
  return (
    <Link
      className={`font-bold ${
        active ? "" : "text-gray-600 dark:text-gray-400"
      } hover:text-blue-500 transition`}
      href={href}
    >
      {title}
    </Link>
  );
}


