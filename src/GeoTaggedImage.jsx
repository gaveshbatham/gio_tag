import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import appLogo from './assets/app_logo.png'; // Use import for local asset

const GeoTaggedImage = ({ image1, image2, textLocation, time, lat, long, pincode, plus_code }) => {
  const captureRef = useRef(null);
  const [imgReady, setImgReady] = useState(false);

  // Wait for main image to load before allowing export
  const handleImageLoad = () => {
    setImgReady(true);
  };

  const handleDownload = async () => {
    if (!imgReady) return; // Avoid click before load
    const canvas = await html2canvas(captureRef.current, {
      useCORS: true,
      backgroundColor: null,
      scrollY: -window.scrollY // To fix cropping if scrolled
    });
    const link = document.createElement("a");
    link.download = "geo-tagged-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="p-4">
      <div ref={captureRef} className="relative inline-block shadow-lg w-fit">
        <img
          src={image1}
          alt="Main"
          crossOrigin="anonymous"
          onLoad={handleImageLoad}
          className="w-[400px] h-auto object-contain rounded-xl"
        />
        {image2 && (
          <div>
            <img
              src={image2}
              alt="Overlay"
              crossOrigin="anonymous"
              className="absolute bottom-1.5 left-10 w-14 object-contain opacity-80 z-20"
            />
            <div
              className="absolute bottom-2 left-11 text-[9px] z-30"
              style={{
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              Google
            </div>
          </div>
        )}
        <div className="absolute bottom-1.5 left-25 w-65 h-13.5  text-white text-sm px-1 py-1 z-20"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }}
        
        >
          <div className="font-sans text-base text-[12.5px]">
            {textLocation}
          </div>
          <div className="font-sans text-base text-[7.85px] mt-0 leading-[5px]">
            {plus_code}, {textLocation} {pincode}, India
          </div>
          <div className="font-sans text-base text-[7.85px] mt-0 font-roboto leading-[12px]">
            Lat {lat}° Long {long}°
          </div>
          <div className="font-sans text-base text-[7.85px] mt-0 font-roboto leading-[6px]">
            {time} GMT +05:30
          </div>
        </div>
        <div className="absolute bottom-15 right-10 w-14 h-[14px]  text-white text-sm px-3 py-1 z-20"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }}
        >
          <img
            src={appLogo}
            alt=""
            className="absolute bottom-[2px] left-[1.5px] w-[54px]  "
          />
        
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleDownload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={!imgReady}
        >
          Export Image
        </button>
      </div>
    </div>
  );
};

export default GeoTaggedImage;
