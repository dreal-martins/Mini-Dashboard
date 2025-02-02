import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context";

interface Props {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export default function Navlink({ icon, label, path }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { closeSidebar } = useSidebar();

  return (
    <NavLink
      to={path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={closeSidebar}
      className={`flex items-center w-full p-2 gap-2 rounded-md ${
        isHovered ? "bg-[#ec1d26] text-white" : ""
      }`}
    >
      {icon} {label}
    </NavLink>
  );
}
