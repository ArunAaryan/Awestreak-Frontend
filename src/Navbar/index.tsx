// import { useTheme } from "@/components/theme-provider";
import Navitem, { INavItem } from "./Navitem";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PiUserListFill, PiListPlusFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";

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
  return (
    <div className="flex gap-2 mb-2 items-center justify-between md:justify-start">
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
