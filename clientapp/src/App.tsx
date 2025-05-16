import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import axios from "axios"; // Uncomment when ready to use APIs
// import { fetchDashboardData, submitShipment, fetchHistory, fetchAwaitingShipments, updateSettings } from "./api"; // Example API imports
// API integration placeholders are marked throughout this file.
// See each section for where to add API calls in the future.
import "./App.css";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./features/dashboard/Dashboard";
import SubmitGoods from "./features/shipments/SubmitGoods";
import PastShipments from "./features/shipments/PastShipments";
import Profile from "./features/profile/Profile";
import ReportIssue from "./features/report/ReportIssue";

function AppRoutes() {
  const location = useLocation();
  // Extract the active key from the current path
  const pathToKey: Record<string, string> = {
    "/dashboard": "dashboard",
    "/submit": "submit",
    "/awaiting": "awaiting",
    "/history": "history",
    "/report": "report",
    "/settings": "settings",
  };
  const active = pathToKey[location.pathname] || "dashboard";

  return (
    <DashboardLayout active={active} setActive={() => { }}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/submit" element={<SubmitGoods />} />
        <Route path="/awaiting" element={<PastShipments />} />
        <Route path="/history" element={<PastShipments />} />
        <Route path="/settings" element={<Profile />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
}

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
