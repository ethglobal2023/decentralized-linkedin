import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState, useEffect, useContext } from "react";
import LoginWithEmail from "./LoginWithEmail";
import { User } from "@supabase/supabase-js";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { decryptWithDeviceKey } from "../library/embedded_wallet";
import { useAccount, useWalletClient } from "wagmi";
import { useWallet } from "../hooks/useWallet";
interface IEmailLoginButton {
  setIsOpen: (val: boolean) => void;
  setDeviceKey: (val: string) => void;
  user: User | null;
  setUser: (val: User | null) => void;
}
const EmailLoginButton: React.FC<IEmailLoginButton> = ({
  setIsOpen,
  setUser,
  setDeviceKey,
}) => {
  const supabase = useContext(SupabaseContext);
  const { address } = useAccount();
  const { walletClient, setLocalAccount, isSignedIn, setIsSignedIn } =
    useWallet();
  // const { data: walletClient } = useWalletClient();

  console.log("🚀 ~ file: Navbar.tsx:27 ~ walletClient:", walletClient!);
  console.log("🚀 ~ file: Navbar.tsx:26 ~ address:", address);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      console.log("user nav", user);

      if (user) {
        console.log("navb", localStorage.getItem("deviceprivatekey"));

        const exampleData = decryptWithDeviceKey(
          localStorage.getItem("deviceprivatekey")!,
          user!.user_metadata.device_encrypted_private_key
        );
        setDeviceKey(localStorage.getItem("deviceprivatekey")!);
        console.log(
          "🚀 ~ file: LoginWithEmail.tsx:30 ~ login ~ exampleData:",
          exampleData
        );
        setLocalAccount(exampleData);
        setUser(user!);
        setIsSignedIn(true);
      } else {
        // alert("Error Accessing User");
      }
    });
  }, []);

  const logout = async () => {
    const data = await supabase.auth.signOut();
    console.log("🚀 ~ file: Navbar.tsx:37 ~ logout ~ data:", data);
    setUser(null);
    setIsSignedIn(false);
  };

  return (
    <>
      {isSignedIn ? (
        <button
          className="px-4 hover:scale-105 transition duration-200 text-lg rounded-xl font-semibold tracking-tighter bg-[#0e76fd] text-white py-1.5"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <button
          className="px-4 hover:scale-105 transition duration-200 text-lg rounded-xl font-semibold tracking-tighter bg-[#0e76fd] text-white py-1.5"
          onClick={() => setIsOpen(true)}
        >
          Login with Email
        </button>
      )}
    </>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [deviceKey, setDeviceKey] = useState("");

  return (
    <nav className="border-gray-200 border-b-2 mb-4">
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
          <div className="flex gap-2 ml-auto">
            <ConnectButton />

            <EmailLoginButton
              setIsOpen={setIsOpen}
              // isSignedIn={isSignedIn}
              // setIsSignedIn={setIsSignedIn}
              setDeviceKey={setDeviceKey}
              user={user}
              setUser={setUser}
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <LoginWithEmail
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          // setIsSignedIn={setIsSignedIn}
          user={user}
          setUser={setUser}
        />
      )}
    </nav>
  );
};

export default Navbar;
