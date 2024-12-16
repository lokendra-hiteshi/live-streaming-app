import React, { createContext, useState, useContext, useEffect } from "react";

const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const initialMediaSource = localStorage.getItem("mediaSource") || "";

  const [mediaSource, setMediaSource] = useState(initialMediaSource);

  useEffect(() => {
    if (mediaSource) {
      localStorage.setItem("mediaSource", mediaSource);
    }
  }, [mediaSource]);

  return (
    <MediaContext.Provider value={{ mediaSource, setMediaSource }}>
      {children}
    </MediaContext.Provider>
  );
};

export const useMedia = () => useContext(MediaContext);
