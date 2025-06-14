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
    <Link to={link}>
      <div
        className={`px-5 py-1 text-foreground
           rounded-md hover:border-border hover:cursor-pointer flex flex-col 
           justify-center items-center hover:border transition-all duration-300 
           ease-in-out ${
             isSelected
               ? "bg-primary text-primary-foreground font-semibold"
               : ""
           }`}
      >
        {icon}

        <span className="text-xs ">{name}</span>
      </div>
    </Link>
  );
};

export default Navitem;
