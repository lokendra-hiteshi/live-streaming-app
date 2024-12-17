import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import { useMedia } from "../context/mediaContext";
import { useNavigate } from "react-router-dom";
import paths from "../paths";

const VideoPlayer = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const { mediaSource } = useMedia();
  const navigate = useNavigate();

  const [isHls, setIsHls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [qualityOptions, setQualityOptions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (mediaSource) {
      setIsHls(mediaSource.endsWith(".m3u8"));
    } else navigate(paths.home);
  }, [mediaSource, navigate]);

  useEffect(() => {
    const mediaElement = videoRef.current;

    if (isHls) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(mediaSource);
        hls.attachMedia(mediaElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("hls", hls);
          const qualities = hls.levels.map((level) => level.height);
          console.log(qualities);
          setQualityOptions(["Auto", ...qualities]);
        });

        hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
          if (hls.autoLevelEnabled) {
            setQualityOptions((prev) => [
              `Auto (${hls.levels[data.level].height}p)`,
              ...prev.slice(1),
            ]);
          }
        });

        window.hls = hls;
      } else {
        console.error("HLS not supported on this browser.");
      }
    } else {
      mediaElement.src = mediaSource;
    }

    mediaElement.addEventListener("timeupdate", handleTimeUpdate);
    mediaElement.addEventListener("loadedmetadata", handleLoadedMetadata);
    mediaElement.addEventListener("play", () => setIsPlaying(true));
    mediaElement.addEventListener("pause", () => setIsPlaying(false));

    return () => {
      mediaElement.removeEventListener("timeupdate", handleTimeUpdate);
      mediaElement.removeEventListener("loadedmetadata", handleLoadedMetadata);
      if (window.hls) {
        window.hls.destroy();
        window.hls = null;
      }
    };
  }, [isHls, mediaSource]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    setDuration(video.duration);
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const handleSkipForward = () => {
    const video = videoRef.current;
    video.currentTime = Math.min(video.currentTime + 10, duration);
  };

  const handleSkipBack = () => {
    const video = videoRef.current;
    video.currentTime = Math.max(video.currentTime - 10, 0);
  };

  const handleSpeedChange = (speed) => {
    const video = videoRef.current;
    video.playbackRate = speed;
  };

  const handleQualityChange = (quality) => {
    if (window.hls && quality !== "Auto") {
      window.hls.levels.forEach((level, index) => {
        if (level.height === parseInt(quality)) {
          window.hls.currentLevel = index;
        }
      });
    } else if (window.hls) {
      window.hls.currentLevel = -1;
    }
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    video.currentTime = parseFloat(e.target.value);
    setCurrentTime(video.currentTime);
  };

  return (
    <div className="relative px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-44">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            You Are Streaming Now
          </h1>
        </div>
        <div className=" p-4" ref={containerRef}>
          <video
            ref={videoRef}
            className="w-full h-auto rounded-md shadow-lg"
            controls={false}
            crossOrigin="anonymous"
            playsInline
            poster="https://media.istockphoto.com/id/1005267014/vector/retro-style-condensed-font.jpg?s=1024x1024&w=is&k=20&c=LvYPfz2YzSg1vrd4ECgQlywXGXDYf8VCQ7aq0IyrIMo="
          />
        </div>
        <div className="fixed bottom-0 left-0 right-0">
          <div className="bg-[#ffebc4] h-1 relative">
            <input
              type="range"
              className="w-full h-1 absolute top-0 left-0 cursor-pointer"
              min="0"
              max={duration || 1}
              value={currentTime}
              step="0.01"
              onChange={handleProgressChange}
              style={{
                background: `linear-gradient(to right, #FCB13D ${
                  (currentTime / duration) * 100
                }%, #ffebc4 ${(currentTime / duration) * 100}%)`,
              }}
            />
            <div
              className="bg-yellow-500 h-full"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <div className="bg-black text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <div className="mx-2">
                {isPlaying ? (
                  <img
                    alt=""
                    src="https://cdn.pixabay.com/animation/2024/06/04/16/39/16-39-28-355_512.gif"
                    className="w-12 h-12"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#fff"
                  >
                    <path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z" />
                  </svg>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-yellow-500 font-bold">
                  Walking The Wire
                </span>
                <span className="text-gray-300 text-sm">Jasper Dolphy</span>
              </div>
            </div>
            <div className="flex items-center">
              <button onClick={handleSkipBack} className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white w-6 rounded-full"
                >
                  <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                </svg>
              </button>
              <button onClick={handlePlayPause} className="mr-4">
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

              <button onClick={handleSkipForward} className="mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white w-6 rounded-full"
                >
                  <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                </svg>
              </button>
              <div className="relative mr-5">
                <button
                  onClick={() => setShowSettings((prev) => !prev)}
                  className="bg-gray-700 text-white p-2 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8"
                    viewBox="0 -960 960 960"
                    fill="#fff"
                  >
                    <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
                  </svg>
                </button>
                {showSettings && (
                  <div
                    className="absolute bg-white text-black p-4 mr-10 rounded shadow-lg z-50"
                    style={{
                      bottom: "calc(100% + 8px)",
                    }}
                  >
                    <div className="mb-2">
                      <h4 className="font-semibold mb-1">Quality</h4>
                      {qualityOptions?.map((q, i) => (
                        <button
                          key={i}
                          className="block w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            handleQualityChange(q);
                            setShowSettings(false);
                          }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Speed</h4>
                      {[0.5, 1, 1.25, 1.5, 1.75, 2]?.map((speed) => (
                        <button
                          key={speed}
                          className="block w-full text-left p-2 hover:bg-gray-100"
                          onClick={() => {
                            handleSpeedChange(speed);
                            setShowSettings(false);
                          }}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
