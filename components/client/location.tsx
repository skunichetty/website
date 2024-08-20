"use client";
import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Icon from "../server/icon";

interface ClockProps {
  locale: string;
  timezone: string;
}

export function Clock({ locale, timezone }: ClockProps) {
  const [time, setTime] = useState(new Date());
  const [isClient, setClientState] = useState(false);

  useEffect(() => {
    setClientState(true);
    setInterval(() => {
      setTime(() => new Date());
    }, 1000);
  }, []);

  const timeString = time.toLocaleTimeString(locale, {
    timeZone: timezone,
  });
  const parts = timeString.split(" ");

  let clockContent = null;
  if (isClient) {
    clockContent = (
      <div className="flex flex-row justify-between min-w-[4.35rem]">
        <p>{parts[0]}</p>
        <p>{parts[1]}</p>
      </div>
    );
  }

  return <div>{clockContent}</div>;
}

export default function Location() {
  const locationContent = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(locationContent.current, {
      opacity: 1,
      duration: 2,
      xPercent: 0,
      ease: "power1.out",
    });
  });

  return (
    <div
      className="flex flex-row gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1 opacity-0"
      ref={locationContent}
    >
      <div className="flex flex-row items-center gap-1">
        <Icon name="location" />
        <h1>Chicago, IL, US</h1>
      </div>
      <div className="flex flex-row items-center gap-1">
        <Icon name="time" />
        <Clock locale="en-US" timezone="America/Chicago" />
      </div>
    </div>
  );
}
