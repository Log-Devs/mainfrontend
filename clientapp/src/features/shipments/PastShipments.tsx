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
    // Fetch past shipments from API here
    const fetchShipments = async () => {
      try {
        const response = await fetch('/api/shipments/past'); // Replace with actual API endpoint
        const data: Shipment[] = await response.json();
        setShipments(data);
      } catch (error) {
        console.error("Error fetching shipments:", error);
      }
    };

    fetchShipments();
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
