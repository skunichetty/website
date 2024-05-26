"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Icon from "./icon";

interface NavbarItemProps {
  title: string;
  href: string;
  active: boolean;
}

export interface NavbarItem {
  title: string;
  href: string;
}

interface NavbarProps {
  links: NavbarItem[];
}

interface NavbarSubtypeProps {
  links: NavbarItem[];
  pathname: string;
}

function NavbarRowItem({ title, href, active }: NavbarItemProps) {
  return (
    <Link
      className={`font-bold ${
        active ? "text-white" : "text-gray-400"
      } hover:text-blue-500 transition`}
      href={href}
    >
      {title}
    </Link>
  );
}

function NavbarDropdownItem({ title, href, active }: NavbarItemProps) {
  return (
    <Link
      className={`block w-full ${
        active ? "font-bold text-white" : "font-normal text-gray-400"
      } hover:text-blue-500 py-2 pl-3 transition flex flew-row items-center gap-2`}
      href={href}
    >
      {active ? <Icon name="arrow-right-sharp" /> : <></>} {title}
    </Link>
  );
}

function NavbarRow({ links, pathname }: NavbarSubtypeProps) {
  return (
    <ul className="flex-row sm:flex hidden divide-x-2 divide-gray-400 text-gray-400">
      {links.map((item) => (
        <li key={item.title} className="px-3 my-1">
          <NavbarRowItem
            title={item.title}
            href={item.href}
            active={pathname === item.href}
          />
        </li>
      ))}
    </ul>
  );
}

function NavbarDropdown({ links, pathname }: NavbarSubtypeProps) {
  return (
    <ul className="flex-col sm:hidden visible mt-6 divide-y-2 divide-gray-400 border-y-2 text-gray-400">
      {links.map((item) => (
        <li key={item.title}>
          <NavbarDropdownItem
            title={item.title}
            href={item.href}
            active={pathname === item.href}
          />
        </li>
      ))}
    </ul>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="sm:text-xl text-md font-bold text-pretty hover:text-blue-500 transition"
    >
      skunichetty.dev
    </Link>
  );
}

export default function Navbar({ links }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownActive, setDropdownActive] = useState(false);

  return (
    <div className="px-10 pt-10">
      <nav className={`flex flex-row items-center justify-between`}>
        <Logo />
        <NavbarRow links={links} pathname={pathname} />
        <button
          type="button"
          className="sm:hidden visible"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <Icon name="menu" />
        </button>
      </nav>
      {dropdownActive ? (
        <NavbarDropdown links={links} pathname={pathname} />
      ) : null}
    </div>
  );
}
