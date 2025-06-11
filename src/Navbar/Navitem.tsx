import React from "react";
import { Link } from "react-router-dom";

export interface INavItem {
  link: string;
  name: string;
  icon?: React.ReactNode;
}

const Navitem: React.FC<INavItem> = ({ link, name, icon }) => {
  return (
    <Link to={link}>
      <div className="px-5 py-1 text-foreground rounded-md hover:border-border hover:cursor-pointer flex flex-col justify-center items-center hover:border ">
        {icon}

        <span className="text-xs ">{name}</span>
      </div>
    </Link>
  );
};

export default Navitem;
