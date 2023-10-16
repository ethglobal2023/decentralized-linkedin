import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BiBadgeCheck } from "react-icons/bi";
import { BsFillFilePersonFill, BsPeople } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useWallet } from "../hooks/useWallet";
import {RiAdminLine} from "react-icons/ri";

const SideBar = () => {
  const { address } = useWallet();
  return (
    <div
      style={{ display: "flex", height: "auto", minHeight: "400px" }}
      className=" border-r-2"
    >
      <Sidebar>
        <Menu>
          <MenuItem
            icon={<LuMessagesSquare />}
            component={<Link to="/" />}
          >
            Messages
          </MenuItem>
          <MenuItem icon={<AiOutlineSearch/>} component={<Link to={"/search"}/>}>Search</MenuItem>
          <MenuItem icon={<BiBadgeCheck/>}>Verifications</MenuItem>
          <MenuItem icon={<BsPeople />}>Network</MenuItem>
          <MenuItem
            icon={<BsFillFilePersonFill />}
            component={<Link to={`/profile/${address}`} />}
          >
            My Profile
          </MenuItem>
          <MenuItem icon={<RiAdminLine />} component={<Link to={"/admin"}/>}>Admin</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
