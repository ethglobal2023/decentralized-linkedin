<<<<<<< HEAD:frontend-demo/app/src/components/SideBar.tsx
import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { AiOutlineSearch } from "react-icons/ai";
import { BiBadgeCheck } from "react-icons/bi";
import { BsFillFilePersonFill, BsPeople } from "react-icons/bs";
import { LuMessagesSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar>
        <Menu>
          <MenuItem
            icon={<AiOutlineSearch />}
            component={<Link to="/Search" />}>
            Search
          </MenuItem>
          <MenuItem icon={<BiBadgeCheck />}>Verifications</MenuItem>
          <MenuItem icon={<BsPeople />}> My Network</MenuItem>
          <MenuItem
            icon={<LuMessagesSquare />}
            component={<Link to="/inbox" />}>
            Messages
          </MenuItem>
          <MenuItem
            icon={<BsFillFilePersonFill />}
            component={<Link to="/profile" />}>
            Profile
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
=======

import React from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar';
import {AiOutlineSearch} from "react-icons/ai"
import {BiBadgeCheck} from "react-icons/bi"
import {BsFillFilePersonFill, BsPeople} from "react-icons/bs"
import {LuMessagesSquare} from "react-icons/lu"
import { Link } from 'react-router-dom';
const SideBar = () => {
  return (
    <div style={{ display: 'flex', height: 'auto', minHeight: '400px' }} className=' border-r-2'>
    <Sidebar>
    <Menu>
        <MenuItem icon={<AiOutlineSearch/>} >Search</MenuItem>
        <MenuItem icon={<BiBadgeCheck/>}>Verifications</MenuItem>

      <MenuItem  icon={<BsPeople/>} > My Network</MenuItem>
      <MenuItem icon={<LuMessagesSquare/>} component={<Link to="/inbox" />}>Messages</MenuItem>
      <MenuItem icon={<BsFillFilePersonFill/>} component={<Link to="/profile" />}>Profile</MenuItem>
    </Menu>
  </Sidebar>
  </div>
  )
}

export default SideBar
>>>>>>> main:frontend/app/src/components/SideBar.tsx
