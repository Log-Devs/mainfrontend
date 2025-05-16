import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import NavBar from "../nav/NavBar";
import ContentArea from "./ContentArea";

const navItems = [
  { label: "Dashboard", key: "dashboard", path: "/dashboard" },
  { label: "Submit Shipment", key: "submit", path: "/submit" },
  { label: "Awaiting Shipments", key: "awaiting", path: "/awaiting" },
  { label: "Shipping History", key: "history", path: "/history" },
  { label: "Report Issue", key: "report", path: "/report" },
  { label: "Settings", key: "settings", path: "/settings" },
];

const DashboardLayout = ({
  active,
  setActive,
  children,
  unreadNotificationsCount, // Add this line
}: {
  active: string;
  setActive: (key: string) => void;
  children: React.ReactNode;
  unreadNotificationsCount: number; // Add this line
}) => {
  // Initialize collapsed state from localStorage
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sidebar-collapsed");
      // Default to collapsed on mobile if no preference is stored
      if (stored === null) {
        return window.innerWidth < 768;
      }
      return stored === "true";
    }
    return false;
  });

  // Track resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      // Just update the layout - actual sidebar state is persisted separately
      window.dispatchEvent(new Event('resize'));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex bg-white dark:bg-gray-950">
      <Sidebar
        navItems={navItems}
        active={active}
        setActive={setActive}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <main className="flex-1 flex flex-col">
        <NavBar hasNotifications={unreadNotificationsCount > 0} />
        <ContentArea>
          {/* Added responsive padding and margin-top */}
          <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto mt-4 md:mt-0">
            {children}
          </div>
        </ContentArea>
      </main>
    </div>
  );
};

export default DashboardLayout;