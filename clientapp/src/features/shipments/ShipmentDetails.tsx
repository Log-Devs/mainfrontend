import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
	Package,
	MapPin,
	Calendar,
	Clock,
	Truck,
	ArrowRight,
	CheckCircle,
	AlertCircle,
	User,
	Building,
	PhoneCall,
	Mail,
	FileText,
	BarChart4
} from "lucide-react";

// Define shipment status types
type ShipmentStatus =
	| "PENDING"
	| "RECEIVED"
	| "IN_TRANSIT"
	| "ARRIVED_AT_DESTINATION"
	| "READY_FOR_PICKUP"
	| "OUT_FOR_DELIVERY"
	| "DELIVERED"
	| "DELAYED"
	| "EXCEPTION";

// Define the location stage for the progress tracker
type LocationStage = "sender" | "local_warehouse" | "foreign_warehouse" | "recipient";

interface ShipmentDetail {
	id: string;
	trackingNumber: string;
	status: ShipmentStatus;
	currentLocation: LocationStage;
	senderName: string;
	senderAddress: string;
	senderContact: string;
	recipientName: string;
	recipientAddress: string;
	recipientContact: string;
	packageDetails: {
		weight: number;
		dimensions: string;
		items: number;
		description: string;
	};
	dates: {
		created: string;
		updated: string;
		estimatedDelivery: string;
		actualDelivery?: string;
	};
	history: Array<{
		status: ShipmentStatus;
		timestamp: string;
		location: string;
		description: string;
	}>;
}

