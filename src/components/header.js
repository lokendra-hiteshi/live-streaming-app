import React from "react";

const Header = () => {
  return (
    <header className="absolute top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Live Streaming</span>
            <img
              alt=""
              src="https://img.freepik.com/free-vector/abstract-3d-blue-color-music-notes-vector-illustrationxdxa_460848-11830.jpg"
              className="h-12 w-12 rounded-full"
            />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
