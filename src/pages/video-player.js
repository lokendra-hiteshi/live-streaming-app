import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import Plyr from "plyr";
import "plyr/dist/plyr.css";
import { useMedia } from "../context/mediaContext";
import { useNavigate } from "react-router-dom";
import paths from "../paths";

const VideoPlayer = () => {
  const mediaRef = useRef(null);
  const containerRef = useRef(null);
  const [isHls, setIsHls] = useState(false);
  const navigate = useNavigate();

  const { mediaSource } = useMedia();

  useEffect(() => {
    if (mediaSource) {
      setIsHls(mediaSource.endsWith(".m3u8"));
    } else navigate(paths.home);
  }, [mediaSource, navigate]);

  useEffect(() => {
    const mediaElement = mediaRef.current;
    const defaultOptions = {};

    let player;
    if (isHls) {
      if (!Hls.isSupported()) {
        mediaElement.src = mediaSource;
        player = new Plyr(mediaElement, defaultOptions);
      } else {
        const hls = new Hls();
        hls.loadSource(mediaSource);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          const availableQualities = hls.levels.map((l) => l.height);
          availableQualities.unshift(0);

          defaultOptions.quality = {
            default: 0,
            options: availableQualities,
            forced: true,
            onChange: (e) => updateQuality(e),
          };

          defaultOptions.i18n = {
            qualityLabel: {
              0: "Auto",
            },
          };

          hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
            const span = containerRef.current.querySelector(
              ".plyr__menu__container [data-plyr='quality'][value='0'] span"
            );
            if (hls.autoLevelEnabled) {
              span.innerHTML = `AUTO (${hls.levels[data.level].height}p)`;
            } else {
              span.innerHTML = `AUTO`;
            }
          });

          player = new Plyr(mediaElement, defaultOptions);
        });

        hls.attachMedia(mediaElement);
        window.hls = hls;
      }
    }

    function updateQuality(newQuality) {
      if (newQuality === 0) {
        window.hls.currentLevel = -1;
      } else {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            window.hls.currentLevel = levelIndex;
          }
        });
      }
    }

    return () => {
      if (player) {
        player.destroy();
      }
      if (window.hls) {
        window.hls.destroy();
      }
    };
  }, [mediaSource, isHls]);

  return (
    <div className="relative  px-6 pt-14 lg:px-8">
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-44">
        <div className="text-center">
          <h1 className="text-balance text-3xl font-semibold text-gray-900 ">
            You Ara Streaming Now.
          </h1>
        </div>
        <div className="container mx-auto p-4" ref={containerRef}>
          {isHls ? (
            <video
              ref={mediaRef}
              className="w-full h-auto rounded-md shadow-lg"
              controls
              crossOrigin="anonymous"
              playsInline
              poster="https://media.istockphoto.com/id/1005267014/vector/retro-style-condensed-font.jpg?s=1024x1024&w=is&k=20&c=LvYPfz2YzSg1vrd4ECgQlywXGXDYf8VCQ7aq0IyrIMo="
            ></video>
          ) : (
            <video
              src={mediaSource}
              className="w-full h-auto rounded-md shadow-lg"
              controls
              crossOrigin="anonymous"
              playsInline
              poster="https://media.istockphoto.com/id/1005267014/vector/retro-style-condensed-font.jpg?s=1024x1024&w=is&k=20&c=LvYPfz2YzSg1vrd4ECgQlywXGXDYf8VCQ7aq0IyrIMo="
            ></video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
