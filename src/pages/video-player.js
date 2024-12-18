import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import "plyr/dist/plyr.css";
import { useMedia } from "../context/mediaContext";
import { useNavigate } from "react-router-dom";
import paths from "../paths";
import Player from "../components/player";

const VideoPlayer = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const { mediaSource } = useMedia();
  const navigate = useNavigate();

  const [isHls, setIsHls] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [qualityOptions, setQualityOptions] = useState([]);

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
        hlsRef.current = hls;
        hls.loadSource(mediaSource);
        hls.attachMedia(mediaElement);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const qualities = hls.levels.map((level) => level.height);
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
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
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
    if (hlsRef.current && quality !== "Auto") {
      hlsRef.current.levels.forEach((level, index) => {
        if (level.height === parseInt(quality)) {
          hlsRef.current.currentLevel = index;
        }
      });
    } else if (hlsRef.current) {
      hlsRef.current.currentLevel = -1;
    }
  };

  const handleProgressChange = (e) => {
    const video = videoRef.current;
    video.currentTime = parseFloat(e.target.value);
    setCurrentTime(video.currentTime);
  };

  return (
    <div className="relative px-6 pt-7 lg:px-8  bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500  min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-7xl py-24 sm:py-40 lg:py-36">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900">
            You Are Streaming Now
          </h1>
        </div>
        <div className="p-4" ref={containerRef}>
          <video
            ref={videoRef}
            className="w-full rounded-md shadow-lg"
            crossOrigin="anonymous"
            playsInline
            poster="https://media.istockphoto.com/id/1005267014/vector/retro-style-condensed-font.jpg?s=1024x1024&w=is&k=20&c=LvYPfz2YzSg1vrd4ECgQlywXGXDYf8VCQ7aq0IyrIMo="
          />
        </div>

        <Player
          handleSkipBack={handleSkipBack}
          handlePlayPause={handlePlayPause}
          handleProgressChange={handleProgressChange}
          handleSkipForward={handleSkipForward}
          duration={duration}
          currentTime={currentTime}
          handleQualityChange={handleQualityChange}
          handleSpeedChange={handleSpeedChange}
          qualityOptions={qualityOptions}
          isPlaying={isPlaying}
          isVideo={true}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
