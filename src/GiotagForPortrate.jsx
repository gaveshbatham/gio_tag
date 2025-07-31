import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import appLogo from "./assets/app_logo.png";

const GeoTaggedPortrate = ({ image1, image2, textLocation, time, lat, long, pincode, plus_code }) => {
  const captureRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  const handleDownload = async () => {
    if (!imagesLoaded) return;
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      const canvas = await html2canvas(captureRef.current, {
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = "geo-tagged-portrait.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div
        ref={captureRef}
        className="relative inline-block shadow-lg w-fit"
        style={{ display: "inline-block" }}
      >
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
              className="absolute bottom-1.5 left-2 w-19 aspect-square object-cover opacity-80 z-20"
            />
            <div
              className="absolute bottom-2.5 left-3.5 text-[11.3px] text-white z-30"
              style={{
                textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
              }}
            >
              Google
            </div>
          </div>
        )}

        {/* Replace bg-black/62 with inline style */}
        <div 
          className="absolute bottom-1.5 left-22 w-76 h-19 text-white px-1 py-[4px] z-20"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }}
        >
          <div className="font-sans text-base text-[16.7px]">
            {textLocation}
          </div>
          <div className="font-sans text-base text-[10.5px] mt-0 leading-[7px]">
            {plus_code}, {textLocation} {pincode}, India
          </div>
          <div className="font-sans text-base text-[10.5px] mt-0 leading-[17px]">
            Lat {lat}° Long {long}°
          </div>
          <div className="font-sans text-base text-[10.5px] mt-0 leading-[6px]">
            {time} GMT +05:30
          </div>
        </div>

        <div 
          className="absolute bottom-20.5 right-2 w-18 h-4 text-white text-sm px-3 py-1 z-20"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.62)' }}
        >
          <img
            src={appLogo}
            alt=""
            className="absolute bottom-[2px] left-[2px] w-[68px]"
          />
          
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={handleDownload}
          className={`px-4 py-2 rounded text-white ${
            imagesLoaded 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          disabled={!imagesLoaded}
        >
          {imagesLoaded ? 'Export Image' : 'Loading...'}
        </button>
      </div>
    </div>
  );
};

export default GeoTaggedPortrate;
