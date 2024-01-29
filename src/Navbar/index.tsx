import React from "react";
import Navitem, { INavItem } from "./Navitem";

const index = () => {
  const links: Array<INavItem> = [
    { name: "All Boards", link: "/allboards" },
    { name: "My Boards", link: "/myboards" },
  ];
  return (
    <div className="flex gap-4">
      {links && links.map((link) => <Navitem {...link} />)}
    </div>
  );
};
export default index;
