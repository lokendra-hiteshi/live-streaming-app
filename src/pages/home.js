import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import paths from "../paths";
import { useMedia } from "../context/mediaContext";

const Home = () => {
  const navigate = useNavigate();
  const { setMediaSource } = useMedia();
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const input = e.target.elements.link.value;
    setMediaSource(input);

    if (input) {
      if (input.endsWith(".m3u8")) {
        try {
          const response = await fetch(input);
          const text = await response.text();

          if (text.includes("#EXT-X-STREAM-INF") || text.includes("#EXTINF")) {
            const hasAudioCodec =
              text.includes("CODECS=mp4a") || text.includes("CODECS=opus");
            const hasVideoCodec =
              text.includes("CODECS=avc1") || text.includes("CODECS=hev1");

            if (hasAudioCodec && hasVideoCodec) {
              navigate(`${paths.videoPage}`);
            } else if (hasAudioCodec) {
              navigate(`${paths.audioPage}`);
            } else if (hasVideoCodec) {
              navigate(`${paths.videoPage}`);
            } else {
              navigate(`${paths.videoPage}`);
            }
          }
        } catch (err) {
          console.error("Error fetching .m3u8 file:", err);
        }
      } else if (input.endsWith(".mp4")) {
        navigate(`${paths.videoPage}`);
      } else {
        navigate(`${paths.audioPage}`);
      }
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer?.files[0] || e.target.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setMediaSource(fileUrl);

      if (file.name.endsWith(".m3u8") || file.name.endsWith(".mp4")) {
        navigate(`${paths.videoPage}`);
      } else {
        navigate(`${paths.audioPage}`);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  useEffect(() => {
    setMediaSource("");
    localStorage.removeItem("mediaSource");
  }, [setMediaSource]);

  return (
    <div className="relative px-6 pt-14 lg:px-8">
      <div className="lg:mx-40 md:mx-30 sm:mx-20 lg:flex lg:items-center lg:justify-center md:gap-x-3">
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
              Enter a URL to watch the video and listen to the audio.
            </h1>
            <div className="mt-10 w-100">
              <form
                onSubmit={handleSubmit}
                className="flex items-center justify-center gap-x-6 xs:block"
              >
                <input
                  id="link"
                  name="link"
                  type="text"
                  placeholder="https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8"
                  className="block w-10/12 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 sm:text-sm/6 border-black border rounded-md"
                />
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Play
                </button>
              </form>

              {/* File Drop Box */}
              <div
                className={`mt-6 border-2 ${
                  dragActive
                    ? "border-indigo-600 bg-indigo-100"
                    : "border-gray-300"
                } border-dashed rounded-md p-4 text-center`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleFileDrop}
              >
                <p className="text-gray-500">
                  Drag and drop your file here, or{" "}
                  <label
                    htmlFor="fileUpload"
                    className="text-indigo-600 cursor-pointer underline"
                  >
                    browse
                  </label>
                </p>
                <input
                  id="fileUpload"
                  type="file"
                  accept=".m3u8,.mp4,.mp3"
                  className="hidden"
                  onChange={handleFileDrop}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
