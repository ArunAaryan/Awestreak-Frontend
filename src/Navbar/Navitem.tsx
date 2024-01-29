import React from "react";

export interface INavItem {
  link: string;
  name: string;
}
const Navitem: React.FC<INavItem> = ({ link, name }) => {
  return (
    <a href={link}>
      <div className="px-2 py-0.5 text-gray-50 border-2 border-gray-100 rounded-md hover:border-gray-700">
        {name}
      </div>
    </a>
  );
};

export default Navitem;
