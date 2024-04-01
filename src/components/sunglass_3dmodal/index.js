import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import * as FeatherIcon from "react-feather";
import { isMobile } from "react-device-detect";

export default function SunglassModalViewer({ handleClose, glassType }) {
  const GLASS_TYPE =
    glassType === "EYE_GLASS"
      ? "/optical/3d_modal/power_glass/scene.gltf"
      : "/optical/3d_modal/sun_glass/scene.gltf";

  const [isMobileDevice, setIsMobileDevice] = useState(isMobile);
  const [modelViewerStyle, setModelViewerStyle] = useState(
    isMobile
      ? { width: "300px", height: "300px" }
      : { width: "670px", height: "670px" }
  );
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // Function to update the state based on the device type
    const updateDeviceType = () => {
      setIsMobileDevice(isMobile);
      setModelViewerStyle(
        isMobile
          ? { width: "300px", height: "300px" }
          : { width: "670px", height: "670px" }
      );
    };

    // Initial update
    updateDeviceType();

    // Listen for changes in the device type
    window.addEventListener("resize", updateDeviceType);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", updateDeviceType);
  }, []);

  const resetModelPosition = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.cameraOrbit = "34.29deg 84.14deg 0.3991m";
      modelViewer.fieldOfView = "30deg";
    }
  };

  return (
    <div className="relative">
      <Script
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js"
        type="module"
      />
      <model-viewer
        ref={modelViewerRef}
        alt="Neil Armstrong's Spacesuit from the Smithsonian Digitization Programs Office and National Air and Space Museum"
        src={GLASS_TYPE}
        ar
        shadow-intensity="1"
        min-camera-orbit="auto auto 0.3194m"
        min-field-of-view="26.26deg"
        Zoom
        camera-controls
        touch-action="pan-y"
        style={modelViewerStyle}
      >
        <FeatherIcon.RefreshCcw
          className="absolute top-0 left-0 m-4 text-blue-500 cursor-pointer"
          onClick={resetModelPosition}
        />

        <button
          className="absolute bottom-0 right-0 mb-4 mr-4 bg-blue-400 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 flex flex-row space-x-2 rounded"
          onClick={handleClose}
        >
          <div>
            <FeatherIcon.Camera />
          </div>
          <div>{`Virtual Try On`}</div>
        </button>
      </model-viewer>
    </div>
  );
}
