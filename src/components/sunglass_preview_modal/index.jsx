import React, { useEffect, useState } from "react";
import * as FeatherIcon from "react-feather";

const ARScene = ({ onClose }) => {
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const sceneEl = document.querySelector("a-scene");
    if (sceneEl) {
      sceneEl.addEventListener("loaded", () => {
        console.log("Scene and all entities are now fully loaded");
      });
    }
    return () => {
      if (sceneEl) {
        sceneEl.removeEventListener("loaded", () => {
          console.log("Cleanup listener");
        });
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const glassesModel = document.getElementById("glassesModel");
      const headModel = document.getElementById("headModel");
      const onModelLoad = () => {
        console.log("Model loaded.");
        if (glassesModel.loaded && headModel.loaded) {
          setModelsLoaded(true);
        }
      };
      const onModelError = () => console.error("Error loading model.");
      glassesModel?.addEventListener("loaded", onModelLoad);
      headModel?.addEventListener("loaded", onModelLoad);
      glassesModel?.addEventListener("error", onModelError);
      headModel?.addEventListener("error", onModelError);
      return () => {
        glassesModel?.removeEventListener("loaded", onModelLoad);
        headModel?.removeEventListener("loaded", onModelLoad);
        glassesModel?.removeEventListener("error", onModelError);
        headModel?.removeEventListener("error", onModelError);
      };
    }, 0);
  }, []);

  const takeScreenshot = () => {
    const sceneEl = document.querySelector("a-scene");
    if (sceneEl && sceneEl.components.screenshot) {
      // Capture the screenshot without checking for modelsLoaded state
      sceneEl.components.screenshot.capture();
      console.log("Screenshot taken.");
    } else {
      console.error("Screenshot component not found or not initialized.");
    }
  };

  const closeARScene = () => {
    const sceneEl = document.querySelector("a-scene");
    console.log(sceneEl);
    if (sceneEl) {
      const cameraEl = sceneEl.querySelector("a-camera");
      console.log({ data: cameraEl });
      if (cameraEl) {
        cameraEl.setAttribute("camera", "active", false);
      }
    }
    onClose();
  };

  return (
    <div className=" w-full h-full">
 
      <div className="w-full h-full p-8">
        <a-scene
          mindar-face="imageTargetSrc: #target; maxTrack: 1"
          embedded
          color-space="sRGB"
          renderer="colorManagement: true, physicallyCorrectLights"
          vr-mode-ui="enabled: false"
          device-orientation-permission-ui="enabled: false"
          style={{ width: "100%", height: "100%" }} // Add zIndex here
        >
          <a-assets>
            <a-asset-item
              id="glassesModel"
              src="/optical/ar_scene/untitled.glb"
            ></a-asset-item>
            <a-asset-item
              id="headModel"
              src="/optical/ar_scene/headOccluder.glb"
            ></a-asset-item>
          </a-assets>
          <a-camera active="false" position="0 0 0"></a-camera>
          <a-entity light="type: ambient; color: #fff"></a-entity>
          <a-entity
            light="type: directional; color: #fff; intensity: 0.5"
            position="0 1 0"
          ></a-entity>
          <a-entity mindar-face-target="anchorIndex: 166">
            <a-gltf-model
              mindar-face-occluder
              position="0 -0.3 0.15"
              rotation="0 0 0"
              scale="0.065 0.065 0.065"
              src="#headModel"
            ></a-gltf-model>
          </a-entity>
          <a-entity mindar-face-target="anchorIndex: 166">
            <a-gltf-model
              rotation="0 0 0"
              position="0 0 0"
              scale="0.07 0.07 0.07"
              src="#glassesModel"
            ></a-gltf-model>
          </a-entity>
        </a-scene>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-row justify-center space-x-6">
        <button
          onClick={takeScreenshot}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Take Screenshot
        </button>
        <button
          onClick={closeARScene}
          className="flex flex-row space-x-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          <FeatherIcon.X className="w-5 h-5 mr-2" />
          <div>Close</div>
        </button>
      </div>
    </div>
  );
};

export default ARScene;
