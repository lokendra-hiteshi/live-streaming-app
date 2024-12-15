import React, { useEffect, useState, useRef } from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import ProfileCircle from "./profile";
import { useLocation } from "react-router-dom";

const AudioPlayer = () => {
  const [mediaSource, setMediaSource] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHls, setIsHls] = useState(false);
  const [isAudio, setIsAudio] = useState(false);

  const location = useLocation();
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    // Fetch the media source from query parameters
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get("source");
    if (source) {
      setMediaSource(source);
      setIsHls(source.includes(".m3u8"));
      setIsAudio(source.match(/\.(mp3|wav|ogg)$/i));
    }
  }, [location]);

  useEffect(() => {
    // Cleanup existing HLS instance
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
        // Native HLS support
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

  const handlePlayPause = () => {
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

  return (
    <div className="px-6 pt-10 lg:px-8">
      <div>
        <div className="place-items-center">
          <ProfileCircle />

          <div className="mx-auto max-w-2xl pt-16">
            <div className="flex justify-between">
              <div>
                <div className="flex justify-start gap-1 mb-2">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 text-yellow-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-bold text-2xl text-yellow-500">
                    Walking The Wire
                  </h4>
                </div>
                <div className="flex justify-start gap-1">
                  <h5 className="text-sm font-bold text-slate-500">
                    Jaylson Gouse, 2018
                  </h5>
                  <button className="bg-pink-300 text-red-700 font-bold px-1 rounded-md">
                    INDIE
                  </button>
                </div>
                <div className="mt-2 flex justify-start gap-2">
                  <div>
                    <img
                      alt=""
                      src="https://img.freepik.com/free-vector/abstract-3d-blue-color-music-notes-vector-illustrationxdxa_460848-11830.jpg"
                      className="h-10 w-10 rounded-md"
                    />
                  </div>
                  <h4 className="font-bold text-xl">MAIN SQUARE</h4>
                </div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-12"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-2xl mt-4">
            <div className="h-40 overflow-y-scroll scrollbar-hide p-4 bg-white">
              First things first I'ma say all the words inside my head I'm fired
              up and tired of the way that things have been, oh-ooh The way that
              things have been, oh-ooh Second thing second Don't you tell me
              what you think that I could be I'm the one at the sail, I'm the
              master of my sea, oh-ooh The master of my sea, oh-ooh I was broken
              from a young age Taking my sulkin' to the masses.
            </div>
          </div>

          <div className="fixed bottom-0 left-0 right-0 bg-black text-white p-4 flex items-center justify-between shadow-lg">
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="text-yellow-500 font-bold">
                  Walking The Wire
                </span>
                <span className="text-gray-300 text-sm">Jasper Dolphy</span>
              </div>
            </div>

            <div className="flex items-center space-x-4 mr-10">
              <button
                onClick={handleSkipBack}
                className="text-gray-400 hover:text-white"
              >
                ⏪
              </button>
              <button
                onClick={handlePlayPause}
                className="bg-gray-700 text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-600"
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
              <button
                onClick={handleSkipForward}
                className="text-gray-400 hover:text-white"
              >
                ⏩
              </button>
            </div>
          </div>
        </div>
        {isHls ? (
          <video ref={videoRef} style={{ display: "none" }} />
        ) : isAudio ? (
          <audio ref={audioRef} style={{ display: "none" }} />
        ) : (
          <video ref={videoRef} style={{ display: "none" }} />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
