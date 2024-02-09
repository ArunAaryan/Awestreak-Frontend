import Navitem, { INavItem } from "./Navitem";

const index = () => {
  const links: Array<INavItem> = [
    { name: "All Boards", link: "/boards/all" },
    { name: "My Boards", link: "/boards/my" },
    { name: "Create Board", link: "/boards/create" },
  ];
  return (
    <div className="flex gap-4">
      {links && links.map((link) => <Navitem {...link} key={link.name} />)}
    </div>
  );
};
export default index;
