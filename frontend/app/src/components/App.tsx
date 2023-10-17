import "./App.css";
import React, { FC, PropsWithChildren, useCallback, useState } from "react";
import { type CachedConversation } from "@xmtp/react-sdk";
import {
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { Conversations } from "./Conversations";
import { Messages } from "./Messages";
import { NewMessage } from "./NewMessage";
import { useWallet } from "../hooks/useWallet";
import { NoSelectedConversationNotification } from "./NoSelectedConversationNotification";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { IconButton, Tooltip } from "@radix-ui/themes";
import { Menu } from "./Menu";
import { RequireXMTPConnected } from "./RequireXMTPConnected";
import { Search } from "./Search";
import { EasConfigContextProvider } from "./admin/EASConfigContext";
import { AdminHome } from "./admin/AdminHome";
import ProfileCard from "./ProfileCard";
import { ProfilePublish } from "./ProfilePublish";

export const App: React.FC = () => {
  const { disconnect } = useWallet();
  const [selectedConversation, setSelectedConversation] = useState<
    CachedConversation | undefined
  >(undefined);
  const [isNewMessage, setIsNewMessage] = useState(false);

  const handleConversationClick = useCallback((convo: CachedConversation) => {
    setSelectedConversation(convo);
    setIsNewMessage(false);
  }, []);

  const handleStartNewConversation = useCallback(() => {
    setIsNewMessage(true);
  }, []);

  const handleStartNewConversationSuccess = useCallback(
    (convo?: CachedConversation) => {
      setSelectedConversation(convo);
      setIsNewMessage(false);
    },
    [],
  );

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const MenuIcon: FC<PropsWithChildren<{ tooltip: string; link: string }>> = ({
    tooltip,
    link,
    children,
  }) => {
    return (
      <Tooltip
        content={tooltip}
        side={"top"}
        className={"bg-white text-gray-600"}
      >
        <Link to={link} className={"menu-link"}>
          <IconButton>{children}</IconButton>
        </Link>
      </Tooltip>
    );
  };
  return (
    <div className="  w-full h-[100vh] bg-[#f7f7f7] ">
  

      <div className="InboxConversations">
        <BrowserRouter>
          {/*<SideBar />*/}
          <div className="InboxConversations__list overflow-y-hidden border-r-[3px]">
            <Menu />
            <Routes>
              <Route
                path="/"
                element={<>
                  <div className="InboxHeader__actions">
                  <button
                   className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg flex dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                    type="button"
                    onClick={handleStartNewConversation}
                  >
                    <PlusCircleIcon width={24} /> New message
                  </button>
                
                  </div>
                  <Conversations
                    onConversationClick={handleConversationClick}
                    selectedConversation={selectedConversation}
                  />
                  </>
                }
              />
              <Route path="/search" element={<Search/>} />
            </Routes>
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <RequireXMTPConnected>
                  <div className="InboxConversations__messages">
                    {isNewMessage ? (
                      <NewMessage onSuccess={handleStartNewConversationSuccess} />
                    ) : selectedConversation ? (
                      <Messages conversation={selectedConversation} />
                    ) : (
                      <NoSelectedConversationNotification
                        onStartNewConversation={handleStartNewConversation}
                      />
                    )}
                  </div>
                </RequireXMTPConnected>
              }
            />
            <Route
              path="/admin"
              element={
                <EasConfigContextProvider>
                  <AdminHome />
                </EasConfigContextProvider>
              }
            />
            <Route
              path="/profileEdit"
              element={<ProfilePublish/>}
            />
            <Route
              path="/profile/:address"
              element={<ProfileCard />}
            />
            <Route path="/publish" element={<ProfilePublish />} />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
};
