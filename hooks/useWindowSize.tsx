import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        function handleResize(): void {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
  
        // Add event listener
        window.addEventListener('resize', handleResize);
  
        handleResize();
  
        return () => window.removeEventListener('resize', handleResize);
      }
    }, []);
    return windowSize;
  }