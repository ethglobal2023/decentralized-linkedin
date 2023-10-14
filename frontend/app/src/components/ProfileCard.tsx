<<<<<<< HEAD:frontend-demo/app/src/components/ProfileCard.tsx
import React, { useState, useMemo } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import FileUploadModal from "./FileUpload";
import "./Profilecard.css";
import SideBar from "./SideBar";

export default function ProfileCard() {
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
=======
import React, { useContext, useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import FileUploadModal from "./FileUpload";
import "./ProfileCard.css";
import SideBar from "./SideBar";
import { SupabaseContext } from "../contexts/SupabaseContext";
import { useParams } from "react-router-dom";
import { Resume } from "../types";
import { ipfsDownload } from "../ipfs";

export default function ProfileCard() {
  const [allStatuses, setAllStatus] = useState([]);
>>>>>>> main:frontend/app/src/components/ProfileCard.tsx
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event: any) => {
    setCurrentImage(event.target.files[0]);
  };
<<<<<<< HEAD:frontend-demo/app/src/components/ProfileCard.tsx
  console.log(currentProfile);
=======

  //@Sakshi, this is the logic for fetching the resume from IPFS
  const supabase = useContext(SupabaseContext);
  const { address: profileAddress } = useParams();
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
          "0x9cbC225B9d08502d231a6d8c8FF0Cc66aDcc2A4F".toLowerCase(),
        ) //TODO Replace this with pathparam
        .single();
      console.log("Found log for address: ", data);
      if (!data) {
        setError("No resume cid found. Have you uploaded your resume?");
        return;
      }
      try {
        console.log("Fetching resume from IPFS");
        const resume = await ipfsDownload(data.cid)
        setFetchedProfile(resume);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  console.log("Profile: ", fetchedProfile);

>>>>>>> main:frontend/app/src/components/ProfileCard.tsx
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
<<<<<<< HEAD:frontend-demo/app/src/components/ProfileCard.tsx
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
      }
  ];
  return (
    <><SideBar/>
=======
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
    <div className=" flex">
      <SideBar />
>>>>>>> main:frontend/app/src/components/ProfileCard.tsx
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className="profile-card">
        <div className="edit-btn">
          <HiOutlinePencil className="edit-icon" />
        </div>

        <div className="profile-info">
          <div>
            <img
              className="profile-image"
              onClick={() => setModalOpen(true)}
              src="https://avatars.githubusercontent.com/u/65860201?s=96&v=4"
              alt="profile-image"
            />
            <h3 className="userName">Sakshi Shah</h3>
            <p className="heading">Frontend Developer</p>

            <p className="location">Jamnagar,Gujarat,India</p>

            <a
              className="website"
              target="_blank"
<<<<<<< HEAD:frontend-demo/app/src/components/ProfileCard.tsx
              href="https://github.com/SakshiShah29">
=======
              href="https://github.com/SakshiShah29"
            >
>>>>>>> main:frontend/app/src/components/ProfileCard.tsx
              Website link
            </a>
          </div>

          <div className="right-info">
            <p className="college">Charusat University</p>
            <p className="company">Techie Amigos</p>
          </div>
        </div>
        <p className="about-me">Frontend and Blockchain Developer</p>

        <p className="skills">
          <span className="skill-label">Skills</span>:&nbsp;
          Reactjs,Tailwind,Solidity
        </p>
      </div>

      <div className="profile-card">
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
        <h1 className="heading-2">Education</h1>
        <ul>
          {education.map((item, index) => (
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
                <strong>{item.university}</strong>
                <br />
                <h3>{item.stream}</h3>
                <p>{item.timeline}</p>
                <br />
              </div>
            </li>
          ))}
        </ul>
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
<<<<<<< HEAD:frontend-demo/app/src/components/ProfileCard.tsx
    </>
=======
    </div>
>>>>>>> main:frontend/app/src/components/ProfileCard.tsx
  );
}