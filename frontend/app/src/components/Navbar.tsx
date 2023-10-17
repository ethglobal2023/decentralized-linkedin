import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Navbar = () => {
  return (
    <nav className="border-gray-200 border-b-2">
      <div className="container mx-auto">
        <div className="flex justify-between p-4 ">
          <a href="/" className="flex">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 mr-3"
              alt="Logo"
            />
            <span className="text-2xl font-semibold whitespace-nowrap">
              Decentralized LinkedIn
            </span>
          </a>
          <div className="ml-auto">
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
