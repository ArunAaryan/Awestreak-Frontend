// import { useTheme } from "@/components/theme-provider";
import Navitem, { INavItem } from "./Navitem";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PiUserListFill, PiListPlusFill } from "react-icons/pi";
import { FaHome, FaUser } from "react-icons/fa";
import { createPortal } from "react-dom";
const index = () => {
  const links: Array<INavItem> = [
    { name: "All ", link: "/boards/all", icon: <PiListPlusFill size={30} /> },
    { name: "My", link: "/boards/my", icon: <PiUserListFill size={30} /> },
    { name: "Private", link: "/boards/private", icon: <FaUser size={30} /> },
    {
      name: "Create",
      link: "/boards/create",
      icon: <MdFormatListBulletedAdd size={30} />,
    },
    // { name: "Home", link: "/", icon: <FaHome size={30} /> },
    { name: "Me", link: "/me", icon: <FaUser size={30} /> },
  ];
  // const { setTheme } = useTheme();
  // const [toggleTheme, setToggleTheme] = useState(true);
  return createPortal(
    <nav className="fixed top-0 left-0 right-0 z-100 pt-2  backdrop-blur-md bg-background/80 shadow-lg">
      <div className="flex gap-2 mb-2 items-center justify-between md:justify-start md:gap-8 max-w-2xl m-auto rounded-xl p-1 overflow-x-auto hide-scrollbar">
        {links && links.map((link) => <Navitem {...link} key={link.name} />)}
      </div>
    </nav>,
    document.body
  );
};
export default index;
