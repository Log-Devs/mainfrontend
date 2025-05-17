import React from "react";
import RecentShipmentCard from "./RecentShipmentCard";

// Accepts a list of shipments and displays them using RecentShipmentCard
interface ShipmentListProps {
  shipments: Array<{
    id: string;
    trackingNumber?: string;
    origin?: string;
    destination?: string;
    status?: string;
    estimatedDelivery?: string;
    updatedAt?: string;
    description?: string;
    // Accepts extra fields for flexibility
    [key: string]: any;
  }>;
  emptyMessage?: string;
}

const ShipmentList: React.FC<ShipmentListProps> = ({ shipments, emptyMessage }) => {
  if (!shipments.length) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        {emptyMessage || "No shipments found."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {shipments.map((shipment) => (
        <RecentShipmentCard
          key={shipment.id}
          shipment={{
            ...shipment,
            trackingNumber: shipment.trackingNumber ?? "",
            origin: shipment.origin ?? "",
            destination: shipment.destination ?? "",
            status: (["in-transit", "delivered", "delayed", "processing"].includes(shipment.status ?? "")
              ? shipment.status
              : "processing") as "in-transit" | "delivered" | "delayed" | "processing",
            estimatedDelivery: shipment.estimatedDelivery ?? "",
            updatedAt: shipment.updatedAt ?? "",
          }}
        />
      ))}
    </div>
  );
};

export default ShipmentList;
