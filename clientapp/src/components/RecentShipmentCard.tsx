import React from "react";
import { Package, Clock, AlertCircle, CheckCircle, Truck } from "lucide-react";
import { Link } from "react-router-dom";

interface ShipmentStatus {
	id: string;
	trackingNumber: string;
	origin: string;
	destination: string;
	status: "in-transit" | "delivered" | "delayed" | "processing";
	estimatedDelivery: string;
	updatedAt: string;
}

interface RecentShipmentCardProps {
	shipment: ShipmentStatus;
}

const statusIcons = {
	"in-transit": <Truck size={16} className="text-blue-500" />,
	"delivered": <CheckCircle size={16} className="text-green-500" />,
	"delayed": <AlertCircle size={16} className="text-amber-500" />,
	"processing": <Clock size={16} className="text-purple-500" />
};

const statusLabels = {
	"in-transit": "In Transit",
	"delivered": "Delivered",
	"delayed": "Delayed",
	"processing": "Processing"
};

const statusColors = {
	"in-transit": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
	"delivered": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
	"delayed": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
	"processing": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
};

const RecentShipmentCard: React.FC<RecentShipmentCardProps> = ({ shipment }) => {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4 transition-all hover:shadow-md">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center space-x-2">
					<Package size={18} className="text-gray-400 dark:text-gray-500" />
					<span className="font-medium text-sm text-gray-800 dark:text-gray-200">
						{shipment.trackingNumber}
					</span>
				</div>
				<div>
					<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[shipment.status]}`}>
						{statusIcons[shipment.status]}
						<span className="ml-1">{statusLabels[shipment.status]}</span>
					</span>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-start text-sm">
					<div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">From:</div>
					<div className="text-gray-900 dark:text-gray-100 font-medium">{shipment.origin}</div>
				</div>
				<div className="flex items-start text-sm">
					<div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">To:</div>
					<div className="text-gray-900 dark:text-gray-100 font-medium">{shipment.destination}</div>
				</div>
				<div className="flex items-start text-sm">
					<div className="w-24 flex-shrink-0 text-gray-500 dark:text-gray-400">Delivery:</div>
					<div className="text-gray-900 dark:text-gray-100 font-medium">{shipment.estimatedDelivery}</div>
				</div>
			</div>

			<div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
				<div className="flex items-center justify-between text-xs">
					<span className="text-gray-500 dark:text-gray-400 flex items-center">
						<Clock size={14} className="mr-1" />
						Updated {shipment.updatedAt}
					</span>
					<Link
						to={`/shipments/${shipment.id}`}
						className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
					>
						Track Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RecentShipmentCard;