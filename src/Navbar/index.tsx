import { useTheme } from "@/components/theme-provider";
import Navitem, { INavItem } from "./Navitem";
import { useState } from "react";

const index = () => {
  const links: Array<INavItem> = [
    { name: "All ", link: "/boards/all" },
    { name: "My", link: "/boards/my" },
    { name: "Create Board", link: "/boards/create" },
    { name: "Home", link: "/" },
  ];
  const { setTheme } = useTheme();
  const [toggleTheme, setToggleTheme] = useState(true);
  return (
    <div className="flex gap-2 mb-2">
      {links && links.map((link) => <Navitem {...link} key={link.name} />)}
      {/*   <button */}
      {/*     onClick={() => { */}
      {/*       setTheme(toggleTheme ? "light" : "dark"); */}
      {/*       setToggleTheme(!toggleTheme); */}
      {/*     }} */}
      {/*   > */}
      {/*     Buton */}
      {/*   </button> */}
    </div>
  );
};
export default index;
