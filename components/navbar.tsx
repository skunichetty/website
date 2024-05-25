"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function NavbarPill({ title, href, active }: NavbarItemProps) {
  return (
    <Link
      className={`font-bold ${
        active ? "border-b-2  hover:border-blue-600" : ""
      } hover:text-blue-600 transition`}
      href={href}
    >
      {title}
    </Link>
  );
}

function NavbarRow({ title, href, active }: NavbarItemProps) {
  return (
    <Link
      className={`block w-full ${
        active ? "font-bold" : "font-normal"
      } hover:text-blue-600 py-2 pl-3 transition flex flew-row items-center gap-2`}
      href={href}
    >
      {active ? <Icon name="arrow-right-sharp" /> : <></>} {title}
    </Link>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="sm:text-xl text-md font-bold text-pretty  hover:text-blue-600 transition"
    >
      skunichetty.dev
    </Link>
  );
}

export default function Navbar({ links }: NavbarProps) {
  const pathname = usePathname();
  const [dropdownActive, setDropdownActive] = useState(true);

  return (
    <div>
      <nav
        className={`flex flex-row items-center justify-between ${
          dropdownActive ? "mb-2" : "mb-5"
        }`}
      >
        <Logo />
        <ul className="flex-row sm:flex hidden divide-x-2">
          {links.map((item) => (
            <li key={item.title} className="px-3 my-1">
              <NavbarPill
                title={item.title}
                href={item.href}
                active={pathname === item.href}
              />
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="sm:hidden visible"
          onClick={() => setDropdownActive(!dropdownActive)}
        >
          <Icon name="menu" />
        </button>
      </nav>
      {dropdownActive ? (
        <ul className="flex-col sm:hidden visible mb-5 divide-y-2 border-y-2">
          {links.map((item) => (
            <li key={item.title}>
              <NavbarRow
                title={item.title}
                href={item.href}
                active={pathname === item.href}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div></div>
      )}
    </div>
  );
}
