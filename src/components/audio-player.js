import React, { useEffect, useState } from "react";
import "plyr/dist/plyr.css";
import { useLocation } from "react-router-dom";

const AudioPlayer = () => {
  const [mediaSource, setMediaSource] = useState("");

  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get("source");
    if (source) {
      setMediaSource(source);
    }
  }, [location]);

  return (
    <div className="px-6 pt-10 lg:px-8">
      <div className="place-items-center">
        <div className="mt-10 rounded-full bg-fuchsia-400">
          <img
            src="https://c8.alamy.com/comp/ED05P3/music-artist-justin-moore-ED05P3.jpg"
            className="w-80 h-80 rounded-full p-4"
          />
        </div>
        <div className="mx-auto max-w-2xl pt-16 ">
          <div className="flex justify-between">
            <div>
              <div className="flex justify-start gap-1 mb-2">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 text-yellow-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
                    />
                  </svg>
                </div>
                <h4 className="font-bold text-2xl text-yellow-500 ">
                  Walking The Wire
                </h4>
              </div>

              <div className="flex justify-start gap-1">
                <h5 className="text-sm font-bold  text-slate-500">
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
                className="w-11 cursor-pointer"
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

        <div className="h-40 w-80 overflow-y-scroll scrollbar-hide p-4 bg-white mt-2 ">
          First things first I'ma say all the words inside my head I'm fired up
          and tired of the way that things have been, oh-ooh The way that things
          have been, oh-ooh Second thing second Don't you tell me what you think
          that I could be I'm the one at the sail, I'm the master of my sea,
          oh-ooh The master of my sea, oh-ooh I was broken from a young age
          Taking my sulkin' to the masses.
        </div>

        <div className="">
          <div className="container mx-auto py-2 w-100">
            {mediaSource ? (
              <audio controls>
                <source src={mediaSource} type="audio/mp3" /> Your browser does
                not support the audio element.
              </audio>
            ) : (
              <p>No audio source provided.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
