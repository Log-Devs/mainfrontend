import React from "react";
import { FREIGHT_TYPES, PACKAGE_TYPES, PACKAGE_CATEGORIES } from "./constants";

interface PackageFormProps {
	formData: {
		freightType: string;
		packageType: string;
		packageCategory: string;
		packageDescription: string;
		packageNote: string;
	};
	onInputChange: (event: React.ChangeEvent<any>) => void;
}

const PackageForm = ({ formData, onInputChange }: PackageFormProps) => (
	<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 border border-gray-100 dark:border-gray-700">
		<h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Package Details</h2>
		<div className="space-y-2">
			<label htmlFor="freightType" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Freight Type *</label>
			<select
				id="freightType"
				name="freightType"
				value={formData.freightType || ""}
				onChange={onInputChange}
				className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
				required
			>
				<option value="">Select freight type</option>
				{FREIGHT_TYPES.map(type => (
					<option key={type.id} value={type.id}>{type.label}</option>
				))}
			</select>
		</div>
		<div className="space-y-2">
			<label htmlFor="packageType" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Package Type *</label>
			<select
				id="packageType"
				name="packageType"
				value={formData.packageType || ""}
				onChange={onInputChange}
				className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
				required
			>
				<option value="">Select package type</option>
				{PACKAGE_TYPES.map(type => (
					<option key={type.id} value={type.id}>{type.label}</option>
				))}
			</select>
		</div>
		<div className="space-y-2">
			<label htmlFor="packageCategory" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Description Type *</label>
			<select
				id="packageCategory"
				name="packageCategory"
				value={formData.packageCategory || ""}
				onChange={onInputChange}
				className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
				required
			>
				<option value="">Select description type</option>
				{PACKAGE_CATEGORIES.map(cat => (
					<option key={cat.id} value={cat.id}>{cat.label}</option>
				))}
			</select>
			{formData.packageCategory && (
				<div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold mt-1 ${PACKAGE_CATEGORIES.find(cat => cat.id === formData.packageCategory)?.bgColor} ${PACKAGE_CATEGORIES.find(cat => cat.id === formData.packageCategory)?.textColor} ${PACKAGE_CATEGORIES.find(cat => cat.id === formData.packageCategory)?.darkBgColor} ${PACKAGE_CATEGORIES.find(cat => cat.id === formData.packageCategory)?.darkTextColor}`}>
					{PACKAGE_CATEGORIES.find(cat => cat.id === formData.packageCategory)?.label}
				</div>
			)}
		</div>
		<div className="space-y-2">
			<label htmlFor="packageDescription" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Package Description *</label>
			<textarea
				id="packageDescription"
				name="packageDescription"
				value={formData.packageDescription || ""}
				onChange={onInputChange}
				className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
				placeholder="Describe the package contents"
				required
			/>
		</div>
		<div className="space-y-2">
			<label htmlFor="packageNote" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Additional Note</label>
			<textarea
				id="packageNote"
				name="packageNote"
				value={formData.packageNote || ""}
				onChange={onInputChange}
				className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
				placeholder="Any extra information (optional)"
			/>
		</div>
	</div>
);

export default PackageForm;
