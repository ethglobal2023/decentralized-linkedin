import React, { useContext, useEffect, useState } from "react";
import FileUploadModal from "./FileUpload";
import "./ProfileCard.css";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { useNavigate, useParams } from "react-router-dom";
import { Resume } from "../types";
import { ipfsDownload } from "../ipfs";
import { IoMdArrowBack } from "react-icons/io";
import "./App.css";

export default function ProfileCard() {
  const { address: profileAddress } = useParams();
  console.log(profileAddress);
  const [allStatuses, setAllStatus] = useState([]);
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event: any) => {
    setCurrentImage(event.target.files[0]);
  };

  //@Sakshi, this is the logic for fetching the resume from IPFS
  const supabase = useContext(SupabaseContext);
  const [error, setError] = useState("");
  const [fetchedProfile, setFetchedProfile] = useState<Resume>();
  useEffect(() => {
    const fetchProfile = async () => {
      console.log(
        "Fetching profile for address: ",
        "0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F",
      );
      const { data } = await supabase
        .from("resumes")
        .select("cid")
        .eq(
          "address",
          "0x6B72Dab4e5EbC5f18e298E9Fd1aa4Ff8cf636605".toLowerCase(),
        ) //TODO Replace this with pathparam
        .single();
      console.log("Found log for address: ", data);
      if (!data) {
        setError("No resume cid found. Have you uploaded your resume?");
        return;
      }
      try {
        console.log("Fetching resume from IPFS");
        const resume = await ipfsDownload(data.cid);
        setFetchedProfile(resume);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  console.log("Profile: ", fetchedProfile);

  const educationOrganization = fetchedProfile?.organization.filter(
    (organization) => organization.type === "education",
  );
  console.log(educationOrganization);
  const workOrganization = fetchedProfile?.organization.filter(
    (organization) => organization.type === "work",
  );
  console.log(workOrganization);
  const uploadImage = () => {};
  const experience = [
    {
      image:
        "https://imgs.search.brave.com/Wjl1BUohzKPCcm1Q9wCnF15khDtYC_ayphFe80gSB2E/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMw/ODQxNjU3NC92ZWN0/b3IvaC1sZXR0ZXIt/c2hhcGUtbG9nby5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/OXJ4TmFlaFVwaDZN/c0kxOVBVbnpMZkxv/bkt2aEdQcEFCQUdh/YmFZczYxMD0",
      Job: "Building",
      Company: "Stealth Mode",
      Timeline: "Jan 2023-Present",
      Place: "New York,United States",
    },
    {
      image:
        "https://imgs.search.brave.com/S1ay_3RnMu6qAJk7ZFR2neOJbTbxC1lyzNZT5K_vzVg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/MDQzMjU0Ni92ZWN0/b3IvaGV4YWdvbi1s/b2dvLXNpZ24uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPUVk/VWMtNllCS255RHp1/RFItT1dBc2h1VWlz/dFFpc0tFSEI1Vmsx/RlAyRmc9",
      Job: "Building",
      Company: "Stealth Mode",
      Timeline: "Jan 2023-Present",
      Place: "New York,United States",
    },
    {
      image:
        "https://imgs.search.brave.com/WufMiNafL0oT-cMxHQNiEu3wNTkuHma8wY3sU1BFZN0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAxLzEwLzM4LzI5/LzM2MF9GXzExMDM4/Mjk5Ml9FdnlwaVFp/VFNudndSSkVkREc1/ZTNyQlA2S08xb1ho/dC5qcGc",
      Job: "Building",
      Company: "Stealth Mode",
      Timeline: "Jan 2023-Present",
      Place: "New York,United States",
    },
    {
      image:
        "https://imgs.search.brave.com/dNkTF3wpeuSAsSFXXxbnV7l6CRrpLx3EwPhJF8e3sNs/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTMz/OTI5NDUzOS92ZWN0/b3IvZHluYW1pYy1z/ZWdtZW50cy1vZi1j/b2xvcmVkLWNpcmNs/ZS1icmFuZC1zeW1i/b2wuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPWpEaXJxZ3FJ/RVNYbGloc0tPY3c4/V3FEMVpqeDRLeGto/RlVoV0dJUnFielk9",
      Job: "Building",
      Company: "Stealth Mode",
      Timeline: "Jan 2023-Present",
      Place: "New York,United States",
    },
  ];
  const education = [
    {
      image:
        "https://imgs.search.brave.com/m76M_P2x6d-LP9crPYcv9_x3EgIiE7fHS3LjbpOGEl8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzAwLzk5Lzk5/LzM2MF9GXzIwMDk5/OTk3OF9pWVJISUVr/VWczWHJMY01RVFp6/R20wYTg4bWYzelQy/WS5qcGc",
      university: "Maryland University",
      stream: "Bachelor of Science (BS),Computer Science",
      timeline: "2015-2023",
    },
    {
      image:
        "https://imgs.search.brave.com/m76M_P2x6d-LP9crPYcv9_x3EgIiE7fHS3LjbpOGEl8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzAwLzk5Lzk5/LzM2MF9GXzIwMDk5/OTk3OF9pWVJISUVr/VWczWHJMY01RVFp6/R20wYTg4bWYzelQy/WS5qcGc",
      university: "Maryland University",
      stream: "Bachelor of Science (BS),Computer Science",
      timeline: "2015-2023",
    },
    {
      image:
        "https://imgs.search.brave.com/m76M_P2x6d-LP9crPYcv9_x3EgIiE7fHS3LjbpOGEl8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzAwLzk5Lzk5/LzM2MF9GXzIwMDk5/OTk3OF9pWVJISUVr/VWczWHJMY01RVFp6/R20wYTg4bWYzelQy/WS5qcGc",
      university: "Maryland University",
      stream: "Bachelor of Science (BS),Computer Science",
      timeline: "2015-2023",
    },
  ];
  return (
    <div className="bg-white w-full">
      <div
        className="flex text-[#73b6ff] text-[18px] mt-5 ml-5 font-semibold cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        <IoMdArrowBack className="mt-1" />
        <p>Back</p>
      </div>
      <div className=" flex gap-6">
        <FileUploadModal
          getImage={getImage}
          uploadImage={uploadImage}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          currentImage={currentImage}
          progress={progress}
        />
        <div className="ml-10">
          <div className="  text-gray-800 font-montserrat h-fit mt-12 w-[700px] lg:p-10 p-6  card rounded-xl ">
            <div className="profile-info">
              <div>
                <div className=" flex">
                  {" "}
                  <div>
                    <img
                      className="rounded-full"
                      onClick={() => setModalOpen(true)}
                      src="https://avatars.githubusercontent.com/u/65860201?s=96&v=4"
                      alt="profile-image"
                    />
                  </div>
                  <div className="w-full flex justify-end mt-6">
                    {" "}
                    <button
                      className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                      type="button"
                      onClick={() => {
                        navigate("/profileEdit");
                      }}
                    >
                      Edit profile
                    </button>
                  </div>
                </div>
                <h3 className="userName">
                  {fetchedProfile?.firstName} {fetchedProfile?.lastName}
                </h3>
                <p className="heading">{fetchedProfile?.description}</p>

                <p className="location">{fetchedProfile?.preferredLocation}</p>

                <a
                  className="website"
                  target="_blank"
                  href="https://github.com/SakshiShah29"
                >
                  Website link
                </a>
              </div>

              <div className="right-info">
                <p className="college">University</p>
                <p className="company">Techie Amigos</p>
              </div>
            </div>

            <p className="skills">
              <span className="skill-label">Skills</span>:&nbsp;
              {fetchedProfile?.description}
            </p>
          </div>

          <div className="text-gray-800 font-montserrat h-fit mt-12 w-[700px] lg:p-10 p-6  card rounded-xl">
            <a href="#" className="w-full text-center">
              <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                {" "}
                Unknown Attestation
              </h5>
            </a>
            <div className=" flex gap-2 mb-[2px]">
              <p className="mb-3 font-normal text-gray-500 ">Data: </p>
              <div>
                {" "}
                <p> metIrl:true</p>
                <p>property 2:value</p>
                <p>property 3: 0xABC...0055</p>
              </div>
            </div>
            <div className=" flex gap-2 mb-[2px]">
              <p className="mb-3 font-normal text-gray-500 ">Attester: </p>
              <div>
                {" "}
                <p> metIrl:true</p>
              </div>
            </div>
            <div className=" flex gap-2 mb-[2px]">
              <p className="mb-3 font-normal text-gray-500 ">Issued: </p>
              <div>
                {" "}
                <p> Jan 1st,2020</p>
              </div>
            </div>
            <div className=" flex gap-2 mb-[2px]">
              <p className="mb-3 font-normal text-gray-500 ">Expires: </p>
              <div>
                {" "}
                <p> Never</p>
              </div>
            </div>
            <div className="w-full flex justify-center">
              {" "}
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                type="submit"
              >
                Verify
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-800 font-montserrat h-fit mt-12 w-[700px] lg:p-10 p-6  card rounded-xl">
          {workOrganization && workOrganization.length > 0 && (
            <div>
              <h1 className="heading-2">Experience</h1>
              <ul>
                {experience.map((item, index) => (
                  <li key={index} className="experience-card">
                    <div>
                      <br />
                      <img
                        className="experience-image"
                        src={item.image}
                        alt="company-logo"
                      />
                    </div>
                    <div>
                      <br />
                      <strong>{item.Job}</strong>
                      <br />
                      <h3>{item.Company}</h3>
                      <h4>{item.Timeline}</h4>
                      <p>{item.Place}</p>
                      <br />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {educationOrganization && educationOrganization.length > 0 && (
            <div>
              <h1 className="heading-2">Education</h1>
              <ul>
                {educationOrganization.map((item, index) => (
                  <li key={index} className="experience-card">
                    <div>
                      <br />
                      <img
                        className="experience-image"
                        src="https://imgs.search.brave.com/m76M_P2x6d-LP9crPYcv9_x3EgIiE7fHS3LjbpOGEl8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzAwLzk5Lzk5/LzM2MF9GXzIwMDk5/OTk3OF9pWVJISUVr/VWczWHJMY01RVFp6/R20wYTg4bWYzelQy/WS5qcGc"
                        alt="company-logo"
                      />
                    </div>
                    <div>
                      <br />
                      <strong>{item.organizationName}</strong>
                      <br />
                      <h3>{item.titleAtWork}</h3>
                      <p>
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                        }).format(
                          new Date(item.relationshipTimestamp.startDate),
                        )}{" "}
                        -{" "}
                        {new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                        }).format(new Date(item.relationshipTimestamp.endDate))}
                      </p>
                      <br />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* <div className="post-status-main">
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} />
            </div>
          );
        })}
      </div> */}
      </div>
    </div>
  );
}
