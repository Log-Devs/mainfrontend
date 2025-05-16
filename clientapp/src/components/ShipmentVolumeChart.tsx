import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface VolumeData {
	labels: string[];
	current: number[];
	previous: number[];
}

interface ShipmentVolumeChartProps {
	data: VolumeData;
	title?: string;
	period?: string;
}

const ShipmentVolumeChart: React.FC<ShipmentVolumeChartProps> = ({
	data,
	title = "Shipment Volume Trend",
	period = "Last 30 Days"
}) => {
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
				const isDarkMode = document.documentElement.classList.contains('dark');
				const gridColor = isDarkMode ? 'rgba(75, 85, 99, 0.2)' : 'rgba(229, 231, 235, 0.6)';
				const textColor = isDarkMode ? '#D1D5DB' : '#4B5563';

				chartInstance.current = new Chart(ctx, {
					type: "line",
					data: {
						labels: data.labels,
						datasets: [
							{
								label: "Current Period",
								data: data.current,
								borderColor: "#3B82F6", // blue
								backgroundColor: "rgba(59, 130, 246, 0.1)",
								borderWidth: 2,
								tension: 0.4,
								fill: true,
								pointRadius: 1,
								pointHoverRadius: 5,
								pointHoverBackgroundColor: "#3B82F6",
							},
							{
								label: "Previous Period",
								data: data.previous,
								borderColor: "#9CA3AF", // gray
								backgroundColor: "rgba(156, 163, 175, 0.1)",
								borderWidth: 2,
								borderDash: [5, 5],
								tension: 0.4,
								fill: true,
								pointRadius: 0,
								pointHoverRadius: 4,
								pointHoverBackgroundColor: "#9CA3AF",
							}
						],
					},
					options: {
						responsive: true,
						maintainAspectRatio: false,
						interaction: {
							mode: 'index',
							intersect: false,
						},
						plugins: {
							legend: {
								position: "top",
								align: "end",
								labels: {
									boxWidth: 10,
									usePointStyle: true,
									color: textColor,
									font: {
										size: 11,
									}
								},
							},
							tooltip: {
								backgroundColor: isDarkMode ? '#1F2937' : 'white',
								titleColor: isDarkMode ? '#F9FAFB' : '#111827',
								bodyColor: textColor,
								borderColor: isDarkMode ? '#374151' : '#E5E7EB',
								borderWidth: 1,
								padding: 10,
								displayColors: true,
								usePointStyle: true,
							},
						},
						scales: {
							x: {
								grid: {
									display: false,
								},
								ticks: {
									color: textColor,
									font: {
										size: 10,
									},
									maxRotation: 0,
								},
							},
							y: {
								beginAtZero: true,
								grid: {
									color: gridColor,
								},
								ticks: {
									color: textColor,
									font: {
										size: 11,
									},
									padding: 8,
								},
							},
						},
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
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-4">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-base font-medium text-gray-700 dark:text-gray-300">{title}</h3>
				<span className="text-xs text-gray-500 dark:text-gray-400">{period}</span>
			</div>
			<div className="h-64">
				<canvas ref={chartRef}></canvas>
			</div>
		</div>
	);
};

export default ShipmentVolumeChart;