import React, { useContext, useEffect, useRef, useState } from "react";
// import * as supabase from '@supabase/supabase-js'
import { SupabaseContext } from "../contexts/SupabaseContext";
import {
  startup,
  createNewWallet,
  decryptWithDeviceKey,
} from "../library/embedded_wallet";
import { User } from "@supabase/supabase-js";
import { AiOutlineClose } from "react-icons/ai";
import { useWallet } from "../hooks/useWallet";

interface ILoginWithEmail {
  setIsOpen: (val: boolean) => void;
  isOpen: boolean;
  user: User | null;
  setUser: (val: User | null) => void;
}

const LoginWithEmail: React.FC<ILoginWithEmail> = ({
  setIsOpen,
  isOpen,
  user,
  setUser,
}) => {
  const supabase = useContext(SupabaseContext);
  const formRef = useRef<HTMLDivElement | null>(null);
  const { setIsSignedIn } = useWallet();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    pin: "",
  });

  const login = async () => {
    if (!supabase) {
      startup();
    }
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    const exampleData = decryptWithDeviceKey(
      localStorage.getItem("deviceprivatekey")!,
      user!.user_metadata.device_encrypted_private_key
    );
    setIsSignedIn(true);
    setUser(user);
  };

  const signUp = async () => {
    const signupdata = createNewWallet(formData.pin);
    console.log(
      "🚀 ~ file: LoginWithEmail.tsx:30 ~ signUp ~ signupdata:",
      signupdata
    );
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: signupdata,
      },
    });
    console.log("🚀 ~ file: LoginWithEmail.tsx:51 ~ signUp ~ data:", data);
    setIsOpen(false);
    setIsSignedIn(true);
    setUser(data.user);
  };

  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data: { user } }) => {
  //     if (user) {
  //       console.log("user", user);
  //       const exampleData = decryptWithDeviceKey(
  //         user!.user_metadata.device_encrypted_private_key,
  //         localStorage.getItem("deviceprivatekey")!
  //       );
  //       setDeviceKey(localStorage.getItem("deviceprivatekey") ?? "");
  //       console.log(
  //         "🚀 ~ file: LoginWithEmail.tsx:30 ~ login ~ exampleData:",
  //         exampleData
  //       );
  //       setIsSignedIn(true);

  //       setUser(user!);
  //     } else {
  //       // alert("Error Accessing User");
  //     }
  //   });
  // }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clickedElement = e.target as HTMLElement;
    const clickedElementId = clickedElement.id;
    if (clickedElementId === "login") {
      await login();
    } else {
      await signUp();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    function handleEvent(event: MouseEvent) {
      const clickedElement = event.target as HTMLElement;
      const clickedElementId = clickedElement.id;
      console.log(
        "🚀 ~ file: LoginWithEmail.tsx:122 ~ handleEvent ~ clickedElementId:",
        clickedElementId
      );

      if (clickedElementId === "bg") {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleEvent);
    } else {
      document.removeEventListener("mousedown", handleEvent);
    }

    return () => {
      document.removeEventListener("mousedown", handleEvent);
    };
  }, [isOpen, formRef]);

  return (
    <div
      id="bg"
      ref={formRef}
      className="fixed inset-0 flex bg-gray-200 bg-opacity-80 items-center justify-center z-10 divide-y divide-gray-200"
    >
      <form
        id="form"
        className="py-16 relative border-2 bg-gradient-to-r from-gray-700/30 via-gray-900/30 to-black/30 bg-opacity-40 backdrop-blur-3xl  px-20 rounded-lg text-base leading-6 space-y-4  text-gray-700 sm:text-lg sm:leading-7"
      >
        <AiOutlineClose
          className="absolute left-8 top-8 cursor-pointer"
          onClick={closeModal}
        />

        <div className="relative mb-3">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            E-mail
          </label>
          <input
            autoComplete="off"
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:border-gray-600  placeholder:tracking-tight"
            placeholder="vitalik@eth.com"
            required
          />
        </div>
        <div className="relative mb-3">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:border-gray-600  placeholder:tracking-tight  "
            required
          />
        </div>
        <div className="relative ">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Pin
          </label>
          <input
            id="pin"
            name="pin"
            type="password"
            placeholder=""
            value={formData.pin}
            onChange={handleChange}
            className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:border-gray-600  placeholder:tracking-tight  "
            required
          />
        </div>

        <div className="flex gap-4 pt-4 justify-center ">
          <button
            type="submit"
            id="signup"
            onClick={handleSubmit}
            className="bg-[#0e76fd] hover:scale-105 transition duration-200 text-white rounded-md px-4 tracking-tighter text-lg py-1"
          >
            Sign Up
          </button>
          <button
            type="submit"
            id="login"
            onClick={handleSubmit}
            className="bg-[#0e76fd] hover:scale-105 transition duration-200 text-white rounded-md px-4 tracking-tighter text-lg py-1"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginWithEmail;
