import React, { useState } from "react";
import {
	FaMapMarkerAlt,
	FaCheckCircle,
	FaUser,
	FaEnvelope,
	FaPhone,
	FaCity,
	FaMapPin,
	FaGlobeAmericas,
	FaIdCard,
	FaInfoCircle,
	FaUserCircle,
	FaUserAlt
} from "react-icons/fa";

// Constants
const COUNTRY_OPTIONS = [
	{ id: "ghana", name: "Ghana", code: "+233", icon: "🇬🇭" },
	{ id: "us", name: "United States", code: "+1", icon: "🇺🇸" },
];

const US_STATES = [
	"Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// Mock API for recipient lookup
interface RecipientLookupResult {
	name: string;
	phone: string;
	address: string;
	country: string;
}

const mockRecipientLookup = (id: string): RecipientLookupResult | null => {
	// Simulate lookup. Replace with actual API in production.
	if (id === "GH12345") return {
		name: "Kwame Nkrumah",
		phone: "+233 20 123 4567",
		address: "12 Independence Ave, Accra",
		country: "ghana"
	};
	if (id === "US54321") return {
		name: "John Doe",
		phone: "+1 555-123-4567",
		address: "123 Main St, New York, NY 10001",
		country: "us"
	};
	return null;
};

// Interface definitions
/**
 * AddressSuggestion TypeScript Interface
 */
interface AddressSuggestion {
	display_name: string;
	lat: string;
	lon: string;
	address?: {
		[key: string]: string;
	};
}

/**
 * Form data interface
 */
interface FormData {
	recipientName?: string;
	recipientAddress?: string;
	recipientPhone?: string;
	recipientCountry?: string;
	recipientPhoneCountryCode?: string;
	recipientId?: string;
	recipientKnowsId?: boolean;
	recipientType?: string;
	recipientState?: string;
	recipientCity?: string;
	recipientZip?: string;
	recipientEmail?: string;
}

/**
 * RecipientForm Component Props
 */
interface RecipientFormProps {
	formData: FormData;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	addressLoading: boolean;
	addressError: string | null;
	onSuggestionSelect: (suggestion: AddressSuggestion) => void;
	suggestionIndex: number;
	highlightMatch: (suggestion: AddressSuggestion, input: string) => React.ReactNode;
	onAddressInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onAddressKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	addressSuggestions: AddressSuggestion[];
}

const RecipientForm: React.FC<RecipientFormProps> = ({
	formData,
	onInputChange,
	addressLoading,
	addressError,
	onSuggestionSelect,
	suggestionIndex,
	highlightMatch,
	onAddressInput,
	onAddressKeyDown,
	addressSuggestions
}) => {
	// State management
	const [recipientType, setRecipientType] = useState(formData.recipientType || "guest");
	const [recipientId, setRecipientId] = useState(formData.recipientId || "");
	const [idLookupDone, setIdLookupDone] = useState(false);
	const [lookupResult, setLookupResult] = useState<RecipientLookupResult | null>(null);
	const [lookupError, setLookupError] = useState<string | null>(null);
	const [isLookingUp, setIsLookingUp] = useState(false);

	// Handle recipient type change
	const createSyntheticEvent = (name: string, value: string): React.ChangeEvent<HTMLInputElement | HTMLSelectElement> => {
		return {
			target: { name, value } as HTMLInputElement,
		} as React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
	};

	const handleRecipientTypeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setRecipientType(e.target.value);
		setIdLookupDone(false);
		setRecipientId("");
		setLookupResult(null);
		setLookupError(null);

		// Update formData
		const syntheticEvent = createSyntheticEvent("recipientType", e.target.value);
		onInputChange(syntheticEvent);
	};

	// Handle recipient ID change
	const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setRecipientId(e.target.value);
		setIdLookupDone(false);
		setLookupResult(null);
		setLookupError(null);

		// Update formData
		const syntheticEvent = createSyntheticEvent("recipientId", e.target.value);
		onInputChange(syntheticEvent);
	};

	const performLookup = (): void => {
		if (!recipientId.trim()) {
			setLookupError("Please enter a recipient ID");
			return;
		}

		setIsLookingUp(true);
		setLookupError(null);

		// Simulate API call with timeout
		setTimeout(() => {
			const result = mockRecipientLookup(recipientId);

			if (result) {
				setLookupResult(result);

				// Update formData with recipient details
				const updates = {
					recipientName: result.name,
					recipientPhone: result.phone || "",
					recipientAddress: result.address || "",
					recipientCountry: result.country || formData.recipientCountry
				};

				// Apply updates to formData
				Object.entries(updates).forEach(([name, value]) => {
					const syntheticEvent = createSyntheticEvent(name, value || "");
					onInputChange(syntheticEvent);
				});

				setIdLookupDone(true);
			} else {
				setLookupError("Recipient not found. Please check the ID and try again.");
			}

			setIsLookingUp(false);
		}, 800); // Simulate network delay
	};

	// Handle country change
	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
		const selectedCountry = e.target.value;

		// Update formData
		const syntheticEvent = createSyntheticEvent("recipientCountry", selectedCountry);
		onInputChange(syntheticEvent);

		// Update phone country code based on selected country
		const countryOption = COUNTRY_OPTIONS.find(option => option.id === selectedCountry);
		if (countryOption) {
			const phoneCodeEvent = createSyntheticEvent("recipientPhoneCountryCode", countryOption.code);
			onInputChange(phoneCodeEvent);
		}
	};

	return (
		<section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800">
			{/* Header */}
			<div className="bg-navy-600 dark:bg-navy-800 text-white p-6">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					<FaUserAlt className="text-red-500" /> Recipient Information
				</h2>
				<p className="text-gray-200 mt-1 text-sm">
					Please provide accurate recipient details for delivery
				</p>
			</div>

			{/* Form Content */}
			<div className="p-6">
				{/* Recipient Type Selection */}
				<div className="mb-6">
					<label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
						Select Recipient Type
					</label>
					<div className="flex flex-wrap gap-4">
						<label
							className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-sm cursor-pointer transition-all ${recipientType === "user"
								? "bg-navy-50 dark:bg-navy-900/30 border-navy-300 dark:border-navy-700 text-navy-700 dark:text-navy-300"
								: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
								}`}
						>
							<input
								type="radio"
								name="recipientType"
								value="user"
								checked={recipientType === "user"}
								onChange={handleRecipientTypeChange}
								className="accent-navy-600 w-4 h-4"
							/>
							<FaUserCircle className={recipientType === "user" ? "text-navy-600" : "text-gray-400"} />
							<span>Registered User</span>
						</label>

						<label
							className={`flex items-center gap-2 px-4 py-3 rounded-lg border shadow-sm cursor-pointer transition-all ${recipientType === "guest"
								? "bg-navy-50 dark:bg-navy-900/30 border-navy-300 dark:border-navy-700 text-navy-700 dark:text-navy-300"
								: "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
								}`}
						>
							<input
								type="radio"
								name="recipientType"
								value="guest"
								checked={recipientType === "guest"}
								onChange={handleRecipientTypeChange}
								className="accent-navy-600 w-4 h-4"
							/>
							<FaUser className={recipientType === "guest" ? "text-navy-600" : "text-gray-400"} />
							<span>Guest Recipient</span>
						</label>
					</div>
				</div>

				{/* User Type Form */}
				{
					recipientType === "user" ? (
						<div className="space-y-6">
							<div className="space-y-2">
								<label htmlFor="recipientId" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
									<FaIdCard className="mr-2 text-navy-600 dark:text-navy-400" />
									Recipient ID <span className="text-red-500 ml-1">*</span>
								</label>
								<div className="flex">
									<input
										type="text"
										id="recipientId"
										name="recipientId"
										value={recipientId}
										onChange={handleIdChange}
										placeholder="Enter recipient ID (e.g., GH12345 or US54321)"
										className="flex-1 rounded-l-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
									/>
									<button
										type="button"
										onClick={performLookup}
										disabled={isLookingUp || !recipientId.trim()}
										className="px-4 py-3 bg-navy-600 hover:bg-navy-700 text-white font-medium rounded-r-lg shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-navy-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
									>
										{isLookingUp ? (
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
										) : (
											"Look Up"
										)}
									</button>
								</div>

								{lookupError && (
									<div className="text-xs text-red-500 dark:text-red-400 flex items-center mt-1">
										<FaInfoCircle className="mr-1" /> {lookupError}
									</div>
								)}

								<div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
									Enter the recipient's ID and click "Look Up" to retrieve their details
								</div>
							</div>

							{/* Lookup Results */}
							{idLookupDone && lookupResult && (
								<div className="space-y-4 bg-navy-50 dark:bg-navy-900/20 p-6 rounded-lg border border-navy-100 dark:border-navy-800 mt-4">
									<div className="flex items-center gap-2 text-navy-600 dark:text-navy-400 mb-2">
										<FaCheckCircle />
										<span className="font-medium">Recipient found! Details loaded below:</span>
									</div>

									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="space-y-2">
											<label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
												<FaUser className="mr-2 text-navy-600 dark:text-navy-400" />
												Full Name
											</label>
											<input
												type="text"
												value={formData.recipientName || ""}
												readOnly
												className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
											/>
										</div>

										<div className="space-y-2">
											<label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
												<FaPhone className="mr-2 text-navy-600 dark:text-navy-400" />
												Phone Number
											</label>
											<input
												type="text"
												value={formData.recipientPhone || ""}
												readOnly
												className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
											/>
										</div>
									</div>

									<div className="space-y-2">
										<label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
											<FaMapMarkerAlt className="mr-2 text-navy-600 dark:text-navy-400" />
											Address
										</label>
										<input
											type="text"
											value={formData.recipientAddress || ""}
											readOnly
											className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
										/>
									</div>

									<div className="space-y-2">
										<label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
											<FaGlobeAmericas className="mr-2 text-navy-600 dark:text-navy-400" />
											Country
										</label>
										<select
											value={formData.recipientCountry || "us"}
											disabled
											className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800/50 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all disabled:opacity-80"
										>
											{COUNTRY_OPTIONS.map(option => (
												<option key={option.id} value={option.id}>
													{option.icon} {option.name} ({option.code})
												</option>
											))}
										</select>
									</div>
								</div>
							)}
						</div>
					) : (
						/* Guest Recipient Form */
						<div className="space-y-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="space-y-2">
									<label htmlFor="recipientName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaUser className="mr-2 text-navy-600 dark:text-navy-400" />
										Full Name <span className="text-red-500 ml-1">*</span>
									</label>
									<input
										type="text"
										id="recipientName"
										name="recipientName"
										value={formData.recipientName || ""}
										onChange={onInputChange}
										placeholder="Enter recipient's full name"
										required
										className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="recipientEmail" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaEnvelope className="mr-2 text-navy-600 dark:text-navy-400" />
										Email Address <span className="text-red-500 ml-1">*</span>
									</label>
									<input
										type="email"
										id="recipientEmail"
										name="recipientEmail"
										value={formData.recipientEmail || ""}
										onChange={onInputChange}
										placeholder="recipient@example.com"
										required
										className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="recipientPhone" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaPhone className="mr-2 text-navy-600 dark:text-navy-400" />
										Phone Number <span className="text-red-500 ml-1">*</span>
									</label>
									<div className="flex">
										<select
											id="recipientPhoneCountryCode"
											name="recipientPhoneCountryCode"
											value={formData.recipientPhoneCountryCode || "+1"}
											onChange={onInputChange}
											className="w-auto rounded-l-lg border border-gray-300 dark:border-gray-700 px-3 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all"
										>
											{COUNTRY_OPTIONS.map(option => (
												<option key={option.id} value={option.code}>
													{option.icon} {option.code}
												</option>
											))}
										</select>
										<input
											type="tel"
											id="recipientPhone"
											name="recipientPhone"
											value={formData.recipientPhone || ""}
											onChange={onInputChange}
											placeholder="Phone number"
											required
											className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-700 border-l-0 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label htmlFor="recipientCountry" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaGlobeAmericas className="mr-2 text-navy-600 dark:text-navy-400" />
										Country <span className="text-red-500 ml-1">*</span>
									</label>
									<select
										id="recipientCountry"
										name="recipientCountry"
										value={formData.recipientCountry || "us"}
										onChange={handleCountryChange}
										required
										className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all"
									>
										{COUNTRY_OPTIONS.map(option => (
											<option key={option.id} value={option.id}>
												{option.icon} {option.name}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Address Input with Suggestions */}
							<div className="space-y-2">
								<label htmlFor="recipientAddress" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
									<FaMapPin className="mr-2 text-navy-600 dark:text-navy-400" />
									Street Address <span className="text-red-500 ml-1">*</span>
								</label>

								<div className="relative">
									<input
										type="text"
										id="recipientAddress"
										name="recipientAddress"
										required
										value={formData.recipientAddress || ""}
										onChange={onAddressInput}
										onKeyDown={onAddressKeyDown}
										autoComplete="off"
										placeholder="Enter recipient's street address"
										className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
										aria-autocomplete="list"
										aria-controls="address-suggestions"
										aria-activedescendant={addressSuggestions.length > 0 ? `suggestion-${suggestionIndex}` : undefined}
									/>
									{addressLoading && (
										<div className="absolute right-3 top-1/2 transform -translate-y-1/2">
											<div className="w-5 h-5 border-2 border-navy-600 border-t-transparent rounded-full animate-spin"></div>
										</div>
									)}
								</div>

								{addressLoading && (
									<div className="text-xs text-gray-500 dark:text-gray-400 animate-pulse ml-1">
										Searching for addresses...
									</div>
								)}

								{addressSuggestions && addressSuggestions.length > 0 && (
									<ul
										id="address-suggestions"
										className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg z-20 divide-y divide-gray-100 dark:divide-gray-700"
									>
										{addressSuggestions.map((suggestion: AddressSuggestion, idx: number) => (
											<li
												key={idx}
												id={`suggestion-${idx}`}
												className={`flex items-center gap-2 px-4 py-3 cursor-pointer text-sm transition-colors ${idx === suggestionIndex
													? 'bg-navy-50 dark:bg-navy-900/40 text-navy-700 dark:text-navy-300'
													: 'hover:bg-gray-50 dark:hover:bg-gray-800/70'
													}`}
												onClick={() => onSuggestionSelect(suggestion)}
												role="option"
												aria-selected={idx === suggestionIndex}
											>
												<FaMapMarkerAlt className={`${idx === suggestionIndex ? 'text-red-500' : 'text-gray-400'}`} />
												<span>{highlightMatch(suggestion, formData.recipientAddress || "")}</span>
											</li>
										))}
									</ul>
								)}

								{addressError && (
									<div className="text-xs text-red-500 dark:text-red-400 ml-1 mt-1 flex items-center">
										<FaInfoCircle className="mr-1" /> {addressError}
									</div>
								)}
							</div>

							{/* Additional Address Fields */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
								<div className="space-y-2">
									<label htmlFor="recipientCity" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaCity className="mr-2 text-navy-600 dark:text-navy-400" />
										City <span className="text-red-500 ml-1">*</span>
									</label>
									<input
										type="text"
										id="recipientCity"
										name="recipientCity"
										required
										value={formData.recipientCity || ""}
										onChange={onInputChange}
										placeholder="Enter city"
										className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
									/>
								</div>

								<div className="space-y-2">
									<label htmlFor="recipientState" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaMapMarkerAlt className="mr-2 text-navy-600 dark:text-navy-400" />
										State/Province <span className="text-red-500 ml-1">*</span>
									</label>
									{formData.recipientCountry === "us" ? (
										<select
											id="recipientState"
											name="recipientState"
											required
											value={formData.recipientState || ""}
											onChange={onInputChange}
											className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all"
										>
											<option value="">Select state</option>
											{US_STATES.map(state => (
												<option key={state} value={state}>{state}</option>
											))}
										</select>
									) : (
										<input
											type="text"
											id="recipientState"
											name="recipientState"
											required
											value={formData.recipientState || ""}
											onChange={onInputChange}
											placeholder="Enter state/province"
											className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
										/>
									)}
								</div>

								<div className="space-y-2">
									<label htmlFor="recipientZip" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
										<FaMapPin className="mr-2 text-navy-600 dark:text-navy-400" />
										Zip/Postal Code <span className="text-red-500 ml-1">*</span>
									</label>
									<input
										type="text"
										id="recipientZip"
										name="recipientZip"
										required
										value={formData.recipientZip || ""}
										onChange={onInputChange}
										placeholder="Enter zip/postal code"
										className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
									/>
								</div>
							</div>
						</div>
					)}
			</div>
		</section>
	);
};

export default RecipientForm;