// import { useTheme } from "@/components/theme-provider";
import Navitem, { INavItem } from "./Navitem";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PiUserListFill, PiListPlusFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { createPortal } from "react-dom";
const index = () => {
  const links: Array<INavItem> = [
    { name: "All ", link: "/boards/all", icon: <PiListPlusFill size={30} /> },
    { name: "My", link: "/boards/my", icon: <PiUserListFill size={30} /> },
    {
      name: "Create",
      link: "/boards/create",
      icon: <MdFormatListBulletedAdd size={30} />,
    },
    { name: "Home", link: "/", icon: <FaHome size={30} /> },
  ];
  // const { setTheme } = useTheme();
  // const [toggleTheme, setToggleTheme] = useState(true);
  return createPortal(
    <div className="fixed top-0 left-0 right-0 z-100 pt-2 backdrop-blur-md px-2  ">
      <div className="flex gap-2 mb-2 items-center justify-between md:justify-start md:gap-8 max-w-2xl m-auto">
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
    </div>,
    document.body
  );
};
export default index;
