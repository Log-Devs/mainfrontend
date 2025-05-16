import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface ShipmentStatusData {
	delivered: number;
	inTransit: number;
	processing: number;
	delayed: number;
}

interface ShipmentStatusChartProps {
	data: ShipmentStatusData;
}

const ShipmentStatusChart: React.FC<ShipmentStatusChartProps> = ({ data }) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	const chartInstance = useRef<Chart | null>(null);

	useEffect(() => {
		if (chartRef.current) {
			// Destroy previous chart instance if it exists
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}

			const ctx = chartRef.current.getContext("2d");
			if (ctx) {
				chartInstance.current = new Chart(ctx, {
					type: "doughnut",
					data: {
						labels: ["Delivered", "In Transit", "Processing", "Delayed"],
						datasets: [
							{
								data: [
									data.delivered,
									data.inTransit,
									data.processing,
									data.delayed
								],
								backgroundColor: [
									"#10B981", // green for delivered
									"#3B82F6", // blue for in transit
									"#8B5CF6", // purple for processing
									"#F59E0B", // amber for delayed
								],
								borderColor: [
									"#065F46",
									"#1E40AF",
									"#5B21B6",
									"#B45309",
								],
								borderWidth: 1,
								hoverOffset: 4,
							},
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						plugins: {
							legend: {
								position: "bottom",
								labels: {
									usePointStyle: true,
									boxWidth: 8,
									color: document.documentElement.classList.contains('dark') ? '#D1D5DB' : '#4B5563',
								},
							},
							tooltip: {
								backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : 'white',
								titleColor: document.documentElement.classList.contains('dark') ? 'white' : '#1F2937',
								bodyColor: document.documentElement.classList.contains('dark') ? '#D1D5DB' : '#4B5563',
								borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
								borderWidth: 1,
								padding: 12,
								displayColors: true,
								usePointStyle: true,
								titleFont: {
									size: 14,
									weight: 'bold'
								},
							},
						},
						cutout: '65%',
					},
				});
			}
		}

		// Clean up on unmount
		return () => {
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [data]);

	return (
		<div className="relative h-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
			<h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Shipment Status Overview</h3>
			<div className="h-52">
				<canvas ref={chartRef}></canvas>
			</div>
		</div>
	);
};

export default ShipmentStatusChart;