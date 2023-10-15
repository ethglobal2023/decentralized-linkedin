import { useState } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { BACKEND_URL } from "./admin/EASConfigContext";
import { MessageWithViemSignature } from "./admin/types";
import { useWallet } from "../hooks/useWallet";
import { useWalletClient } from "wagmi";
import { DatePicker } from "antd";

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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-opacity-25 bg-black backdrop-blur-8.5 border border-opacity-20 rounded-lg shadow-lg p-8">
        <label>
          First Name:
          <input
            type="text"
            {...register("firstName", { required: true })}
            defaultValue="John"
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            {...register("lastName", { required: true })}
            defaultValue="von Neumann"
          />
        </label>
        <br />
        <label>
          Languages:
          <label
            htmlFor="languages"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select an option
          </label>
          <select
            {...register("language", { required: true })}
            id="languages"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose a Language</option>
            <option value="English">Englishs</option>
            <option value="Hindi">Hindi</option>
            <option value="French">French</option>
            <option value="German">German</option>
          </select>
        </label>
        <br />
        {fields.map((organization, index) => (
          <div key={organization.id}>
            <label>
              Organization Name:
              <input
                type="text"
                {...register(`organizations.${index}.organizationName`, {
                  required: true,
                })}
              />
            </label>
            <label>
              Title:
              <input
                type="text"
                {...register(`organizations.${index}.titleAtWork`, {
                  required: true,
                })}
              />
            </label>
            <label>TimeLine</label>

            <div date-rangepicker className="flex items-center">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date start"
                />
              </div>
              <span className="mx-4 text-gray-500">to</span>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date end"
                />
              </div>
            </div>
            <label>Type</label>
            <select
              {...register("language", { required: true })}
              id="languages"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Choose a Type</option>
              <option value="Education">Education</option>
              <option value="Experience">Experience</option>
              <option value="Volunteer">Volunteer</option>
            </select>
            <button type="button" onClick={() => remove(index)}>
              Remove Organization
            </button>
          </div>
        ))}
        <button
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
        </button>
        <br />
        <label>
          Description:
          <textarea
            {...register("description", { required: true })}
            defaultValue="Hungarian-American mathematician, physicist, computer scientist, engineer and polymath."
          />
        </label>
        <br />
        <label>
          Preferred Name:
          <input
            type="text"
            {...register("preferredName", { required: true })}
            defaultValue="von Neumann"
          />
        </label>
        <br />
        <label>
          Preferred Title:
          <input
            type="text"
            {...register("preferredTitle", { required: true })}
            defaultValue="Lecturer"
          />
        </label>
        <br />
        <label>
          Skill Keywords:
          <input
            type="text"
            {...register("skillKeywords", { required: true })}
            defaultValue="set theory, mathematics"
          />
        </label>
        <br />

        <label>
          Preferred Location:
          <input
            type="text"
            {...register("preferredLocation", { required: true })}
            defaultValue="Zurich and London"
          />
        </label>
        <br />
        <button className={"bg-blue-300"} type="submit">
          Upload to IPFS
        </button>
      </form>
      {cid && <div>CID: {cid}</div>}
      {error && <div>Error: {error}</div>}
      {response && JSON.stringify(response)}
    </div>
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
