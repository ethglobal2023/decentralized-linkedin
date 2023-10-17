import "./Menu.css";
import React, { FC, PropsWithChildren } from "react";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { LuMessagesSquare } from "react-icons/lu";
import { BsPeople, BsPerson } from "react-icons/bs";
import { BiBadgeCheck } from "react-icons/bi";
import { RiAdminLine } from "react-icons/ri";
import { CiSettings } from "react-icons/ci";


const MenuIcon: FC<PropsWithChildren<{ tooltip: string; link: string }>> = ({
  tooltip,
  link,
  children,
}) => {
  return (
    <Tooltip
      content={tooltip}
      side={"bottom"}
      className={"bg-white text-gray-600"}
    >
      <Link to={link} className={"menu-link"}>
        <IconButton className="sidebar-buttons">{children}</IconButton>
      </Link>
    </Tooltip>
  );
};
export const Menu = () => {
  return (
    <>
      <div className="font-bold text-center text-xl p-4">
        <Routes>
          <Route path="/search" element={<div>Search</div>} />
          <Route path="/" element={<div>Messages</div>} />
          <Route path="/connections" element={<div>Connections</div>} />
          <Route path="/admin" element={<div>Admin</div>} />
          <Route path="/profile-demo" element={<div>My Profile</div>} />
          <Route path="/profile/:address" element={<div>Profile</div>} />
          <Route path="/settings" element={<div>Settings</div>} />
        </Routes>
      </div>
      <div className="mt-auto flex justify-between pb-6 border-b-[3px] max-w-[400px] px-4">
        
        <div  className="text-black border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:text-white ring-4  shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-full text-sm py-2 px-2 text-center  "><MenuIcon tooltip={"Search"} link={"/search"}>
          <AiOutlineSearch className={"menu-icon"} />
        </MenuIcon></div>
        <div className="text-black border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:text-white ring-4  shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-full text-sm py-2 px-2 text-center  ">
        <MenuIcon tooltip={"Messages"} link={"/"}>
          <LuMessagesSquare className={"menu-icon"} />
        </MenuIcon></div>
        <div className="text-black border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:text-white ring-4  shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-full text-sm py-2 px-2 text-center  ">
        <MenuIcon tooltip={"Connections"} link={"/connections"}>
          <BsPeople className={"menu-icon"} />
        </MenuIcon></div>
        <div className="text-black border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:text-white ring-4  shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-full text-sm py-2 px-2 text-center  ">
        <MenuIcon tooltip={"My Profile"} link={"/profile/:address"}>
          <BsPerson className={"menu-icon"} />
        </MenuIcon></div>
        <div className="text-black border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:text-white ring-4  shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-full text-sm py-2 px-2 text-center  ">
        <MenuIcon tooltip={"Admin"} link={"/admin"}>
          <RiAdminLine className={"menu-icon"} />
        </MenuIcon></div>
        <div className="text-black border-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br hover:text-white ring-4  shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-full text-sm py-2 px-2 text-center  ">
        <MenuIcon tooltip={"Settings"} link={"/settings"}>
          <CiSettings className={"menu-icon"} />
        </MenuIcon></div>
      </div>
    </>
  );
};
