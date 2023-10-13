import "./App.css";
import { useEffect } from "react";
import { useClient } from "@xmtp/react-sdk";
import { ContentRouter } from "./ContentRouter";
import { useWallet } from "../hooks/useWallet";
import SideBar from "./SideBar";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";
import { Inbox } from "./Inbox";
import ProfileCard from "./ProfileCard";

const App = () => {
  const { address } = useWallet();
  const { disconnect } = useClient();

  // disconnect XMTP client when the wallet changes
  useEffect(() => {
    void disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
       <Route path="/" element={<ContentRouter/>} />
          <Route path="/profile" element={<ProfileCard/>} />
          <Route path="/inbox" element={<Inbox/>} />
          {/* Add more routes for your components */}
        </Routes>
       </BrowserRouter>
      
    </div>
  );
};

export default App;
