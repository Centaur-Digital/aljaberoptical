import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import * as FeatherIcon from "react-feather";
import { isMobile } from "react-device-detect";

export default function SunglassModalViewer({ handleClose, glassType }) {
 const GLASS_TYPE =
    glassType === "EYE_GLASS"
      ? "/optical/3d_modal/power_glass/scene.gltf"
      : "/optical/3d_modal/sun_glass/scene.gltf";

 // Set the initial style to fill the parent div
 const [modelViewerStyle, setModelViewerStyle] = useState({
    width: "100%",
    height: "100%",
 });
 const modelViewerRef = useRef(null);


 const resetModelPosition = () => {
    const modelViewer = modelViewerRef.current;
    if (modelViewer) {
      modelViewer.cameraOrbit = "-3.429deg 88.33deg 45.98m";
      modelViewer.fieldOfView = "30deg";
    }
 };

 return (
    <div className="relative" style={{ width: "100%", height: "100%" }}>
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
     
        min-camera-orbit="auto auto 37.92m" 
        min-field-of-view="22.27deg"

        camera-controls
        touch-action="pan-y"
        style={modelViewerStyle}
      >
        <FeatherIcon.RefreshCcw
          className="absolute top-0 left-0 m-4 rounded-lg bg-gray-200 text-blue-500 cursor-pointer p-2"
          size={36}
          onClick={resetModelPosition}
        />

        <button
          className="absolute bottom-0 right-0 mb-2 mr-1 bg-blue-400 shadow-lg hover:bg-blue-700 text-white font-bold py-2 px-4 flex flex-row space-x-2 rounded"
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
