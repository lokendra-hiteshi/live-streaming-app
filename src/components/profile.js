import React from "react";

const ProfileCircle = () => {
  return (
    <div className="flex justify-center items-center h-[300px] max-w-[300px] overflow-hidden">
      <div className="relative flex justify-center items-center w-[300px] h-[300px] m-auto overflow-hidden">
        <div className="absolute w-[240px] h-[240px] rounded-full bg-[#ffebc4] translate-x-[0px] translate-y-[-15px] "></div>

        <div className="absolute  w-[220px] h-[220px] rounded-full bg-[#CBDCDF] translate-x-[35px] translate-y-[12px]"></div>

        <div className="absolute w-[220px] h-[220px] rounded-full bg-[#ffd6e5] translate-x-[-15px] translate-y-[30px]"></div>

        <div className="absolute w-[230px] h-[230px] rounded-full bg-[#FCB13D]  translate-x-[-22px]  translate-y-[0px]"></div>

        <div className="absolute w-[240px] h-[240px] rounded-full bg-[#1F8380] translate-x-[20px] translate-y-[-10px]"></div>

        <div className="absolute  w-[240px] h-[240px] rounded-full bg-[#D6155B] translate-x-[10px] translate-y-[25px]"></div>

        <div className="absolute bg-black w-[240px] h-[240px] rounded-[280px] overflow-hidden shadow-lg translate-x-[3px] translate-y-[0px]">
          <img
            src={
              "https://c8.alamy.com/comp/ED05P3/music-artist-justin-moore-ED05P3.jpg"
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCircle;
