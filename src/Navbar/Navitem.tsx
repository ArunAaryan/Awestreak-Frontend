import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface INavItem {
  link: string;
  name: string;
  icon?: React.ReactNode;
}

const Navitem: React.FC<INavItem> = ({ link, name, icon }) => {
  const currentPath = useLocation().pathname;
  const isSelected = currentPath === link;
  return (
    <Link
      to={link}
      tabIndex={0}
      aria-label={name}
      aria-current={isSelected ? "page" : undefined}
    >
      <div
        className={`px-5 py-1 text-foreground rounded-lg flex flex-col justify-center items-center border border-transparent
          transition-all duration-200 ease-in-out
          hover:bg-primary/10 hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary
          ${
            isSelected
              ? "bg-primary text-primary-foreground font-semibold shadow-lg border-primary"
              : ""
          }`}
        tabIndex={-1}
      >
        {icon}
        <span className="text-xs mt-1 tracking-wide select-none">{name}</span>
      </div>
    </Link>
  );
};

export default Navitem;
