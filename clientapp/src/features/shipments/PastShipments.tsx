import { useEffect, useState } from "react";

//   // TODO: Fetch past shipments from API here// useEffect(() => {// API: Placeholder for fetching past shipments// import axios from "axios"; // Uncomment when ready to use APIs

//   // Example: axios.get('/api/shipments/past').then(...)
// }, []);

interface Shipment {
  id: string;
  description: string;
  // Add more properties as needed
}

const PastShipments = () => {
  const [shipments, setShipments] = useState<Shipment[]>([]);

  useEffect(() => {
    // TODO: Fetch past shipments from API here
    // Example: axios.get('/api/shipments/past').then(response => setShipments(response.data));
  }, []);

  return (
    <div>
      <h1>Past Shipments</h1>
      {shipments.length > 0 ? (
        <ul>
          {shipments.map((shipment) => (
            <li key={shipment.id}>{shipment.description}</li>
          ))}
        </ul>
      ) : (
        <p>No past shipments found.</p>
      )}
    </div>
  );
};

export default PastShipments;
