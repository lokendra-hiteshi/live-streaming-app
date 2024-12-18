import React, { useEffect, useState, useRef } from "react";
import "plyr/dist/plyr.css";
import Hls from "hls.js";
import Profile from "../components/profile";
import SongDetails from "../components/song-deatils";
import { useMedia } from "../context/mediaContext";
import { useNavigate } from "react-router-dom";
import paths from "../paths";
import Player from "../components/player";

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

  useEffect(() => {
    if (mediaSource) {
      setIsHls(mediaSource.includes(".m3u8"));
      setIsAudio(mediaSource.match(/\.(mp3|wav|ogg)$/i));
    } else navigate(paths.home);
  }, [mediaSource, navigate]);

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
    const mediaElement = isAudio ? audioRef.current : videoRef.current;
    mediaElement.currentTime = parseFloat(e.target.value);
    setCurrentTime(mediaElement.currentTime);
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
          <Profile handlePlayPause={handleSong} isPlaying={isPlaying} />
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

          <Player
            handleSkipBack={handleSkipBack}
            handlePlayPause={handleSong}
            handleProgressChange={onProgressClick}
            handleSkipForward={handleSkipForward}
            duration={duration}
            currentTime={currentTime}
            isPlaying={isPlaying}
          />
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
