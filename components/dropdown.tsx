import Icon from "./icon";
import { useState } from "react";

interface DropdownProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

export default function Dropdown({ icon, title, children }: DropdownProps) {
  const [contentVisible, setContentVisibility] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setContentVisibility(!contentVisible)}
        className={`${
          contentVisible ? "text-white" : "text-gray-400"
        } hover:text-blue-500 transition`}
      >
        <div className="flex flex-row items-center gap-2">
          <Icon name={contentVisible ? "caret_up" : "caret_down"} />
          <h1>{title}</h1>
          <Icon name={icon} />
        </div>
      </button>
      {contentVisible ? (
        <div className="flex flex-col ml-6 my-2 items-left">{children}</div>
      ) : null}
    </div>
  );
}
