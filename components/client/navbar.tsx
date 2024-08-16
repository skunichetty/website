"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import Icon from "@/components/server/icon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DELAY_FACTOR = 0.2;

interface NavbarItemProps {
  title: string;
  href: string;
  active: boolean;
}

interface NavbarItemDropdownProps {
  title: string;
  href: string;
  active: boolean;
  timeline: gsap.core.Timeline | null;
  index: number;
}

export interface NavbarItem {
  title: string;
  href: string;
}

interface NavbarProps {
  links: NavbarItem[];
}

function NavbarRowItem({ title, href, active }: NavbarItemProps) {
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

function NavbarDropdownItem({
  title,
  href,
  active,
  timeline,
  index,
}: NavbarItemDropdownProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    timeline &&
      timeline.fromTo(
        linkRef.current,
        { opacity: 0, xPercent: -10 },
        { opacity: 1, duration: 0.75, xPercent: 0 },
        index * DELAY_FACTOR
      );
  });

  return (
    <div className="flex flex-row items-center">
      <Link
        ref={linkRef}
        className={`block w-full ${
          active ? "font-bold" : "font-normal text-gray-600 dark:text-gray-400"
        } hover:text-blue-500 transition flex flew-row items-center gap-2 py-1 opacity-0`}
        href={href}
      >
        <Icon name="arrow-right-sharp" /> {title}
      </Link>
    </div>
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
  const [dropAnim, setDropAnim] = useState<gsap.core.Timeline | null>(null);

  const navbar = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      let tl = gsap.timeline({ paused: true });
      tl.fromTo(
        dropdownRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: links.length * DELAY_FACTOR,
          onStart: () => setDropdownActive(true),
          onReverseComplete: () => setDropdownActive(false),
        }
      );
      setDropAnim(tl);
    },
    { scope: navbar }
  );
  const toggle = contextSafe(() => {
    if (dropdownActive) {
      dropAnim?.timeScale(2).reverse();
    } else {
      dropAnim?.play();
    }
  });

  const row = (
    <ul className="flex-row sm:flex hidden divide-x-2 divide-gray-400 text-gray-600 dark:text-gray-400">
      {links.map((item) => (
        <li key={item.title} className="px-3">
          <NavbarRowItem
            title={item.title}
            href={item.href}
            active={pathname === item.href}
          />
        </li>
      ))}
    </ul>
  );

  const dropdown = (
    <div ref={dropdownRef}>
      {dropdownActive ? (
        <div className="mt-6 border-y-2 py-2 sm:hidden visible">
          <h4 className="mb-1">Navigation</h4>
          <ul className="flex-col  text-gray-600 dark:text-gray-400">
            {links.map((item, index) => (
              <li key={item.title}>
                <NavbarDropdownItem
                  title={item.title}
                  href={item.href}
                  active={pathname === item.href}
                  timeline={dropAnim!}
                  index={index}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );

  return (
    <nav ref={navbar} className="px-10 pt-10">
      <div className="flex flex-row items-center justify-between">
        <Logo />
        {row}
        <button type="button" className="sm:hidden visible" onClick={toggle}>
          <Icon name="menu" />
        </button>
      </div>
      {dropdown}
    </nav>
  );
}
