import React, { useState } from "react";

//   // TODO: Fetch tracking info from API here// const handleTrack = (trackingNumber) => {// API: Placeholder for tracking shipments// import axios from "axios"; // Uncomment when ready to use APIs

//   // Example: axios.get(`/api/shipments/track/${trackingNumber}`).then(...)
// };

const TrackGoods = () => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState(null);

  const handleInputChange = (e) => {
    setTrackingNumber(e.target.value);
  };

  const handleTrack = () => {
    // TODO: Implement tracking logic
    console.log("Tracking number:", trackingNumber);
  };

  return (
    <div>
      <h1>Track Your Goods</h1>
      <input
        type="text"
        value={trackingNumber}
        onChange={handleInputChange}
        placeholder="Enter your tracking number"
      />
      <button onClick={handleTrack}>Track</button>
      {trackingInfo && (
        <div>
          <h2>Tracking Information</h2>
          {/* Render tracking information here */}
        </div>
      )}
    </div>
  );
};

export default TrackGoods;
