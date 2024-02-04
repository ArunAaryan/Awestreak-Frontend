import React from "react";
import { Link } from "react-router-dom";

export interface INavItem {
  link: string;
  name: string;
}
const Navitem: React.FC<INavItem> = ({ link, name }) => {
  return (
    <Link to={link}>
      <div className="px-2 py-0.5 text-gray-50 border-2 border-gray-100 rounded-md hover:border-gray-700">
        {name}
      </div>
    </Link>
  );
};

export default Navitem;
