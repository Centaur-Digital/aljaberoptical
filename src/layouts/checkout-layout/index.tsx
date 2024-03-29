import { FC, useState } from "react";
import Image from "next/image";
import * as FeatherIcon from "react-feather";
import SunglassModalViewer from "../../components/sunglass_3dmodal";
import CheckoutCountLayout from "./checkout-count";
import DescriptionLayout from "./description";
import { OptionT, TOP_BAR_OPTIONS } from "./helper";
import Modal from "@mui/material/Modal";
import { Box, Button } from "@mui/material";
import ArScene from '../../components/sunglass_preview_modal';
import { isMobile } from 'react-device-detect';
import { Router, useRouter } from "next/router";

interface Props {
  glassType: 'COOLING_GLASS' | 'EYE_GLASS';
}

const CheckoutLayout: FC<Props> = ({ glassType }) => {

  const GLASS_NAME = glassType === 'EYE_GLASS' ? 'ROUND HAVANA EYEGLASSES' : 'Gunmetal Square Sunglasses'
  const [currentImage, setCurrentImage] = useState( glassType === 'EYE_GLASS' ? "/optical/optical_1.jpg" : "/optical/metal/optical_1.jpg");
  const [is360ViewActive, setIs360ViewActive] = useState<boolean>(false);
  const router =useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  const handle360ViewClick = () => {
    setIs360ViewActive(true);
  };

  const images = glassType === 'EYE_GLASS' ? [
    "/optical/optical_1.jpg",
    "/optical/optical_2.jpg",
    "/optical/optical_3.jpg",
  ] :[  "/optical/metal/optical_1.jpg",
  "/optical/metal/optical_2.jpg",
  "/optical/metal/optical_3.jpg",];

  const handleChangeImage = (direction: any) => {
    const currentIndex = images.indexOf(currentImage);
    let newIndex: any;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length;
    } else if (direction === "prev") {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }

    setCurrentImage(images[newIndex]);
  };

  return (
    <div className="w-full h-full bg-white flex flex-col justify-center items-center">
      <div className="w-full h-16 bg-black"></div>
      <div className="h-screen w-full md:w-3/5">
   
        <div className="h-32 w-full flex flex-row items-center space-x-8">
          <Image
            src={"/logo/aljabirlogo.png"}
            width={140}
            height={160}
            alt={"Aljabir"}
            className="mr-8 cursor-pointer"
            onClick={()=>{
              router.push('/')
            }}
          />
          <div className="hidden md:flex flex-row text-lg font-semibold space-x-6">
            {TOP_BAR_OPTIONS.map((d: OptionT) => (
              <div key={d.value} 
              onClick={()=>{
                if(d.value === 'EYEGLASSES'){
                  router.push('/eye-glass')
                }
              }}
              className={`flex flex-row ${d.value === 'EYEGLASSES' && 'cursor-pointer' }`}>
                {d.label}

                <FeatherIcon.ChevronDown />
              </div>
            ))}
          </div>
          <div className="flex flex-row space-x-4">
            <FeatherIcon.Search size={32} />
            <FeatherIcon.Heart size={32}></FeatherIcon.Heart>
            <FeatherIcon.ShoppingCart size={32} />
          </div>
        </div>
        {/* Breadcrumbs */}
        <div className="h-12 w-full text-gray-400 flex flex-row space-x-4 p-2">
          <FeatherIcon.Home />
          <FeatherIcon.ChevronRight />
          <div>{GLASS_NAME}</div>
        </div>
        {/* Product image gallery and checkout count */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12 w-full h-full">
          <div className="w-full md:w-1/2  h-4/5 relative">
            <div className="w-full h-full border border-gray-200 relative cursor-pointer">
              <div
                className="absolute inset-y-0 left-0 flex items-center z-10 cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
                onClick={() => handleChangeImage("prev")}
              >
                <FeatherIcon.ChevronLeft size={32} />
              </div>
              {is360ViewActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                 <SunglassModalViewer handleClose={handleClose} />

                </div>
              ) : (
                <Image
                  src={currentImage}
                  alt="sunglasses"
                  layout="fill"
                  objectFit="contain"
                />
              )}
              <div
                className="absolute inset-y-0 right-0 flex justify-end items-center cursor-pointer opacity-0 transition-opacity duration-300 hover:opacity-100"
                onClick={() => handleChangeImage("next")}
              >
                <FeatherIcon.ChevronRight size={32} />
              </div>
            </div>
            <div className="w-full h-1/5">
              <div className="h-5/6 flex flex-row space-x-4 mt-4">
                <div
                  className={`w-36 border-2 h-full flex items-center justify-center cursor-pointer ${
                    is360ViewActive && "border-black border-4"
                  }`}
                  onClick={() => {
                    handle360ViewClick();
                  }}
                >
                  <Image
                    src={"/optical/viewer/360_view.png"}
                    alt={`Image preview `}
                    width={140}
                    height={120}
                    objectFit="cover"
                  />
                </div>
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`w-36 border-2 h-full flex items-center justify-center cursor-pointer ${
                      image === currentImage && !is360ViewActive
                        ? "border-black border-4"
                        : "border-2"
                    }`}
                    onClick={() => {
                      setCurrentImage(image);
                      setIs360ViewActive(false);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Image preview ${index + 1}`}
                      width={140}
                      height={120}
                      objectFit="cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-3/4 flex flex-col space-y-4">
            <CheckoutCountLayout  glassType={glassType}/>
          </div>
        </div>
        <div>
          <DescriptionLayout />
        </div>
      </div>
  
      {
        isMobile ?
        <Modal
        open={open}
        onClose={handleClose}
        className="w-full h-full"
    
      >
        <Box >
          <ArScene onClose={handleClose} />
        </Box>
      </Modal>
      :
      <Modal
        open={open}
        onClose={handleClose}
        className="w-1/2 h-3/4 m-auto"
      >
        <Box >
          <ArScene onClose={handleClose} />
        </Box>
      </Modal>
      }
 
    </div>
  );
}
export default CheckoutLayout;