import { useEffect, useState } from "react";
// import axios from "axios"; // Uncomment when ready to use APIs
import { Package, Truck, Clock, MapPin } from "lucide-react";

import { LEGAL_COMPANY_NAME } from "../../app-config";
import StatCard from "../../components/StatCard";
import ShipmentVolumeChart from "../../components/ShipmentVolumeChart";
import ShipmentStatusChart from "../../components/ShipmentStatusChart";
import RecentShipmentCard from "../../components/RecentShipmentCard";

// Define types for our data
interface ShipmentStatus {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: "in-transit" | "delivered" | "delayed" | "processing";
  estimatedDelivery: string;
  updatedAt: string;
}

interface VolumeData {
  labels: string[];
  current: number[];
  previous: number[];
}

interface StatusData {
  delivered: number;
  inTransit: number;
  processing: number;
  delayed: number;
}

const Dashboard = () => {
  // Mock data for demonstration
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeShipments: 0,
    deliveredThisMonth: 0,
    averageDeliveryTime: 0,
    customerSatisfaction: 0,
    totalDistance: 0
  });
  const [volumeData, setVolumeData] = useState<VolumeData>({
    labels: [],
    current: [],
    previous: []
  });
  const [statusData, setStatusData] = useState<StatusData>({
    delivered: 0,
    inTransit: 0,
    processing: 0,
    delayed: 0
  });
  const [recentShipments, setRecentShipments] = useState<ShipmentStatus[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Stats data for a normal user with fewer shipments
      setStats({
        activeShipments: 2,
        deliveredThisMonth: 4,
        averageDeliveryTime: 3.2,
        customerSatisfaction: 95,
        totalDistance: 3870
      });

      // Volume chart data adjusted for fewer shipments
      setVolumeData({
        labels: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12', 'Feb 19', 'Feb 26', 'Mar 5', 'Mar 12', 'Mar 19'],
        current: [0, 1, 0, 2, 1, 0, 1, 2, 1, 0, 1, 2],
        previous: [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0]
      });

      // Status chart data adjusted for fewer shipments
      setStatusData({
        delivered: 4,
        inTransit: 1,
        processing: 1,
        delayed: 0
      });

      // Recent shipments data - only a few for a normal user
      setRecentShipments([
        {
          id: '1',
          trackingNumber: 'TRK-12345678',
          origin: 'New York, NY',
          destination: 'Los Angeles, CA',
          status: 'in-transit',
          estimatedDelivery: 'May 18, 2025',
          updatedAt: '3 hours ago'
        },
        {
          id: '2',
          trackingNumber: 'TRK-87654321',
          origin: 'Chicago, IL',
          destination: 'Miami, FL',
          status: 'delivered',
          estimatedDelivery: 'May 12, 2025',
          updatedAt: '2 days ago'
        },
        {
          id: '3',
          trackingNumber: 'TRK-45678901',
          origin: 'Seattle, WA',
          destination: 'Austin, TX',
          status: 'processing',
          estimatedDelivery: 'May 20, 2025',
          updatedAt: '6 hours ago'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <div>
        <h1 className="text-2xl font-bold mb-1 text-gray-800 dark:text-gray-200">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome to your shipment dashboard at {LEGAL_COMPANY_NAME}
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Shipments"
          value={stats.activeShipments}
          icon={<Package size={20} />}
          trend="neutral"
          description="Currently in transit"
        />
        <StatCard
          title="Delivered This Month"
          value={stats.deliveredThisMonth}
          icon={<Truck size={20} />}
          trend="up"
          change={2}
          description="Successfully delivered"
        />
        <StatCard
          title="Avg. Delivery Time"
          value={`${stats.averageDeliveryTime} days`}
          icon={<Clock size={20} />}
          trend="neutral"
          description="Average transit time"
        />
        <StatCard
          title="Total Distance"
          value={`${stats.totalDistance.toLocaleString()} km`}
          icon={<MapPin size={20} />}
          description="Total shipping distance"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ShipmentVolumeChart
            data={volumeData}
            title="Your Shipment Activity"
            period="Last 12 Weeks"
          />
        </div>
        <div>
          <ShipmentStatusChart data={statusData} />
        </div>
      </div>

      {/* Recent shipments */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Recent Shipments</h2>
          <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            View All Shipments
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-gray-800 dark:text-gray-200">
          {recentShipments.map((shipment) => (
            <RecentShipmentCard key={shipment.id} shipment={shipment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
