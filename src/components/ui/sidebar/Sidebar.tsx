"use client";
import { useSidebarStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import { IoHomeOutline, IoDiamond, IoClose } from "react-icons/io5";
import { MdCategory } from "react-icons/md";

import { FaUsers } from "react-icons/fa6";
import { PiListChecksFill } from "react-icons/pi";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaPeopleCarry } from "react-icons/fa";

const menu = [
  {
    name: "Dashboard",
    icon: <IoHomeOutline size={20} />,
    path: "/admin",
    roles: ["admin", "super-admin"],
  },
  {
    name: "Productos",
    icon: <IoDiamond size={20} />,
    path: "/admin/productos",
    roles: ["admin", "super-admin"],
  },
  {
    name: "Usuarios",
    icon: <FaUsers size={20} />,
    path: "/admin/usuarios",
    roles: ["super-admin"],
  },
  {
    name: "Mayoristas",
    icon: <FaPeopleCarry size={20} />,
    path: "/admin/mayoristas",
    roles: ["super-admin"],
  },
  {
    name: "Ordenes",
    icon: <PiListChecksFill size={20} />,
    path: "/admin/ordenes",
    roles: ["admin", "super-admin"],
  },
  {
    name: "Categorías",
    icon: <MdCategory size={20} />,
    path: "/admin/categorias",
    roles: ["super-admin"],
  },
  {
    name: "Subcategorias",
    icon: <BiSolidCategoryAlt size={20} />,
    path: "/admin/subcategorias",
    roles: ["super-admin"],
  },
];

export const SideBar = ({ role }: { role: string }) => {
  const isSideMenuOpen = useSidebarStore((state) => state.isSideMenuOpen);
  const toggleSideMenu = useSidebarStore((state) => state.toogleSideMenu);

  const menuFiltered = menu.filter((o) => o.roles.includes(role));

  return (
    <aside
      className={clsx(
        " fixed text-title z-10 border-r-[1px] border-default bg-slate-950  h-screen pr-5 transition-all duration-500",
        {
          "translate-x-0": isSideMenuOpen,
          "-translate-x-full": !isSideMenuOpen,
        }
      )}
    >
      <div className="text-end">
        <button className="text-white" onClick={toggleSideMenu}>
          <IoClose size={30} />
        </button>
      </div>
      <div className="grid  text-white font-bold  ">
        <ul className="flex flex-col gap-3 w-full px-2 mt-4">
          {menuFiltered.map((menu) => (
            <li key={menu.name}>
              <Link href={menu.path} className="flex gap-2 items-center">
                {menu.icon}
                <h1>{menu.name}</h1>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
