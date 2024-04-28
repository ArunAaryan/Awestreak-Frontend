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
      <div className="px-5 py-1 text-gray-50 rounded-md hover:border-gray-200 hover:cursor-pointer flex flex-col justify-center items-center hover:border ">
        {icon}

        <span className="text-xs ">{name}</span>
      </div>
    </Link>
  );
};

export default Navitem;
