import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import StatusFilter from "../../components/StatusFilter";
import ShipmentList from "../../components/ShipmentList";

//   // TODO: Fetch past shipments from API here// useEffect(() => {// API: Placeholder for fetching past shipments// import axios from "axios"; // Uncomment when ready to use APIs

//   // Example: axios.get('/api/shipments/past').then(...)
// }, []);

interface Shipment {
  id: string;
  description: string;
  trackingNumber?: string;
  origin?: string;
  destination?: string;
  status?: string;
  estimatedDelivery?: string; // Add estimatedDelivery field
  // Add more properties as needed
}

const PastShipments = () => {
  const [loading, setLoading] = useState(true);
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Example statuses for filter dropdown
  const STATUS_OPTIONS = [
    { value: "", label: "All Statuses" },
    { value: "pending", label: "Pending" },
    { value: "in-transit", label: "In Transit" },
    { value: "processing", label: "Processing" },
    { value: "delayed", label: "Delayed" },
    { value: "delivered", label: "Delivered" },
  ];

  // Filtered shipments
  const filteredShipments = shipments.filter((shipment) => {
    const matchesSearch =
      search === "" ||
      shipment.description?.toLowerCase().includes(search.toLowerCase()) ||
      shipment.id?.toLowerCase().includes(search.toLowerCase()) ||
      shipment.trackingNumber?.toLowerCase().includes(search.toLowerCase()) ||
      shipment.origin?.toLowerCase().includes(search.toLowerCase()) ||
      shipment.destination?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !status ||
      (shipment.status && shipment.status.toLowerCase() === status);
    return matchesSearch && matchesStatus;
  });

  // Dummy data for demonstration
  useEffect(() => {
    const dummyShipments: Shipment[] = [
      {
        id: "1",
        description: "Electronics - Laptop",
        trackingNumber: "TRK-10001",
        origin: "Accra, Ghana",
        destination: "London, UK",
        status: "in-transit",
        estimatedDelivery: "May 20, 2025",
      },
      {
        id: "2",
        description: "Clothing - Summer Collection",
        trackingNumber: "TRK-10002",
        origin: "Takoradi, Ghana",
        destination: "Tamale, Ghana",
        status: "pending",
        estimatedDelivery: "May 22, 2025",
      },
      {
        id: "3",
        description: "Books - Educational",
        trackingNumber: "TRK-10003",
        origin: "Cape Coast, Ghana",
        destination: "New York, USA",
        status: "processing",
        estimatedDelivery: "May 23, 2025",
      },
      {
        id: "4",
        description: "Furniture - Office Chair",
        trackingNumber: "TRK-10004",
        origin: "Tema, Ghana",
        destination: "Ho, Ghana",
        status: "delayed",
        estimatedDelivery: "May 25, 2025",
      },
      {
        id: "5",
        description: "Food - Non-perishable",
        trackingNumber: "TRK-10005",
        origin: "Koforidua, Ghana",
        destination: "Berlin, Germany",
        status: "in-transit",
        estimatedDelivery: "May 21, 2025",
      },
      {
        id: "6",
        description: "Medical Supplies",
        trackingNumber: "TRK-10006",
        origin: "Wa, Ghana",
        destination: "Dambai, Ghana",
        status: "pending",
        estimatedDelivery: "May 24, 2025",
      },
      {
        id: "7",
        description: "Machinery Parts",
        trackingNumber: "TRK-10007",
        origin: "Sefwi Wiawso, Ghana",
        destination: "Dubai, UAE",
        status: "processing",
        estimatedDelivery: "May 26, 2025",
      },
    ];
    setShipments(dummyShipments);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4 dark:text-gray-200">Awaiting Shipments</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by tracking number, description, origin, destination..."
          className="w-full md:w-1/2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 transition-all"
        />
        <StatusFilter
          value={status}
          onChange={e => setStatus(e.target.value)}
          options={STATUS_OPTIONS}
          className="w-full md:w-1/4 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-700 transition-all"
        />
      </div>
      {filteredShipments.length > 0 ? (
        <ShipmentList shipments={filteredShipments} emptyMessage="No awaiting shipments found." />
      ) : (
        <p>No awaiting shipments found.</p>
      )}
    </div>
  );
};

export default PastShipments;
