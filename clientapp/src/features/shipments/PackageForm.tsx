import React, { useState, useEffect } from "react";
import { MapPin, Phone, User, Flag, Globe, Building, Search, CheckCircle, X, AlertCircle, Home, Info } from "lucide-react";

// Constants
const COUNTRY_OPTIONS = [
	{ id: "ghana", name: "Ghana", code: "+233", icon: "🇬🇭" },
	{ id: "us", name: "United States", code: "+1", icon: "🇺🇸" },
	{ id: "uk", name: "United Kingdom", code: "+44", icon: "🇬🇧" },
	{ id: "ca", name: "Canada", code: "+1", icon: "🇨🇦" },
];

const GHANA_REGIONS = [
	{ id: "gr", name: "Greater Accra" },
	{ id: "as", name: "Ashanti" },
	{ id: "ea", name: "Eastern" },
	{ id: "we", name: "Western" },
	{ id: "ce", name: "Central" },
	{ id: "no", name: "Northern" },
	{ id: "vo", name: "Volta" },
	{ id: "ba", name: "Brong-Ahafo" },
	{ id: "ue", name: "Upper East" },
	{ id: "uw", name: "Upper West" },
];

const US_STATES = [
	{ id: "al", name: "Alabama" },
	{ id: "ak", name: "Alaska" },
	{ id: "az", name: "Arizona" },
	{ id: "ca", name: "California" },
	{ id: "co", name: "Colorado" },
	{ id: "ny", name: "New York" },
	{ id: "tx", name: "Texas" },
	// Add more states as needed
];

// Mock recipient lookup service
interface Recipient {
	name: string;
	phone: string;
	country: string;
}

const mockRecipientLookup = (id: string): Recipient | null => {
	// Simulate lookup. Replace with real API in production.
	if (id === "GH12345") return { name: "Kwame Nkrumah", phone: "0241234567", country: "ghana" };
	if (id === "US54321") return { name: "John Doe", phone: "5551234567", country: "us" };
	return null;
};

