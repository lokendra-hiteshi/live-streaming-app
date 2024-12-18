import React from "react";

const Profile = ({ handlePlayPause, isPlaying }) => {
  return (
    <div className="flex justify-center items-center h-[300px] max-w-[300px] overflow-hidden">
      <div className="relative flex justify-center items-center w-[300px] h-[300px] m-auto overflow-hidden">
        <div className="absolute w-[240px] h-[240px] rounded-full bg-[#ffebc4] translate-x-[0px] translate-y-[-15px] "></div>
        <div className="absolute w-[220px] h-[220px] rounded-full bg-[#CBDCDF] translate-x-[35px] translate-y-[12px]"></div>
        <div className="absolute w-[220px] h-[220px] rounded-full bg-[#ffd6e5] translate-x-[-15px] translate-y-[30px]"></div>
        <div className="absolute w-[240px] h-[240px] rounded-full bg-[#1F8380] translate-x-[20px] translate-y-[-10px]"></div>
        <div className="absolute w-[230px] h-[230px] rounded-full bg-[#FCB13D]  translate-x-[-22px]  translate-y-[0px]"></div>
        <div className="absolute w-[240px] h-[240px] rounded-full bg-[#D6155B] translate-x-[10px] translate-y-[25px]"></div>

        <div
          className="absolute bg-black w-[240px] h-[240px] rounded-[280px] overflow-hidden shadow-lg translate-x-[3px] translate-y-[0px] cursor-pointer"
          onClick={handlePlayPause}
        >
          <img
            src="https://c8.alamy.com/comp/ED05P3/music-artist-justin-moore-ED05P3.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 rounded-full">
          <button
            onClick={handlePlayPause}
            className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h3v12H6zM15 6h3v12h-3z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25l13.5 6.75-13.5 6.75V5.25z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
