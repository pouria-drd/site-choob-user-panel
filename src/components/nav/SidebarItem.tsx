import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface ItemChild {
  to: string;
  label: string;
}

interface SidebarItemProps {
  to?: string;
  label: string;
  icon: ReactNode;
  items?: ItemChild[];
}

function SidebarItem({ label, icon, to, items }: SidebarItemProps) {
  return (
    <div className="bg-white text-sc-blue-normal flex flex-col font-peyda rounded-lg w-full p-2">
      {items ? (
        <div className="flex flex-col w-full gap-2">
          <div className="flex items-center justify-end cursor-default gap-2 p-2">
            <h3 className="text-lg">{label}</h3>
            <span>{icon}</span>
          </div>

          {items.map((item, index) => (
            <NavLink
              key={index}
              to={item.to}
              className="hover:bg-sc-purple-normal flex items-center justify-end rounded-lg transition-all w-full gap-2 p-2"
            >
              <h3 className="text-lg mr-8">{item.label}</h3>
            </NavLink>
          ))}
        </div>
      ) : (
        <NavLink
          to={to ?? ""}
          className="hover:bg-sc-purple-normal flex items-center justify-end rounded-lg transition-all gap-2 p-2"
        >
          <h3 className="text-lg">{label}</h3>
          <span>{icon}</span>
        </NavLink>
      )}
    </div>
  );
}

export default SidebarItem;
