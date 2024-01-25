import HomeIcon from "../icons/HomeIcon";
import SidebarItem from "./SidebarItem";
import CalculatorIcon from "../icons/CalculatorIcon";

function Sidebar() {
  // Options for the SidebarItem
  const links = [{ label: "لیست ابعاد فعال", to: "/dimensions" },
  { label: "تاریخچه ابعاد", to: "/dimensions-history" }];

  return (
    <div className="flex flex-col bg-sc-purple-normal w-full h-full p-4 gap-4">
      <SidebarItem label="خانه" icon={<HomeIcon />} />
      <SidebarItem label="محاسبات" icon={<CalculatorIcon />} items={links} />
    </div>
  );
}

export default Sidebar;
