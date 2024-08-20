"use client";
import { useState, useRef } from "react";
import Icon from "../server/icon";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface DropdownProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function Dropdown({ icon, title, children }: DropdownProps) {
  const [contentVisible, setContentVisibility] = useState(false);
  const [visibleAnim, setVisibleAnim] = useState<gsap.core.Timeline | null>(
    null
  );

  const dropdown = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      let tl = gsap.timeline({ paused: true });
      tl.fromTo(
        content.current,
        {
          yPercent: -100,
          opacity: 0,
        },
        {
          yPercent: 0,
          duration: 1,
          opacity: 1,
          onStart: () => setContentVisibility(true),
          onReverseComplete: () => setContentVisibility(false),
          ease: "power3.out",
        }
      );
      tl.to(
        arrow.current,
        {
          rotate: 180,
          duration: 1,
          ease: "power3.out",
        },
        0
      );
      setVisibleAnim(tl);
    },
    { scope: dropdown }
  );

  const toggle = contextSafe(() => {
    if (contentVisible) {
      visibleAnim?.timeScale(2).reverse();
    } else {
      visibleAnim?.play();
    }
  });

  return (
    <div ref={dropdown}>
      <button
        type="button"
        onClick={toggle}
        className="hover:text-blue-500 flex flex-row items-center gap-2"
      >
        <div ref={arrow}>
          <Icon name="caret_up" />
        </div>
        <h1>{title}</h1>
        <Icon name={icon} />
      </button>
      <div className="overflow-hidden">
        <div ref={content}>
          {contentVisible && (
            <div className="flex flex-col ml-6 my-2 items-left">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}
