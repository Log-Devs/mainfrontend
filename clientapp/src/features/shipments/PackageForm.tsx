import React from "react";
import PropTypes from "prop-types";
import {
	FaBox,
	FaTruck,
	FaLayerGroup,
	FaFileAlt,
	FaStickyNote,
	FaInfoCircle
} from "react-icons/fa";

// You'll need to define these constants in your actual implementation
const FREIGHT_TYPES = [
	{ id: "ground", label: "Ground" },
	{ id: "air", label: "Air" },
	{ id: "sea", label: "Sea" },
	{ id: "express", label: "Express" }
];

const PACKAGE_TYPES = [
	{ id: "box", label: "Box" },
	{ id: "envelope", label: "Envelope" },
	{ id: "pallet", label: "Pallet" },
	{ id: "tube", label: "Tube" }
];

const PACKAGE_CATEGORIES = [
	{
		id: "electronics",
		label: "Electronics",
		bgColor: "bg-blue-100",
		textColor: "text-blue-800",
		darkBgColor: "dark:bg-blue-900/30",
		darkTextColor: "dark:text-blue-300"
	},
	{
		id: "fragile",
		label: "Fragile",
		bgColor: "bg-red-100",
		textColor: "text-red-800",
		darkBgColor: "dark:bg-red-900/30",
		darkTextColor: "dark:text-red-300"
	},
	{
		id: "documents",
		label: "Documents",
		bgColor: "bg-yellow-100",
		textColor: "text-yellow-800",
		darkBgColor: "dark:bg-yellow-900/30",
		darkTextColor: "dark:text-yellow-300"
	},
	{
		id: "perishable",
		label: "Perishable",
		bgColor: "bg-green-100",
		textColor: "text-green-800",
		darkBgColor: "dark:bg-green-900/30",
		darkTextColor: "dark:text-green-300"
	}
];

interface PackageFormProps {
	formData: {
		freightType: string;
		packageType: string;
		packageCategory: string;
		packageDescription: string;
		packageNote: string;
	};
	onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	onPackageNoteChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const PackageForm = ({ formData, onInputChange, onPackageNoteChange }: PackageFormProps) => (
	<section className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 transition-colors duration-200 overflow-hidden">
		{/* Header */}
		<div className="bg-gradient-to-r from-navy-700 to-navy-900 text-white p-6">
			<h2 className="text-2xl font-bold flex items-center gap-2">
				<FaBox className="text-yellow-500" /> Package Details
			</h2>
			<p className="text-gray-200 mt-1 text-sm">
				Please provide accurate information about your package
			</p>
		</div>

		{/* Form Content */}
		<div className="p-6 space-y-6">
			<div className="space-y-2">
				<label htmlFor="freightType" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
					<FaTruck className="mr-2 text-navy-600 dark:text-navy-400" />
					Freight Type <span className="text-red-500 ml-1">*</span>
				</label>
				<select
					id="freightType"
					name="freightType"
					value={formData.freightType || ""}
					onChange={onInputChange}
					className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
					required
				>
					<option value="">Select freight type</option>
					{FREIGHT_TYPES.map(type => (
						<option key={type.id} value={type.id}>{type.label}</option>
					))}
				</select>
			</div>

			<div className="space-y-2">
				<label htmlFor="packageType" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
					<FaBox className="mr-2 text-navy-600 dark:text-navy-400" />
					Package Type <span className="text-red-500 ml-1">*</span>
				</label>
				<select
					id="packageType"
					name="packageType"
					value={formData.packageType || ""}
					onChange={onInputChange}
					className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
					required
				>
					<option value="">Select package type</option>
					{PACKAGE_TYPES.map(type => (
						<option key={type.id} value={type.id}>{type.label}</option>
					))}
				</select>
			</div>

			<div className="space-y-2">
				<label htmlFor="packageCategory" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
					<FaLayerGroup className="mr-2 text-navy-600 dark:text-navy-400" />
					Description Type <span className="text-red-500 ml-1">*</span>
				</label>
				<select
					id="packageCategory"
					name="packageCategory"
					value={formData.packageCategory || ""}
					onChange={onInputChange}
					className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
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
				<label htmlFor="packageDescription" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
					<FaFileAlt className="mr-2 text-navy-600 dark:text-navy-400" />
					Package Description <span className="text-red-500 ml-1">*</span>
				</label>
				<textarea
					id="packageDescription"
					name="packageDescription"
					value={formData.packageDescription || ""}
					onChange={onInputChange}
					className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
					placeholder="Describe the package contents"
					rows={4}
					required
				/>
			</div>

			<div className="space-y-2">
				<label htmlFor="packageNote" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
					<FaStickyNote className="mr-2 text-navy-600 dark:text-navy-400" />
					Additional Note
				</label>
				<textarea
					id="packageNote"
					name="packageNote"
					value={formData.packageNote || ""}
					onChange={onPackageNoteChange}
					className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
					placeholder="Any extra information (optional)"
					rows={3}
				/>
			</div>
		</div>

		{/* Footer */}
		<div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
			<div className="text-xs text-gray-500 dark:text-gray-400">
				<span className="text-red-500">*</span> Required fields
			</div>
			<div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
				<FaInfoCircle className="text-navy-500" />
				Package details are used for shipping calculations
			</div>
		</div>
	</section>
);

PackageForm.propTypes = {
	formData: PropTypes.shape({
		freightType: PropTypes.string,
		packageType: PropTypes.string,
		packageCategory: PropTypes.string,
		packageDescription: PropTypes.string,
		packageNote: PropTypes.string,
	}).isRequired,
	onInputChange: PropTypes.func.isRequired,
	onPackageNoteChange: PropTypes.func.isRequired,
};

export default PackageForm;