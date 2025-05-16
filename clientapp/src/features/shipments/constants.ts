// Package category types with associated colors
export const PACKAGE_CATEGORIES = [
	{
		id: "fragile",
		label: "Fragile",
		description: "Easily broken items requiring careful handling",
		color: "#EF4444", // red
		bgColor: "bg-red-100",
		textColor: "text-red-800",
		darkBgColor: "dark:bg-red-900/30",
		darkTextColor: "dark:text-red-300"
	},
	{
		id: "electronics",
		label: "Electronics",
		description: "Electronic devices and components",
		color: "#3B82F6", // blue
		bgColor: "bg-blue-100",
		textColor: "text-blue-800",
		darkBgColor: "dark:bg-blue-900/30",
		darkTextColor: "dark:text-blue-300"
	},
	{
		id: "perishable",
		label: "Perishable",
		description: "Items that can expire or spoil",
		color: "#10B981", // green
		bgColor: "bg-green-100",
		textColor: "text-green-800",
		darkBgColor: "dark:bg-green-900/30",
		darkTextColor: "dark:text-green-300"
	},
	{
		id: "food",
		label: "Food",
		description: "Food items (non-perishable)",
		color: "#F59E0B", // amber
		bgColor: "bg-amber-100",
		textColor: "text-amber-800",
		darkBgColor: "dark:bg-amber-900/30",
		darkTextColor: "dark:text-amber-300"
	},
	{
		id: "documents",
		label: "Documents",
		description: "Important papers and documents",
		color: "#6366F1", // indigo
		bgColor: "bg-indigo-100",
		textColor: "text-indigo-800",
		darkBgColor: "dark:bg-indigo-900/30",
		darkTextColor: "dark:text-indigo-300"
	},
	{
		id: "clothing",
		label: "Clothing",
		description: "Apparel and textile items",
		color: "#8B5CF6", // purple
		bgColor: "bg-purple-100",
		textColor: "text-purple-800",
		darkBgColor: "dark:bg-purple-900/30",
		darkTextColor: "dark:text-purple-300"
	},
	{
		id: "liquid",
		label: "Liquid",
		description: "Non-hazardous liquids",
		color: "#06B6D4", // cyan
		bgColor: "bg-cyan-100",
		textColor: "text-cyan-800",
		darkBgColor: "dark:bg-cyan-900/30",
		darkTextColor: "dark:text-cyan-300"
	},
	{
		id: "heavy",
		label: "Heavy",
		description: "Items exceeding standard weight limits",
		color: "#78716C", // stone
		bgColor: "bg-stone-100",
		textColor: "text-stone-800",
		darkBgColor: "dark:bg-stone-900/30",
		darkTextColor: "dark:text-stone-300"
	},
	{
		id: "other",
		label: "Other",
		description: "Other types of items",
		color: "#64748B", // slate
		bgColor: "bg-slate-100",
		textColor: "text-slate-800",
		darkBgColor: "dark:bg-slate-900/30",
		darkTextColor: "dark:text-slate-300"
	}
];

// Freight types
export const FREIGHT_TYPES = [
	{ id: "air", label: "Air Freight", description: "Fastest shipping option via air" },
	{ id: "sea", label: "Sea Freight", description: "Cost-effective shipping via ocean" },
	{ id: "road", label: "Road Transport", description: "Shipping via trucks and roads" },
	{ id: "rail", label: "Rail Transport", description: "Shipping via railway systems" },
	{ id: "multimodal", label: "Multimodal", description: "Combination of different transport modes" }
];

// Package types
export const PACKAGE_TYPES = [
	{ id: "box", label: "Box", description: "Standard cardboard box" },
	{ id: "envelope", label: "Envelope", description: "Document envelope" },
	{ id: "pallet", label: "Pallet", description: "Palletized goods" },
	{ id: "crate", label: "Crate", description: "Wooden crate" },
	{ id: "tube", label: "Tube", description: "Cylindrical tube container" },
	{ id: "custom", label: "Custom Packaging", description: "Special packaging requirements" }
];

// Ghana regions
export const GHANA_REGIONS = [
	{ id: "ashanti", name: "Ashanti Region" },
	{ id: "brong-ahafo", name: "Brong-Ahafo Region" },
	{ id: "central", name: "Central Region" },
	{ id: "eastern", name: "Eastern Region" },
	{ id: "greater-accra", name: "Greater Accra Region" },
	{ id: "northern", name: "Northern Region" },
	{ id: "upper-east", name: "Upper East Region" },
	{ id: "upper-west", name: "Upper West Region" },
	{ id: "volta", name: "Volta Region" },
	{ id: "western", name: "Western Region" },
	{ id: "western-north", name: "Western North Region" },
	{ id: "ahafo", name: "Ahafo Region" },
	{ id: "bono-east", name: "Bono East Region" },
	{ id: "north-east", name: "North East Region" },
	{ id: "oti", name: "Oti Region" },
	{ id: "savannah", name: "Savannah Region" }
];
// Define and export initialFormData
export const initialFormData = {
	senderName: "",
	senderAddress: "",
	senderContact: "",
	senderEmail: "",
	senderPhone: "",
	senderCity: "",
	senderState: "",
	senderZip: "",
	senderCountry: "",
	recipientName: "",
	recipientAddress: "",
	recipientContact: "",
	recipientCountry: "",
	recipientPhoneCountryCode: "",
	recipientId: "",
	recipientKnowsId: false,
	packageType: "",
	packageCategory: "",
	packageWeight: "",
	packageDescription: "",
	freightType: "",
	// Add more fields as needed for your forms
};