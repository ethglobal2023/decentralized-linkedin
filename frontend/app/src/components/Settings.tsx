import { useNavigate } from "react-router-dom"
import {IoMdArrowBack} from "react-icons/io"

const Settings = () => {
    const navigate=useNavigate()
    return (
        <div>
            <div className="flex text-[#73b6ff] text-[18px] mt-5 ml-5 font-semibold cursor-pointer"
       onClick={()=>{
        navigate("/")
       }}>
        <IoMdArrowBack className="mt-1"/>
        <p>Back</p>
       </div>
            <h1>Settings</h1>
        </div>
    )
}