const RecipientForm = ({
	formData,
	onInputChange,
	onUsaAddressInput,
	addressSuggestions,
	addressLoading,
	addressError,
	onSuggestionSelect,
	suggestionIndex,
	highlightMatch
}) => {
	const [country, setCountry] = useState(formData.recipientCountry || "us");
	const [phoneCode, setPhoneCode] = useState("+1");
	const [recipientId, setRecipientId] = useState(formData.recipientId || "");
	const [recipientName, setRecipientName] = useState(formData.recipientName || "");
	const [idLookupDone, setIdLookupDone] = useState(false);
	const [lookupStatus, setLookupStatus] = useState(null); // "success", "error", or null
	const [isFormValid, setIsFormValid] = useState(false);

	// Update phone code when country changes
	useEffect(() => {
		const selectedCountry = COUNTRY_OPTIONS.find(c => c.id === country);
		if (selectedCountry) {
			setPhoneCode(selectedCountry.code);

			// Update formData with country change
			onInputChange({
				target: { name: "recipientCountry", value: country },
			});
		}
	}, [country, onInputChange]);

	// Recipient ID lookup effect
	useEffect(() => {
		if (recipientId && !idLookupDone) {
			// Simulate API call delay
			const timer = setTimeout(() => {
				const result = mockRecipientLookup(recipientId);
				if (result) {
					setRecipientName(result.name);
					setIdLookupDone(true);
					setLookupStatus("success");

					// Update other form fields based on lookup
					onInputChange({
						target: { name: "recipientName", value: result.name },
					});

					if (result.country) {
						setCountry(result.country);
					}

					if (result.phone) {
						onInputChange({
							target: { name: "recipientPhone", value: result.phone },
						});
					}
				} else {
					setRecipientName("");
					setIdLookupDone(false);
					setLookupStatus("error");
				}
			}, 600);

			return () => clearTimeout(timer);
		}

		if (!recipientId) {
			setRecipientName("");
			setIdLookupDone(false);
			setLookupStatus(null);
		}
	}, [recipientId, idLookupDone, onInputChange]);

	// Form validation
	useEffect(() => {
		const requiredFields = ['recipientName', 'recipientPhone'];

		if (idLookupDone) {
			setIsFormValid(true);
			return;
		}

		// Add address fields based on country
		if (country === 'ghana') {
			requiredFields.push('recipientAddress', 'recipientCity', 'recipientRegion');
		} else if (country === 'us') {
			requiredFields.push('recipientAddress', 'recipientCity', 'recipientState', 'recipientZip');
		}

		const valid = requiredFields.every(field => formData[field] && formData[field].trim() !== '');
		setIsFormValid(valid);
	}, [formData, country, idLookupDone]);

	interface CountryChangeEvent {
		target: {
			value: string;
		};
	}

	interface InputChangeEvent {
		target: {
			name: string;
			value: string;
		};
	}

	const handleCountryChange = (e: CountryChangeEvent) => {
		setCountry(e.target.value);

		// Clear address fields when country changes
		onInputChange({
			target: { name: "recipientAddress", value: "" },
		} as InputChangeEvent);
		onInputChange({
			target: { name: "recipientCity", value: "" },
		} as InputChangeEvent);
		onInputChange({
			target: { name: "recipientState", value: "" },
		} as InputChangeEvent);
		onInputChange({
			target: { name: "recipientRegion", value: "" },
		} as InputChangeEvent);
		onInputChange({
			target: { name: "recipientZip", value: "" },
		} as InputChangeEvent);
	};

	const handleIdChange = (e) => {
		setRecipientId(e.target.value);
		onInputChange({
			target: { name: "recipientId", value: e.target.value },
		});
		setIdLookupDone(false);
		setLookupStatus(null);
	};

	const handleNameChange = (e) => {
		setRecipientName(e.target.value);
		onInputChange(e);
	};

	// ID Field status indicator
	const renderIdStatus = () => {
		if (!recipientId) return null;

		if (lookupStatus === "success") {
			return (
				<div className="flex items-center text-green-600 text-xs mt-1">
					<CheckCircle size={14} className="mr-1" />
					<span>Recipient found</span>
				</div>
			);
		}

		if (lookupStatus === "error") {
			return (
				<div className="flex items-center text-red-500 text-xs mt-1">
					<AlertCircle size={14} className="mr-1" />
					<span>No recipient found with this ID</span>
				</div>
			);
		}

		return null;
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 border border-gray-200 dark:border-gray-700">
			<div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
				<h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
					<User size={20} className="mr-2 text-blue-500" />
					Recipient Information
				</h2>
				{isFormValid && (
					<span className="bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-100 text-xs px-2 py-1 rounded-full flex items-center">
						<CheckCircle size={12} className="mr-1" />
						Valid
					</span>
				)}
			</div>

			<div className="space-y-1">
				<label htmlFor="recipientId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
					<Search size={16} className="mr-1 text-gray-500" />
					Recipient ID (if known)
				</label>
				<div className="relative">
					<input
						type="text"
						id="recipientId"
						name="recipientId"
						value={recipientId}
						onChange={handleIdChange}
						className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						placeholder="Enter recipient ID (e.g., GH12345, US54321)"
					/>
					{recipientId && lookupStatus === null && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<div className="animate-pulse h-4 w-4 bg-blue-400 rounded-full"></div>
						</div>
					)}
				</div>
				{renderIdStatus()}
				<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
					<Info size={12} className="inline mr-1" />
					Try "GH12345" or "US54321" for demo
				</p>
			</div>

			{recipientId && recipientName && lookupStatus === "success" ? (
				<div className="space-y-2 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md border border-blue-100 dark:border-blue-800">
					<div className="flex items-center justify-between">
						<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Recipient Found
						</label>
						<span className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
							<CheckCircle size={14} className="mr-1" />
							Verified
						</span>
					</div>
					<div className="flex items-center">
						<User size={16} className="mr-2 text-gray-500" />
						<input
							type="text"
							value={recipientName}
							readOnly
							className="w-full rounded-md border px-3 py-2 text-sm bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
						/>
					</div>
				</div>
			) : (
				<>
					<div className="space-y-1">
						<label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
							<User size={16} className="mr-1 text-gray-500" />
							Full Name <span className="text-red-500">*</span>
						</label>
						<input
							type="text"
							id="recipientName"
							name="recipientName"
							value={recipientName}
							onChange={handleNameChange}
							required
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							placeholder="Enter full name"
						/>
					</div>

					<div className="space-y-1">
						<label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
							<Globe size={16} className="mr-1 text-gray-500" />
							Country <span className="text-red-500">*</span>
						</label>
						<div className="relative">
							<select
								id="recipientCountry"
								name="recipientCountry"
								value={country}
								onChange={handleCountryChange}
								className="w-full rounded-md border px-3 py-2 pl-8 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
							>
								{COUNTRY_OPTIONS.map(opt => (
									<option key={opt.id} value={opt.id}>{opt.name}</option>
								))}
							</select>
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<span className="text-lg">{COUNTRY_OPTIONS.find(c => c.id === country)?.icon}</span>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
								<Flag size={16} className="text-gray-400" />
							</div>
						</div>
					</div>

					<div className="space-y-1">
						<label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
							<Phone size={16} className="mr-1 text-gray-500" />
							Phone Number <span className="text-red-500">*</span>
						</label>
						<div className="flex items-center gap-2">
							<div className="flex items-center justify-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
								<span className="text-lg mr-1">{COUNTRY_OPTIONS.find(c => c.id === country)?.icon}</span>
								<span className="text-sm font-semibold">{phoneCode}</span>
							</div>
							<input
								type="tel"
								id="recipientPhone"
								name="recipientPhone"
								required
								value={formData.recipientPhone || ""}
								onChange={onInputChange}
								className="flex-1 rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
								placeholder="Phone number"
							/>
						</div>
					</div>

					{country === "ghana" ? (
						<>
							<div className="space-y-1">
								<label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
									<Home size={16} className="mr-1 text-gray-500" />
									Street Address <span className="text-red-500">*</span>
								</label>
								<input
									type="text"
									id="recipientAddress"
									name="recipientAddress"
									required
									value={formData.recipientAddress || ""}
									onChange={onInputChange}
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									placeholder="Street address"
								/>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="space-y-1">
									<label htmlFor="recipientCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
										<Building size={16} className="mr-1 text-gray-500" />
										City <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="recipientCity"
										name="recipientCity"
										required
										value={formData.recipientCity || ""}
										onChange={onInputChange}
										className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="City"
									/>
								</div>

								<div className="space-y-1">
									<label htmlFor="recipientRegion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
										<MapPin size={16} className="mr-1 text-gray-500" />
										Region <span className="text-red-500">*</span>
									</label>
									<select
										id="recipientRegion"
										name="recipientRegion"
										required
										value={formData.recipientRegion || ""}
										onChange={onInputChange}
										className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="">Select region</option>
										{GHANA_REGIONS.map(region => (
											<option key={region.id} value={region.name}>{region.name}</option>
										))}
									</select>
								</div>
							</div>
						</>
					) : country === "us" ? (
						<>
							<div className="space-y-1">
								<label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
									<Home size={16} className="mr-1 text-gray-500" />
									Street Address <span className="text-red-500">*</span>
								</label>
								<div className="relative">
									<input
										type="text"
										id="recipientAddress"
										name="recipientAddress"
										required
										value={formData.recipientAddress || ""}
										onChange={onUsaAddressInput}
										autoComplete="off"
										className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="Street address"
									/>
									{addressLoading && (
										<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
											<div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
										</div>
									)}
								</div>

								{addressLoading && <div className="text-xs text-gray-500 flex items-center mt-1"><Info size={12} className="mr-1" /> Loading suggestions...</div>}

								{addressSuggestions.length > 0 && (
									<ul className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
										{addressSuggestions.map((suggestion, idx) => (
											<li
												key={idx}
												className={`px-3 py-2 cursor-pointer text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 ${idx === suggestionIndex ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
												onClick={() => onSuggestionSelect(suggestion)}
											>
												<div className="flex items-center">
													<MapPin size={14} className="mr-2 text-blue-500" />
													{highlightMatch(suggestion, formData.recipientAddress)}
												</div>
											</li>
										))}
									</ul>
								)}

								{addressError && (
									<div className="flex items-center text-red-500 text-xs mt-1">
										<AlertCircle size={14} className="mr-1" />
										{addressError}
									</div>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								<div className="space-y-1">
									<label htmlFor="recipientCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
										<Building size={16} className="mr-1 text-gray-500" />
										City <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="recipientCity"
										name="recipientCity"
										required
										value={formData.recipientCity || ""}
										onChange={onInputChange}
										className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="City"
									/>
								</div>

								<div className="space-y-1">
									<label htmlFor="recipientState" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
										<MapPin size={16} className="mr-1 text-gray-500" />
										State <span className="text-red-500">*</span>
									</label>
									<select
										id="recipientState"
										name="recipientState"
										required
										value={formData.recipientState || ""}
										onChange={onInputChange}
										className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
									>
										<option value="">Select state</option>
										{US_STATES.map(state => (
											<option key={state.id} value={state.name}>{state.name}</option>
										))}
									</select>
								</div>

								<div className="space-y-1">
									<label htmlFor="recipientZip" className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
										<Info size={16} className="mr-1 text-gray-500" />
										ZIP Code <span className="text-red-500">*</span>
									</label>
									<input
										type="text"
										id="recipientZip"
										name="recipientZip"
										required
										value={formData.recipientZip || ""}
										onChange={onInputChange}
										className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
										placeholder="ZIP Code"
									/>
								</div>
							</div>
						</>
					) : null}
				</>
			)}
		</div>
	);
};

export default RecipientForm;