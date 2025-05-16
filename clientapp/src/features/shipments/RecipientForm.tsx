import React, { useState, useEffect } from "react";
// import { GHANA_REGIONS } from "./constants";

const COUNTRY_OPTIONS = [
	{ id: "ghana", name: "Ghana", code: "+233", icon: "🇬🇭" },
	{ id: "us", name: "United States", code: "+1", icon: "🇺🇸" },
];

const US_STATES = [
	"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const mockRecipientLookup = (id: string) => {
	// Simulate lookup. Replace with real API in production.
	if (id === "GH12345") return { name: "Kwame Nkrumah" };
	if (id === "US54321") return { name: "John Doe" };
	return null;
};

const RecipientForm = ({
	formData,
	onInputChange,
	addressLoading,
	addressError,
	onSuggestionSelect,
	suggestionIndex,
	highlightMatch
}: {
	formData: any;
	onInputChange: (e: React.ChangeEvent<any>) => void;
	onUsaAddressInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addressLoading: boolean;
	addressError: string | null;
	onSuggestionSelect: (suggestion: { id: string; label: string }) => void;
	suggestionIndex: number;
	highlightMatch: (suggestion: { id: string; label: string }, input: string) => React.ReactNode;
}) => {
	const [country, setCountry] = useState(formData.recipientCountry || "us");
	const [phoneCode, setPhoneCode] = useState("+1");
	const [recipientType, setRecipientType] = useState(formData.recipientType || "user");
	const [region, setRegion] = useState("");
	const [recipientId, setRecipientId] = useState(formData.recipientId || "");
	const [recipientName, setRecipientName] = useState(formData.recipientName || "");
	const [recipientPhone, setRecipientPhone] = useState(formData.recipientPhone || "");
	const [recipientAddress, setRecipientAddress] = useState(formData.recipientAddress || "");
	const [idLookupDone, setIdLookupDone] = useState(false);
	const [lookupResult, setLookupResult] = useState<any>(null);

	useEffect(() => {
		if (country === "ghana") setPhoneCode("+233");
		else setPhoneCode("+1");
	}, [country]);

	useEffect(() => {
		if (recipientType === "user" && recipientId && !idLookupDone) {
			const result = mockRecipientLookup(recipientId);
			if (result) {
				setRecipientName(result.name);
				setRecipientPhone(result.phone || "");
				setRecipientAddress(result.address || "");
				setCountry(result.country || country);
				setIdLookupDone(true);
				setLookupResult(result);
			} else {
				setRecipientName("");
				setRecipientPhone("");
				setRecipientAddress("");
				setIdLookupDone(false);
				setLookupResult(null);
			}
		}
		if (!recipientId) {
			setRecipientName("");
			setRecipientPhone("");
			setRecipientAddress("");
			setIdLookupDone(false);
			setLookupResult(null);
		}
	}, [recipientId, idLookupDone, recipientType]);

	const handleRecipientTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientType(e.target.value);
		setIdLookupDone(false);
		setRecipientId("");
		setRecipientName("");
		setRecipientPhone("");
		setRecipientAddress("");
		setLookupResult(null);
		onInputChange({ target: { name: "recipientType", value: e.target.value } } as React.ChangeEvent<HTMLInputElement>);
	};

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCountry(e.target.value);
		onInputChange({
			target: { name: "recipientCountry", value: e.target.value },
		} as React.ChangeEvent<HTMLSelectElement>);
	};

	<div className="space-y-2">
		<label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Country *</label>
		<select
			id="recipientCountry"
			name="recipientCountry"
			onChange={handleCountryChange}
			value={country}
			className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
		>
			{COUNTRY_OPTIONS.map(option => (
				<option key={option.id} value={option.id}>{option.name}</option>
			))}
		</select>
	</div>

	const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientId(e.target.value);
		onInputChange({
			target: { name: "recipientId", value: e.target.value },
		} as React.ChangeEvent<HTMLInputElement>);
		setIdLookupDone(false);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientName(e.target.value);
		onInputChange(e);
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientPhone(e.target.value);
		onInputChange(e);
	};

	const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientAddress(e.target.value);
		onInputChange(e);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 border border-gray-100 dark:border-gray-700">
			<h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Recipient Information</h2>
			<div className="flex gap-4 mb-4">
				<label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${recipientType === "user" ? "bg-blue-100 border-blue-400" : "bg-gray-50 border-gray-200"}`}>
					<input type="radio" name="recipientType" value="user" checked={recipientType === "user"} onChange={handleRecipientTypeChange} className="accent-blue-600" />
					Registered User
				</label>
				<label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${recipientType === "guest" ? "bg-blue-100 border-blue-400" : "bg-gray-50 border-gray-200"}`}>
					<input type="radio" name="recipientType" value="guest" checked={recipientType === "guest"} onChange={handleRecipientTypeChange} className="accent-blue-600" />
					Not a User
				</label>
			</div>

			{recipientType === "user" ? (
				<div className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="recipientId" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Recipient ID</label>
						<input
							type="text"
							id="recipientId"
							name="recipientId"
							value={recipientId}
							onChange={handleIdChange}
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
							placeholder="Enter recipient ID"
						/>
					</div>
					{idLookupDone && lookupResult ? (
						<div className="space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
							<div className="flex gap-4">
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Name</label>
									<input type="text" value={recipientName} readOnly className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100" />
								</div>
								<div className="flex-1">
									<label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Phone</label>
									<input type="text" value={recipientPhone} readOnly className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100" />
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Address</label>
								<input type="text" value={recipientAddress} readOnly className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100" />
							</div>
						</div>
					) : null}
				</div>
			) : (
				<div className="space-y-4">
					<div className="space-y-2">
						<label htmlFor="recipientName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Full Name *</label>
						<input
							type="text"
							id="recipientName"
							name="recipientName"
							value={recipientName}
							onChange={handleNameChange}
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
							placeholder="Enter full name"
							required
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Phone Number *</label>
						<input
							type="tel"
							id="recipientPhone"
							name="recipientPhone"
							value={recipientPhone}
							onChange={handlePhoneChange}
							required
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
							placeholder="Phone number"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Street Address *</label>
						<input
							type="text"
							id="recipientAddress"
							name="recipientAddress"
							value={recipientAddress}
							onChange={handleAddressChange}
							required
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
							placeholder="Street address"
						/>
					</div>
					{country === "us" && recipientType !== "user" && (
						<div className="space-y-2">
							<label htmlFor="recipientState" className="block text-sm font-medium text-gray-600 dark:text-gray-300">State *</label>
							<select
								id="recipientState"
								name="recipientState"
								required
								value={formData.recipientState || ""}
								onChange={onInputChange}
								className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
							>
								<option value="">Select state</option>
								{US_STATES.map(state => (
									<option key={state} value={state}>{state}</option>
								))}
							</select>
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default RecipientForm;
