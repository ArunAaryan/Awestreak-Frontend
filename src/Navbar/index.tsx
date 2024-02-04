import Navitem, { INavItem } from "./Navitem";

const index = () => {
  const links: Array<INavItem> = [
    { name: "All Boards", link: "/board/all" },
    { name: "My Boards", link: "/myboards" },
    { name: "Create Board", link: "/board/create" },
  ];
  return (
    <div className="flex gap-4">
      {links && links.map((link) => <Navitem {...link} key={link.name} />)}
    </div>
  );
};
export default index;
