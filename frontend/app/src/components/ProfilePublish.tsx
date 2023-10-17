import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import {IoMdArrowBack} from "react-icons/io"
import { BACKEND_URL } from "./admin/EASConfigContext";
import { MessageWithViemSignature } from "./admin/types";
import { useWallet } from "../hooks/useWallet";
import { useWalletClient } from "wagmi";
import { DatePicker } from "antd";
import "./App.css"
import { useNavigate } from "react-router-dom";
type PublishResumeMessage = {
  account: string;
  resume: string;
};
type OrganizationData = {
  organizationName: string;
  titleAtWork: string;
  relationshipTimestamp: {
    startDate: Date;
    endDate: Date;
  };
  organizationWebsite: string;
  type: "education" | "work" | "volunteer";
};
type FormInputs = {
  firstName: string;
  lastName: string;
  language: string;
  organizations: OrganizationData[];
  description: string;
  preferredName: string;
  preferredTitle: string;
  skillKeywords: string;
  preferredLocation: string;
};



export function ProfilePublish() {
  const [payload, setPayload] = useState("");
  const [cid, setCid] = useState(null);
  const [response, setResponse] = useState({});
  const [error, setError] = useState(null);
  const { address } = useWallet();
  const { data: walletClient } = useWalletClient();
  const navigate=useNavigate()
console.log(address)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: "organizations",
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data, event) => {
    event?.preventDefault();

    try {
      if (!walletClient) throw new Error("Wallet client not initialized");
      if (!address) throw new Error("Wallet address not initialized");
      const formData = {
        firstName: data.firstName,
        lastName: data.lastName,
        language: data.language,
        organization: data.organizations,
        description: data.description,
        preferredName: data.preferredName,
        preferredTitle: data.preferredTitle,
        skillKeywords: data.skillKeywords,
        preferredLocation: data.preferredLocation,
      };
      console.log(JSON.stringify(formData));
      const message: PublishResumeMessage = {
        account: address?.toLowerCase(),
        resume: JSON.stringify(formData),
      };

      const signature = await walletClient.signMessage({
        account: address,
        message: JSON.stringify(message),
      });

      const requestBody: MessageWithViemSignature<PublishResumeMessage> = {
        message,
        signature,
      };

      const res2 = await fetch(`${BACKEND_URL}/profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: JSON.stringify(requestBody),
      }).then((res) => res.json());

      setResponse(res2);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (<>      <div className="flex bg-white text-[#73b6ff] text-[18px] pt-5 pl-5 font-semibold cursor-pointer"
  onClick={()=>{
   navigate(-1)
  }}>
   <IoMdArrowBack className="mt-1"/>
   <p>Back</p>
  </div>
    <div className="flex min-h-screen h-fit  w-full bg-white justify-center align-middle">
                  <div className="absolute z-[0] w-[40%] h-[35%] top-0 right-0 pink__gradient" />
            <div className="absolute z-[0] w-[40%] h-[50%] rounded-full right-0 white__gradient bottom-40" />
            <div className="absolute z-[0] w-[50%] h-[50%] left-0 bottom-40 blue__gradient" />
      
      <form onSubmit={handleSubmit(onSubmit)}  className="  text-gray-800 font-montserrat h-fit mt-12 w-[600px] lg:p-10 p-6  bg-white bg-opacity-5 shadow-md  backdrop-blur rounded-xl border border-gray-400 border-opacity-18 ">
        <div className="flex gap-12"><div className=" flex flex-col w-[200px]"><label className="block mb-2 text-md font-medium text-gray-800"> 
          First Name:</label>
          <input
            type="text"
            {...register("firstName", { required: true })}
           
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="John" required
          />
       </div>
        <br />
        <div className=" flex flex-col w-[200px]">
        <label className="block mb-2 text-md font-medium text-gray-800">
          Last Name:  </label>
          <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Mane" required
            type="text"
            {...register("lastName", { required: true })}
          /></div></div>
      
        <br />
      <div className="flex gap-12">
         <div className="flex flex-col w-[200px]"> <label
            htmlFor="languages"
            className="block mb-2 text-md font-medium text-gray-800"
          >
            Select a Language
          </label>
          <select
            {...register("language", { required: true })}
            id="languages"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option selected>Choose a Language</option>
            <option value="English">Englishs</option>
            <option value="Hindi">Hindi</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select></div>

  <div className="flex flex-col w-[200px]">
        <label className="block mb-2 text-md font-medium text-gray-800">
          Description:   </label>
          <textarea
            {...register("description", { required: true })}
            className="bg-gray-50 border h-fit border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Your bio" required
          />
     
        </div>
  </div>
        {fields.map((organization, index) => (
          <div key={organization.id}>
            <label className="block mb-2 text-md font-medium text-gray-800">
              Organization Name:
              <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Mane" required
           
                type="text"
                {...register(`organizations.${index}.organizationName`, {
                  required: true,
                })}
              />
            </label>
            <label className="block mb-2 text-md font-medium text-gray-800">
              Title:
              <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Mane" required
           
                type="text"
                {...register(`organizations.${index}.titleAtWork`, {
                  required: true,
                })}
              />
            </label>
            <label className="block mb-2 text-md font-medium text-gray-800">TimeLine</label>

            <div date-rangepicker className="flex items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                
                  {...register(
                    `organizations.${index}.relationshipTimestamp.startDate`,
                    {
                      required: true,
                    }
                  )}
                  name="start"
                  type="text"
                  date-rangepicker="true"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 "
                  placeholder="Select date start"
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  {...register(
                    `organizations.${index}.relationshipTimestamp.endDate`,
                    {
                      required: true,
                    }
                  )}
                  name="end"
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                  placeholder="Select date end"
                />
              </div>
            </div>
            <label className="block mb-2 text-md font-medium text-gray-800 mt-6">Type</label>
            <select
              {...register("language", { required: true })}
              id="languages"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option selected>Choose a Type</option>
              <option value="Education">Education</option>
              <option value="Experience">Experience</option>
              <option value="Volunteer">Volunteer</option>
            </select>
           <div className="w-full flex justify-center mt-6"> <button type="button" onClick={() => remove(index)} className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Remove Organization
            </button></div>
          </div>
        ))}
       <div className="w-full flex justify-center mt-6"> <button
        className="text-white bg-gradient-to-r  from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
          onClick={() =>
            append({
              organizationName: "",
              titleAtWork: "",
              relationshipTimestamp: {
                startDate: new Date(),
                endDate: new Date(),
              },
              organizationWebsite: "",
              type: "education",
            })
          }
        >
          Add Organization
        </button> </div>
        <br />
       
        
        <div className="flex gap-12"><div><label className="block mb-2 text-md font-medium text-gray-800">
          Preferred Name:
          <input
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
            type="text"
            {...register("preferredName", { required: true })}
            placeholder="von Neumann"
          />
        </label></div>
        <br />
        <div><label className="block mb-2 text-md font-medium text-gray-800">
          Preferred Title:
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
            {...register("preferredTitle", { required: true })}
            placeholder="Lecturer"
          />
        </label></div>
        <br />
        </div>
       <div className="flex gap-12"><div><label className="block mb-2 text-md font-medium text-gray-800">
          Skill Keywords:
          <input
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
            type="text"
            {...register("skillKeywords", { required: true })}
            placeholder="set theory, mathematics"
          />
        </label></div>
        <br />
<div>
        <label className="block mb-2 text-md font-medium text-gray-800">
          Preferred Location:
          <input
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
            type="text"
            {...register("preferredLocation", { required: true })}
            placeholder="Zurich and London"
          />
        </label></div>
        <br /></div>
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 " type="submit">
          Upload to IPFS
        </button>
      </form>
      {cid && <div>CID: {cid}</div>}
      {error && <div>Error: {error}</div>}
      {response && JSON.stringify(response)}
    </div></>
  );
}

function append(arg0: {
  organizationName: string;
  titleAtWork: string;
  relationshipTimestamp: string;
  organizationWebsite: string;
  type: string;
}) {
  throw new Error("Function not implemented.");
}