const ShipmentDetails = () => {
	const { id } = useParams<{ id: string }>();
	const [shipment, setShipment] = useState<ShipmentDetail | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate API call to get shipment details
		setTimeout(() => {
			// This would be an API call in a real application
			// const fetchShipment = async () => {
			//   const response = await fetch(`/api/shipments/${id}`);
			//   const data = await response.json();
			//   setShipment(data);
			//   setLoading(false);
			// };
			// fetchShipment();

			// Mock data for demonstration
			const mockShipment: ShipmentDetail = {
				id: id || "1",
				trackingNumber: `TRK-${id}` || "TRK-12345678",
				status: "IN_TRANSIT", // Default status
				currentLocation: "local_warehouse",
				senderName: "John Smith",
				senderAddress: "123 Main St, New York, NY 10001, USA",
				senderContact: "+1 (555) 123-4567",
				recipientName: "Jane Doe",
				recipientAddress: "456 Market St, San Francisco, CA 94105, USA",
				recipientContact: "+1 (555) 987-6543",
				packageDetails: {
					weight: 2.5,
					dimensions: "30cm × 20cm × 15cm",
					items: 1,
					description: "Electronics - Personal Computer"
				},
				dates: {
					created: "May 12, 2025",
					updated: "May 16, 2025",
					estimatedDelivery: "May 22, 2025"
				},
				history: [
					{
						status: "PENDING",
						timestamp: "May 12, 2025, 10:30 AM",
						location: "Online System",
						description: "Shipment created and pending pickup"
					},
					{
						status: "RECEIVED",
						timestamp: "May 13, 2025, 2:15 PM",
						location: "New York Warehouse",
						description: "Package received at local warehouse and processed"
					},
					{
						status: "IN_TRANSIT",
						timestamp: "May 14, 2025, 8:45 AM",
						location: "New York",
						description: "Package in transit to international shipping hub"
					},
					{
						status: "IN_TRANSIT",
						timestamp: "May 16, 2025, 9:20 AM",
						location: "International Waters",
						description: "Package en route to destination country"
					}
				]
			};

			setShipment(mockShipment);
			setLoading(false);
		}, 1000);
	}, [id]);

	const getStatusColor = (status: ShipmentStatus) => {
		switch (status) {
			case "DELIVERED":
				return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
			case "IN_TRANSIT":
				return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
			case "PENDING":
				return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
			case "DELAYED":
			case "EXCEPTION":
				return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
			case "RECEIVED":
			case "ARRIVED_AT_DESTINATION":
			case "READY_FOR_PICKUP":
				return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
			case "OUT_FOR_DELIVERY":
				return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300";
			default:
				return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
		}
	};

	const getStatusLabel = (status: ShipmentStatus) => {
		switch (status) {
			case "PENDING": return "Pending";
			case "RECEIVED": return "Received";
			case "IN_TRANSIT": return "In Transit";
			case "ARRIVED_AT_DESTINATION": return "Arrived at Destination";
			case "READY_FOR_PICKUP": return "Ready for Pickup";
			case "OUT_FOR_DELIVERY": return "Out for Delivery";
			case "DELIVERED": return "Delivered";
			case "DELAYED": return "Delayed";
			case "EXCEPTION": return "Exception";
			default: return status;
		}
	};

	const getProgressSteps = () => {
		const steps = [
			{ name: "Sender", stage: "sender", icon: <User size={20} /> },
			{ name: "Origin Warehouse", stage: "local_warehouse", icon: <Building size={20} /> },
			{ name: "Destination Warehouse", stage: "foreign_warehouse", icon: <Building size={20} /> },
			{ name: "Recipient", stage: "recipient", icon: <User size={20} /> }
		];

		// Determine current progress stage index
		let currentStageIndex = 0;
		switch (shipment?.currentLocation) {
			case "sender": currentStageIndex = 0; break;
			case "local_warehouse": currentStageIndex = 1; break;
			case "foreign_warehouse": currentStageIndex = 2; break;
			case "recipient": currentStageIndex = 3; break;
			default: currentStageIndex = 0;
		}

		return { steps, currentStageIndex };
	};

	if (loading) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
			</div>
		);
	}

	if (!shipment) {
		return (
			<div className="flex flex-col items-center justify-center h-96">
				<AlertCircle size={48} className="text-red-500 mb-4" />
				<h2 className="text-xl font-semibold mb-2">Shipment Not Found</h2>
				<p className="text-gray-500 dark:text-gray-400 mb-4">The shipment you're looking for doesn't exist or has been removed.</p>
				<Link
					to="/dashboard"
					className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
				>
					Return to Dashboard
				</Link>
			</div>
		);
	}

	const { steps, currentStageIndex } = getProgressSteps();

	return (
		<div className="space-y-8 pb-10">
			{/* Breadcrumb and back link */}
			<div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-2">
				<Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">Dashboard</Link>
				<span>/</span>
				<Link to="/shipments" className="hover:text-blue-600 dark:hover:text-blue-400">Shipments</Link>
				<span>/</span>
				<span className="text-gray-900 dark:text-gray-200 font-medium">Tracking Details</span>
			</div>

			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold mb-1">Shipment Tracking</h1>
					<div className="flex items-center space-x-2">
						<span className="text-gray-500 dark:text-gray-400">Tracking Number:</span>
						<span className="font-medium">{shipment.trackingNumber}</span>
					</div>
				</div>

				<div className={`inline-flex items-center px-3 py-2 rounded-lg ${getStatusColor(shipment.status)}`}>
					{shipment.status === "IN_TRANSIT" && <Truck size={18} className="mr-2" />}
					{shipment.status === "DELIVERED" && <CheckCircle size={18} className="mr-2" />}
					{shipment.status === "DELAYED" && <AlertCircle size={18} className="mr-2" />}
					{shipment.status === "PENDING" && <Clock size={18} className="mr-2" />}
					<span className="font-medium">{getStatusLabel(shipment.status)}</span>
				</div>
			</div>

			{/* Live tracking indicator */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-4">Live Location Tracking</h2>
					<div className="relative">
						{/* Progress bar */}
						<div className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 bg-gray-200 dark:bg-gray-700"></div>

						{/* Progress indicator */}
						<div
							className="absolute top-1/2 left-0 h-1 -translate-y-1/2 bg-blue-600 dark:bg-blue-500 transition-all duration-500"
							style={{ width: `${(currentStageIndex / (steps.length - 1)) * 100}%` }}
						></div>

						{/* Steps */}
						<div className="relative flex justify-between">
							{steps.map((step, index) => {
								const isActive = index <= currentStageIndex;
								const isCurrent = index === currentStageIndex;

								return (
									<div key={step.stage} className="flex flex-col items-center">
										{/* Step indicator */}
										<div
											className={`
                        flex items-center justify-center w-12 h-12 rounded-full z-10
                        ${isCurrent
													? 'bg-blue-600 dark:bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30'
													: isActive
														? 'bg-green-600 dark:bg-green-500 text-white'
														: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
												}
                      `}
										>
											{step.icon}
										</div>

										{/* Step label */}
										<div className="mt-3 text-sm font-medium text-center">
											<span className={isCurrent ? "text-blue-600 dark:text-blue-400" : ""}>
												{step.name}
											</span>
											{isCurrent && (
												<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
													Current Location
												</p>
											)}
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>

				{/* Estimate */}
				<div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
					<div>
						<span className="block text-xs">Shipment Created</span>
						<span className="font-medium text-gray-900 dark:text-gray-100">{shipment.dates.created}</span>
					</div>
					<div className="text-center">
						<span className="block text-xs">Updated</span>
						<span className="font-medium text-gray-900 dark:text-gray-100">{shipment.dates.updated}</span>
					</div>
					<div className="text-right">
						<span className="block text-xs">Estimated Delivery</span>
						<span className="font-medium text-gray-900 dark:text-gray-100">{shipment.dates.estimatedDelivery}</span>
					</div>
				</div>
			</div>

			{/* Shipment details grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* Sender details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
					<div className="flex items-center mb-4">
						<div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3">
							<User size={20} />
						</div>
						<h2 className="text-lg font-semibold">Sender Details</h2>
					</div>

					<div className="space-y-3">
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
							<div className="font-medium">{shipment.senderName}</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Address</div>
							<div className="font-medium">{shipment.senderAddress}</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Contact</div>
							<div className="font-medium">{shipment.senderContact}</div>
						</div>
					</div>
				</div>

				{/* Recipient details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
					<div className="flex items-center mb-4">
						<div className="p-2 rounded-md bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3">
							<MapPin size={20} />
						</div>
						<h2 className="text-lg font-semibold">Recipient Details</h2>
					</div>

					<div className="space-y-3">
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
							<div className="font-medium">{shipment.recipientName}</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Address</div>
							<div className="font-medium">{shipment.recipientAddress}</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Contact</div>
							<div className="font-medium">{shipment.recipientContact}</div>
						</div>
					</div>
				</div>

				{/* Package details */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
					<div className="flex items-center mb-4">
						<div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3">
							<Package size={20} />
						</div>
						<h2 className="text-lg font-semibold">Package Details</h2>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Weight</div>
							<div className="font-medium">{shipment.packageDetails.weight} kg</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Dimensions</div>
							<div className="font-medium">{shipment.packageDetails.dimensions}</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Items</div>
							<div className="font-medium">{shipment.packageDetails.items}</div>
						</div>
						<div>
							<div className="text-sm text-gray-500 dark:text-gray-400">Description</div>
							<div className="font-medium">{shipment.packageDetails.description}</div>
						</div>
					</div>
				</div>

				{/* Support section */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
					<div className="flex items-center mb-4">
						<div className="p-2 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mr-3">
							<PhoneCall size={20} />
						</div>
						<h2 className="text-lg font-semibold">Support</h2>
					</div>

					<div className="space-y-3">
						<div className="flex items-center">
							<PhoneCall size={16} className="text-gray-400 mr-2" />
							<span>+1 (800) 123-4567</span>
						</div>
						<div className="flex items-center">
							<Mail size={16} className="text-gray-400 mr-2" />
							<span>support@logisticscompany.com</span>
						</div>
						<div className="mt-4">
							<button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
								Report an Issue
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Tracking history */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
				<div className="flex items-center mb-6">
					<div className="p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mr-3">
						<BarChart4 size={20} />
					</div>
					<h2 className="text-lg font-semibold">Tracking History</h2>
				</div>

				<div className="space-y-6">
					{shipment.history.map((event, index) => (
						<div key={index} className="relative pl-8">
							{/* Timeline connector */}
							{index < shipment.history.length - 1 && (
								<div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
							)}

							{/* Status indicator */}
							<div className={`
                absolute left-0 top-1 w-[22px] h-[22px] rounded-full border-4 
                ${index === 0 ? 'border-blue-600 bg-blue-100 dark:border-blue-500 dark:bg-blue-900/30' : 'border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-800'}
              `}></div>

							{/* Content */}
							<div>
								<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
									<h3 className="font-medium">{getStatusLabel(event.status)}</h3>
									<span className="text-sm text-gray-500 dark:text-gray-400">{event.timestamp}</span>
								</div>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{event.location}
								</p>
								<p className="text-sm">
									{event.description}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Actions */}
			<div className="flex flex-col sm:flex-row gap-4">
				<button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors flex-1 flex items-center justify-center">
					<FileText size={18} className="mr-2" />
					Download Label
				</button>
				<button className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-4 rounded-md transition-colors flex-1 flex items-center justify-center">
					<Mail size={18} className="mr-2" />
					Email Updates
				</button>
			</div>
		</div>
	);
};

export default ShipmentDetails;