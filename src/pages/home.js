import React from "react";
import { useNavigate } from "react-router-dom";
import paths from "../paths";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.elements.link.value;
    if (input) {
      // if (
      //   input.endsWith(".mp3") ||
      //   input.endsWith(".aac") ||
      //   input.endsWith(".ogg") ||
      //   input.endsWith(".wav") ||
      //   input.endsWith(".flac")
      // ) {
      //   navigate(`${paths.audioPage}?source=${input}`);
      // } else {
      //   // navigate(`${paths.videoPage}?source=${input}`);
      //   navigate(`${paths.audioPage}?source=${input}`);
      // }

      if (input.endsWith(".m3u8")) {
        navigate(`${paths.videoPage}?source=${input}`);
      } else {
        navigate(`${paths.audioPage}?source=${input}`);
      }
    }
  };

  return (
    <div className="relative  px-6 pt-14 lg:px-8">
      <div className="lg:mx-40 md:mx-30 sm:mx-20  lg:flex lg:items-center lg:justify-center md:gap-x-3">
        <div>
          <img
            alt=""
            src="https://c4.wallpaperflare.com/wallpaper/114/207/695/video-game-fortnite-marshmello-music-hd-wallpaper-preview.jpg"
            className="rounded-md"
          />
        </div>
        <div className="mx-auto max-w-2xl py-16 lg:py-56">
          <div>
            <h1 className="text-left text-3xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
              Enter URL here and You can watch the video and Listen the Audio.
            </h1>

            <div className="mt-10 w-100 ">
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center gap-x-6 xs:block"
              >
                <input
                  id="link"
                  name="link"
                  type="text"
                  placeholder="https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8"
                  className="block w-10/12  py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400  sm:text-sm/6 border-black border rounded-md"
                />
                <button
                  type="submit"
                  href="#"
                  className={`
                rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  Play
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
