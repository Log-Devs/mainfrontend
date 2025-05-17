import ShipmentsPage from "./ShipmentsPage";

const AwaitingShipments = () => {
  // Awaiting = not delivered
  const awaitingStatuses = ["pending", "in-transit", "processing", "delayed"];
  return (
    <ShipmentsPage
      title="Awaiting Shipments"
      filterStatus={awaitingStatuses}
      emptyMessage="No awaiting shipments found."
    />
  );
};

export default AwaitingShipments;
