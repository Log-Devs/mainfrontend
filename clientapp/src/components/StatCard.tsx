import React from "react";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface StatCardProps {
	title: string;
	value: string | number;
	icon: React.ReactNode;
	change?: number;
	trend?: "up" | "down" | "neutral";
	description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
	title,
	value,
	icon,
	change,
	trend = "neutral",
	description,
}) => {
	return (
		<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-all hover:shadow-lg border border-gray-100 dark:border-gray-700">
			<div className="flex items-center justify-between">
				<h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
				<div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
					{icon}
				</div>
			</div>

			<div className="mt-2 flex items-baseline">
				<p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>

				{change !== undefined && (
					<span className={`ml-2 flex items-center text-sm font-medium 
            ${trend === "up" ? "text-green-600 dark:text-green-400" :
							trend === "down" ? "text-red-600 dark:text-red-400" :
								"text-gray-500 dark:text-gray-400"}`}>
						{trend === "up" && <ArrowUpIcon className="h-4 w-4 mr-0.5 flex-shrink-0" />}
						{trend === "down" && <ArrowDownIcon className="h-4 w-4 mr-0.5 flex-shrink-0" />}
						{change}%
					</span>
				)}
			</div>

			{description && (
				<p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
			)}
		</div>
	);
};

export default StatCard;