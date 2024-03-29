import React, { useState, useEffect } from "react";
import Script from "next/script";

import { isMobile } from 'react-device-detect';

export default function SunglassModalViewer({ handleClose }) {

 const [isMobileDevice, setIsMobileDevice] = useState(isMobile);
 const [modelViewerStyle, setModelViewerStyle] = useState(isMobile ? { width: "300px", height: "300px" } : { width: "670px", height: "670px" });



 useEffect(() => {
    // Function to update the state based on the device type
    const updateDeviceType = () => {
      setIsMobileDevice(isMobile);
      setModelViewerStyle(isMobile ? { width: "300px", height: "300px" } : { width: "670px", height: "670px" });
    };

    // Initial update
    updateDeviceType();

    // Listen for changes in the device type
    window.addEventListener('resize', updateDeviceType);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener('resize', updateDeviceType);
 }, []);

 return (
  <div className=" relative">
      <Script
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
        type="module"
      />
      <model-viewer
        alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
        src="/optical/3d_modal/optical_sunglass.glb"
        ar
        shadow-intensity="1"
        camera-controls
        touch-action="pan-y"
        style={modelViewerStyle}
      >
              <button
        className="absolute bottom-0 right-0 mb-4 mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClose}
      >
        Try On
      </button>

      </model-viewer>

    
    </div>
 );
}
