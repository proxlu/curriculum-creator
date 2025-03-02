import React, { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <span 
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute z-10 w-64 px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg -top-2 left-6 transform -translate-y-full">
          {content}
          <div className="absolute w-2 h-2 bg-gray-800 transform rotate-45 -bottom-1 left-1"></div>
        </div>
      )}
    </span>
  );
};

export default Tooltip;