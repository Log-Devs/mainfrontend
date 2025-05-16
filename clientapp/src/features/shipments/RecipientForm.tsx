import React, { useState, useEffect } from "react";
import { GHANA_REGIONS } from "./constants";

const COUNTRY_OPTIONS = [
	{ id: "ghana", name: "Ghana", code: "+233", icon: "🇬🇭" },
	{ id: "us", name: "United States", code: "+1", icon: "🇺🇸" },
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
	onUsaAddressInput,
	addressSuggestions,
	addressLoading,
	addressError,
	onSuggestionSelect,
	suggestionIndex,
	highlightMatch
}: {
	formData: any;
	onInputChange: (e: React.ChangeEvent<any>) => void;
	onUsaAddressInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	addressSuggestions: { id: string; label: string }[];
	addressLoading: boolean;
	addressError: string | null;
	onSuggestionSelect: (suggestion: { id: string; label: string }) => void;
	suggestionIndex: number;
	highlightMatch: (suggestion: { id: string; label: string }, input: string) => React.ReactNode;
}) => {
	const [country, setCountry] = useState(formData.recipientCountry || "us");
	const [phoneCode, setPhoneCode] = useState("+1");
	const [region, setRegion] = useState("");
	const [recipientId, setRecipientId] = useState(formData.recipientId || "");
	const [recipientName, setRecipientName] = useState(formData.recipientName || "");
	const [idLookupDone, setIdLookupDone] = useState(false);

	useEffect(() => {
		if (country === "ghana") setPhoneCode("+233");
		else setPhoneCode("+1");
	}, [country]);

	useEffect(() => {
		if (recipientId && !idLookupDone) {
			const result = mockRecipientLookup(recipientId);
			if (result) {
				setRecipientName(result.name);
				setIdLookupDone(true);
			} else {
				setRecipientName("");
				setIdLookupDone(false);
			}
		}
		if (!recipientId) {
			setRecipientName("");
			setIdLookupDone(false);
		}
	}, [recipientId, idLookupDone]);

	const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCountry(e.target.value);
		onInputChange({
			target: { name: "recipientCountry", value: e.target.value },
		} as any);
	};

	const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientId(e.target.value);
		onInputChange({
			target: { name: "recipientId", value: e.target.value },
		} as any);
		setIdLookupDone(false);
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRecipientName(e.target.value);
		onInputChange(e);
	};

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 border border-gray-100 dark:border-gray-700">
			<h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Recipient Information</h2>
			<div className="space-y-2">
				<label htmlFor="recipientId" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Recipient ID (if known)</label>
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
			{recipientId && recipientName ? (
				<div className="space-y-2">
					<label className="block text-sm font-medium text-gray-600 dark:text-gray-300">Recipient Name</label>
					<input
						type="text"
						value={recipientName}
						readOnly
						className="w-full rounded-md border px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
					/>
				</div>
			) : (
				<>
					<div className="space-y-2">
						<label htmlFor="recipientName" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Full Name *</label>
						<input
							type="text"
							id="recipientName"
							name="recipientName"
							value={recipientName}
							onChange={handleNameChange}
							required
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
							placeholder="Enter full name"
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Country *</label>
						<select
							id="recipientCountry"
							name="recipientCountry"
							value={country}
							onChange={handleCountryChange}
							className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
						>
							{COUNTRY_OPTIONS.map(opt => (
								<option key={opt.id} value={opt.id}>{opt.icon} {opt.name}</option>
							))}
						</select>
					</div>
					<div className="space-y-2">
						<label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Phone Number *</label>
						<div className="flex items-center gap-2">
							<span className="text-lg">{COUNTRY_OPTIONS.find(c => c.id === country)?.icon}</span>
							<span className="text-sm font-semibold">{phoneCode}</span>
							<input
								type="tel"
								id="recipientPhone"
								name="recipientPhone"
								required
								value={formData.recipientPhone || ""}
								onChange={onInputChange}
								className="flex-1 rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
								placeholder="Phone number"
							/>
						</div>
					</div>
					{country === "ghana" ? (
						<>
							<div className="space-y-2">
								<label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Street Address *</label>
								<input
									type="text"
									id="recipientAddress"
									name="recipientAddress"
									required
									value={formData.recipientAddress || ""}
									onChange={onInputChange}
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
									placeholder="Street address"
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="recipientCity" className="block text-sm font-medium text-gray-600 dark:text-gray-300">City *</label>
								<input
									type="text"
									id="recipientCity"
									name="recipientCity"
									required
									value={formData.recipientCity || ""}
									onChange={onInputChange}
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
									placeholder="City"
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="recipientRegion" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Region *</label>
								<select
									id="recipientRegion"
									name="recipientRegion"
									required
									value={formData.recipientRegion || ""}
									onChange={onInputChange}
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
								>
									<option value="">Select region</option>
									{GHANA_REGIONS.map(region => (
										<option key={region.id} value={region.name}>{region.name}</option>
									))}
								</select>
							</div>
						</>
					) : country === "us" ? (
						<>
							<div className="space-y-2">
								<label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-600 dark:text-gray-300">Street Address *</label>
								<input
									type="text"
									id="recipientAddress"
									name="recipientAddress"
									required
									value={formData.recipientAddress || ""}
									onChange={onUsaAddressInput}
									autoComplete="off"
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
									placeholder="Street address"
								/>
								{addressLoading && <div className="text-xs text-gray-400">Loading suggestions...</div>}
								{addressSuggestions.length > 0 && (
									<ul className="bg-white border rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
										{addressSuggestions.map((suggestion: { id: string; label: string }, idx: number) => (
											<li
												key={idx}
												className={`px-3 py-2 cursor-pointer text-sm ${idx === suggestionIndex ? 'bg-blue-50' : ''}`}
												onClick={() => onSuggestionSelect(suggestion)}
												onMouseEnter={() => onSuggestionSelect(suggestion)}
											>
												<div>{highlightMatch(suggestion, formData.recipientAddress)}</div>
											</li>
										))}
									</ul>
								)}
								{addressError && <div className="text-xs text-red-500">{addressError}</div>}
							</div>
							<div className="space-y-2">
								<label htmlFor="recipientCity" className="block text-sm font-medium text-gray-600 dark:text-gray-300">City *</label>
								<input
									type="text"
									id="recipientCity"
									name="recipientCity"
									required
									value={formData.recipientCity || ""}
									onChange={onInputChange}
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
									placeholder="City"
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="recipientState" className="block text-sm font-medium text-gray-600 dark:text-gray-300">State *</label>
								<input
									type="text"
									id="recipientState"
									name="recipientState"
									required
									value={formData.recipientState || ""}
									onChange={onInputChange}
									className="w-full rounded-md border px-3 py-2 text-sm bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100"
									placeholder="State"
								/>
							</div>
						</>
					) : null}
				</>
			)}
		</div>
	);
};

export default RecipientForm;
