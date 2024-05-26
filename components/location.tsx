"use client";
import { useEffect, useState } from "react";
import Icon from "./icon";

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
  if (isClient) {
    return (
      <div className="flex flex-row justify-between min-w-[4.35rem]">
        <p>{parts[0]}</p>
        <p>{parts[1]}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default function Location() {
  return (
    <div className="flex flex-row gap-4 text-sm text-gray-500 dark:text-gray-400 mt-1">
      <div className="flex flex-row items-center gap-1">
        <Icon name="location" />
        <h1>New York, NY, US</h1>
      </div>
      <div className="flex flex-row items-center gap-1">
        <Icon name="time" />
        <Clock locale="en-US" timezone="America/New_York" />
      </div>
    </div>
  );
}
