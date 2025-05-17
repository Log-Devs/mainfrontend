import ShipmentsPage from "./ShipmentsPage";

const ShippingHistory = () => {
  // History = delivered only
  return (
    <ShipmentsPage
      title="Shipping History"
      filterStatus={["delivered"]}
      emptyMessage="No shipping history found."
    />
  );
};

export default ShippingHistory;
