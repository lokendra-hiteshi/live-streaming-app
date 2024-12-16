import React, { useEffect, useState, useRef } from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import Profile from "../components/profile";
import SongDetails from "../components/song-deatils";
import { useMedia } from "../context/mediaContext";
import { useNavigate } from "react-router-dom";
import paths from "../paths";

const AudioPlayer = () => {
  const { mediaSource } = useMedia();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHls, setIsHls] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const hlsRef = useRef(null);
  console.log("mediaSource", mediaSource);

  useEffect(() => {
    if (mediaSource) {
      setIsHls(mediaSource.includes(".m3u8"));
      setIsAudio(mediaSource.match(/\.(mp3|wav|ogg)$/i));
    } else navigate(paths.home);
  }, [mediaSource]);

  useEffect(() => {
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (isHls && videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(mediaSource);
        hls.attachMedia(videoRef.current);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS manifest parsed, ready to play");
        });
      } else if (
        videoRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        videoRef.current.src = mediaSource;
      } else {
        console.error(
          "HLS is not supported in this browser. Please use a compatible browser."
        );
      }
    } else if (
      !isHls &&
      mediaSource &&
      (audioRef.current || videoRef.current)
    ) {
      if (isAudio && audioRef.current) {
        audioRef.current.src = mediaSource;
      } else if (videoRef.current) {
        videoRef.current.src = mediaSource;
      }
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [mediaSource, isHls, isAudio]);

  const handleSong = () => {
    const mediaElement = isAudio ? audioRef.current : videoRef.current;
    if (mediaElement) {
      if (mediaElement.paused) {
        mediaElement.play();
        setIsPlaying(true);
      } else {
        mediaElement.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleSkipBack = () => {
    const mediaElement = isAudio ? audioRef.current : videoRef.current;
    if (mediaElement) {
      mediaElement.currentTime = Math.max(0, mediaElement.currentTime - 10);
    }
  };

  const handleSkipForward = () => {
    const mediaElement = isAudio ? audioRef.current : videoRef.current;
    if (mediaElement && mediaElement.duration) {
      mediaElement.currentTime = Math.min(
        mediaElement.duration,
        mediaElement.currentTime + 10
      );
    }
  };

  const onProgressClick = (e) => {
    const progressBar = e.target;
    const mediaElement = isAudio ? audioRef.current : videoRef.current;

    if (
      mediaElement &&
      !isNaN(mediaElement.duration) &&
      mediaElement.duration > 0
    ) {
      const clicked =
        (e.clientX - progressBar.getBoundingClientRect().left) /
        progressBar.offsetWidth;

      const newTime = clicked * mediaElement.duration;
      if (isFinite(newTime)) {
        mediaElement.currentTime = newTime;
      }
    }
  };

  const handleTimeUpdate = () => {
    const mediaElement = isAudio ? audioRef.current : videoRef.current;
    setCurrentTime(mediaElement.currentTime);
    setDuration(mediaElement.duration);
  };

  return (
    <div className="px-6 pt-10 lg:px-8">
      <div>
        <div className="place-items-center">
          <Profile />
          <SongDetails />

          <div className="mx-auto max-w-xl mt-4">
            <div className="h-40   p-4 bg-white">
              First things first I'ma say all the words inside my head I'm fired
              up and tired of the way that things have been, oh-ooh The way that
              things have been, oh-ooh Second thing second Don't you tell me
              what you think that I could be I'm the one at the sail, I'm the
              master of my sea, oh-ooh The master of my sea, oh-ooh I was broken
              from a young age Taking my sulkin' to the masses. First things
              first I'ma say all the words inside my head I'm fired up and tired
              of the way that things have been, oh-ooh The way that things have
              been, oh-ooh Second thing second Don't you tell me what you think
              that I could be I'm the one at the sail, I'm the master of my sea,
              oh-ooh The master of my sea, oh-ooh I was broken from a young age
              Taking my sulkin' to the masses.
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0">
            <div
              className="bg-[#ffebc4] h-1 relative"
              onClick={onProgressClick}
            >
              <input
                type="range"
                className="w-full h-1 absolute top-0 left-0 cursor-pointer"
                min="0"
                max={duration || 1}
                value={currentTime}
                step="0.01"
                onChange={onProgressClick}
                style={{
                  background: `linear-gradient(to right, #FCB13D ${
                    (currentTime / duration) * 100
                  }%, #ffebc4 ${(currentTime / duration) * 100}%)`,
                  appearance: "none",
                  WebkitAppearance: "none",
                  height: "1px",
                }}
              />
              <div
                className="bg-yellow-500 h-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            <div className=" bg-black text-white p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center">
                <div className="mx-2">
                  {isPlaying ? (
                    <img
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

              <div className="flex items-center space-x-4 mr-10">
                <button onClick={handleSkipBack}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white w-6 rounded-full"
                  >
                    <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                  </svg>
                </button>
                <button
                  onClick={handleSong}
                  className="bg-white text-black rounded-full w-10 h-10 flex items-center justify-center"
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
                <button onClick={handleSkipForward}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-white w-6 rounded-full"
                  >
                    <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        {isHls ? (
          <video
            ref={videoRef}
            style={{ display: "none" }}
            onTimeUpdate={handleTimeUpdate}
          />
        ) : isAudio ? (
          <audio
            ref={audioRef}
            style={{ display: "none" }}
            onTimeUpdate={handleTimeUpdate}
          />
        ) : (
          <video
            ref={videoRef}
            style={{ display: "none" }}
            onTimeUpdate={handleTimeUpdate}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
