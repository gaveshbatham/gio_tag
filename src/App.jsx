import { useState } from "react";
import "./App.css";
import GeoTaggedLandScape from "./GeoTaggedImage.jsx";
import GeoTaggedPortrate from "./GiotagForPortrate.jsx";

function App() {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [textLocation, setTextLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [pincode, setPincode] = useState("");
  const [plusCode, setPlusCode] = useState("");
  const [image1Dim, setImage1Dim] = useState({ width: 0, height: 0 });

  // Validation states
  const [pincodeError, setPincodeError] = useState("");
  const [latError, setLatError] = useState("");
  const [longError, setLongError] = useState("");

  // Reset function to clear all fields
  const handleReset = () => {
    setImage1(null);
    setImage2(null);
    setTextLocation("");
    setDate("");
    setTime("");
    setLat("");
    setLong("");
    setPincode("");
    setPlusCode("");
    setImage1Dim({ width: 0, height: 0 });

    // Clear validation errors
    setPincodeError("");
    setLatError("");
    setLongError("");

    // Clear file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => {
      input.value = "";
    });
  };

  // Function to convert 24-hour time to 12-hour AM/PM format
  const formatTimeAMPM = (time24) => {
    if (!time24) return "";

    const [hours, minutes] = time24.split(":");
    const hour12 = parseInt(hours);
    const ampm = hour12 >= 12 ? "PM" : "AM";
    const displayHour = hour12 % 12 || 12; // Convert 0 to 12 for midnight

    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Validation functions
  const validatePincode = (value) => {
    if (value === "") {
      setPincodeError("");
      return true;
    }
    if (!/^\d{6}$/.test(value)) {
      setPincodeError("Pincode must be 6 digits");
      return false;
    }
    setPincodeError("");
    return true;
  };

  const validateLatitude = (value) => {
    if (value === "") {
      setLatError("");
      return true;
    }
    const num = parseFloat(value);
    if (isNaN(num) || num < -90 || num > 90) {
      setLatError("Latitude must be between -90 and 90");
      return false;
    }
    setLatError("");
    return true;
  };

  const validateLongitude = (value) => {
    if (value === "") {
      setLongError("");
      return true;
    }
    const num = parseFloat(value);
    if (isNaN(num) || num < -180 || num > 180) {
      setLongError("Longitude must be between -180 and 180");
      return false;
    }
    setLongError("");
    return true;
  };

  const handleFileChange = (e, setImage, setDim) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      if (setDim) {
        const img = new window.Image();
        img.onload = () => setDim({ width: img.width, height: img.height });
        img.src = url;
      }
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value;
    const digitsOnly = value.replace(/\D/g, "");
    const limitedValue = digitsOnly.slice(0, 6);
    setPincode(limitedValue);
    validatePincode(limitedValue);
  };

  const handleLatChange = (e) => {
    const value = e.target.value;
    setLat(value);
    validateLatitude(value);
  };

  const handleLongChange = (e) => {
    const value = e.target.value;
    setLong(value);
    validateLongitude(value);
  };

  const isPortrait = image1Dim.height > image1Dim.width;

  // Combine date and time for overlay with AM/PM format
  const formattedDateTime =
    date && time
      ? `${date.split("-").reverse().join("/")} ${formatTimeAMPM(time)}`
      : "";

  return (
    <div className="px-6 flex space-x-8 min-h-screen max-h-screen overflow-hidden">
      {/* Left: Input Form */}
      <div className="flex-1 max-w-xs space-y-4 max-h-screen py-4 overflow-auto">
        {/* Reset Button */}
        <div className="mb-4">
          <button
            onClick={handleReset}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reset All Fields
          </button>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Upload Main Image *
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setImage1, setImage1Dim)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {image1 && (
              <div className="mt-2 flex items-center text-xs text-green-600">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Image uploaded ({isPortrait ? "Portrait" : "Landscape"})
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">
            Upload Logo/Watermark
            <span className="text-gray-400 text-xs ml-1">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setImage2)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 file:cursor-pointer cursor-pointer border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
            {image2 && (
              <div className="mt-2 flex items-center text-xs text-green-600">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Logo uploaded
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label>Enter Location</label>
          <input
            type="text"
            className="border px-3 py-1 rounded w-full"
            value={textLocation}
            onChange={(e) => setTextLocation(e.target.value)}
          />
        </div>

        <div className="space-y-2 flex gap-2">
          <div>
            <label>Date</label>
            <input
              type="date"
              className="border px-3 py-1 rounded w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label>Time</label>
            <input
              type="time"
              className="border px-3 py-1 rounded w-full"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            {time && (
              <div className="text-xs text-white mt-1">
                Preview: {formatTimeAMPM(time)}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label>Latitude</label>
          <input
            type="text"
            className={`border px-3 py-1 rounded w-full ${
              latError ? "border-red-500" : ""
            }`}
            value={lat}
            onChange={handleLatChange}
            placeholder="e.g., 12.9716"
            minLength={9}
            maxLength={9}
          />
          {latError && <p className="text-red-500 text-xs">{latError}</p>}
        </div>

        <div className="space-y-2">
          <label>Longitude</label>
          <input
            type="text"
            className={`border px-3 py-1 rounded w-full ${
              longError ? "border-red-500" : ""
            }`}
            value={long}
            onChange={handleLongChange}
            placeholder="e.g., 77.5946"
            minLength={9}
            maxLength={9}
          />
          {longError && <p className="text-red-500 text-xs">{longError}</p>}
        </div>

        <div className="space-y-2">
          <label>Pincode</label>
          <input
            type="text"
            className={`border px-3 py-1 rounded w-full ${
              pincodeError ? "border-red-500" : ""
            }`}
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="e.g., 560001"
            maxLength="6"
          />
          {pincodeError && (
            <p className="text-red-500 text-xs">{pincodeError}</p>
          )}
        </div>

        <div className="space-y-2">
          <label>Plus Code</label>
          <input
            type="text"
            className="border px-3 py-1 rounded w-full"
            value={plusCode}
            onChange={(e) => setPlusCode(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Live Preview - Constrained Height */}
      <div className="flex-1 flex items-start justify-center max-h-screen overflow-auto py-4">
        {image1 && (
          <div className="max-h-full max-w-full flex items-center justify-center">
            {isPortrait ? (
              <div className="max-h-[90vh] max-w-full">
                <GeoTaggedPortrate
                  image1={image1}
                  image2={image2}
                  textLocation={textLocation}
                  time={formattedDateTime}
                  lat={lat}
                  long={long}
                  pincode={pincode}
                  plus_code={plusCode}
                />
              </div>
            ) : (
              <div className="max-h-[90vh] max-w-full">
                <GeoTaggedLandScape
                  image1={image1}
                  image2={image2}
                  textLocation={textLocation}
                  time={formattedDateTime}
                  lat={lat}
                  long={long}
                  pincode={pincode}
                  plus_code={plusCode}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
