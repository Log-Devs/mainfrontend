import React, { useEffect, useState } from "react";

//   // TODO: Fetch past shipments from API here// useEffect(() => {// API: Placeholder for fetching past shipments// import axios from "axios"; // Uncomment when ready to use APIs

//   // Example: axios.get('/api/shipments/past').then(...)
// }, []);

const PastShipments = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    // TODO: Fetch past shipments from API here
    // Example: axios.get('/api/shipments/past').then(response => setShipments(response.data));
  }, []);

  return (
    <div>
      <h1>Past Shipments</h1>
      <ul>
        {shipments.map((shipment) => (
          <li key={shipment.id}>{shipment.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default PastShipments;
