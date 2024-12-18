import React from "react";
import { useAuth } from "../context/authContext";
import Tooltip from "./tooltip";

const Header = () => {
  const { logout } = useAuth();
  return (
    <header className="absolute top-0 z-50 w-full">
      <nav className="flex justify-between items-center w-100 p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/home" className="-m-1.5 p-1.5">
            <span className="sr-only">Live Streaming</span>
            <img
              alt=""
              src="https://img.freepik.com/free-vector/abstract-3d-blue-color-music-notes-vector-illustrationxdxa_460848-11830.jpg"
              className="h-12 w-12 rounded-full"
            />
          </a>
        </div>
        <Tooltip title="LogOut">
          <div className="w-10 h-10 cursor-pointer" onClick={logout}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
          </div>
        </Tooltip>
      </nav>
    </header>
  );
};

export default Header;
