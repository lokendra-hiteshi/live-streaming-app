import React, { useState } from "react";

const Tooltip = ({ title, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-white bg-gray-800 text-sm rounded-md shadow-md z-10">
          {title}
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;
