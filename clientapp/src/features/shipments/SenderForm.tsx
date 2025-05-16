import React, { useState } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { DraggableMarker } from "./DraggableMarker";
import {
	FaMapMarkerAlt,
	FaCheckCircle,
	FaSearchLocation,
	FaUser,
	FaEnvelope,
	FaPhone,
	FaCity,
	FaMapPin,
	FaGlobeAmericas,
	FaHistory,
	FaInfoCircle
} from "react-icons/fa";

// Define interfaces
interface AddressSuggestion {
	display_name: string;
	lat: string;
	lon: string;
	address?: {
		road?: string;
		pedestrian?: string;
		footway?: string;
		city?: string;
		town?: string;
		village?: string;
		hamlet?: string;
		state?: string;
		postcode?: string;
		country?: string;
	};
}

interface FormData {
	senderName: string;
	senderAddress: string;
	senderContact: string;
	senderEmail: string;
	senderPhone: string;
	senderCity: string;
	senderState: string;
	senderZip: string;
	senderCountry: string;
	recipientName: string;
	recipientAddress: string;
	recipientContact: string;
	recipientCountry: string;
	recipientPhoneCountryCode: string;
	recipientId: string;
	recipientKnowsId: boolean;
	packageType: string;
	packageCategory: string;
	packageWeight: string;
	packageDescription: string;
	freightType: string;
}

interface SenderFormProps {
	formData: FormData;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
	onAddressInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onAddressKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
	addressSuggestions: AddressSuggestion[];
	addressLoading: boolean;
	addressError: string | null;
	onSuggestionSelect: (suggestion: AddressSuggestion) => void;
	suggestionIndex: number;
	mapCoords: { lat: number; lon: number } | null;
	onDetectLocation: () => void;
	locating: boolean;
	locationSuccess: boolean;
	locationError: string | null;
	locationHistory: { lat: number; lon: number }[];
	onMapCoordsClick: (coords: { lat: number; lon: number }) => void;
	onMarkerDrag: (lat: number, lon: number) => void;
	highlightMatch: (suggestion: AddressSuggestion, input: string) => React.ReactNode;
}

const SenderForm: React.FC<SenderFormProps> = ({
	formData,
	onInputChange,
	onAddressInput,
	onAddressKeyDown,
	addressSuggestions,
	addressLoading,
	addressError,
	onSuggestionSelect,
	suggestionIndex,
	mapCoords,
	onDetectLocation,
	locating,
	locationSuccess,
	locationError,
	locationHistory,
	onMapCoordsClick,
	onMarkerDrag,
	highlightMatch
}) => {
	// State for form section expand/collapse
	const [expandedMap, setExpandedMap] = useState(true);

	return (
		<section className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 transition-colors duration-200 overflow-hidden">
			{/* Header */}
			<div className="bg-gradient-to-r from-navy-700 to-navy-900 text-white p-6">
				<h2 className="text-2xl font-bold flex items-center gap-2">
					<FaMapMarkerAlt className="text-red-500" /> Sender Information
				</h2>
				<p className="text-gray-200 mt-1 text-sm">
					Please provide accurate sender details for your shipment
				</p>
			</div>

			{/* Form Content */}
			<div className="p-6">
				{/* Location Detection Button */}
				<div className="mb-6 flex flex-wrap items-center gap-3">
					<button
						type="button"
						onClick={onDetectLocation}
						disabled={locating}
						className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
						aria-label="Detect my location"
					>
						<FaSearchLocation />
						{locating ? "Detecting..." : "Detect My Location"}
					</button>

					{locationSuccess && (
						<span className="flex items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 rounded-full px-3 py-1">
							<FaCheckCircle className="mr-1" />Location detected
						</span>
					)}

					{locationError && (
						<span className="text-xs text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded-full">
							<FaInfoCircle className="inline mr-1" />{locationError}
						</span>
					)}
				</div>

				{/* Address Input with Suggestions */}
				<div className="space-y-2 mb-4">
					<label htmlFor="senderAddress" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
						<FaMapPin className="mr-2 text-navy-600 dark:text-navy-400" />
						Street Address <span className="text-red-500 ml-1">*</span>
					</label>

					<div className="relative">
						<input
							type="text"
							id="senderAddress"
							name="senderAddress"
							required
							value={formData.senderAddress}
							onChange={onAddressInput}
							onKeyDown={onAddressKeyDown}
							autoComplete="off"
							placeholder="Enter your street address"
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

					{addressSuggestions.length > 0 && (
						<ul
							id="address-suggestions"
							className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg z-20 divide-y divide-gray-100 dark:divide-gray-700"
						>
							{addressSuggestions.map((suggestion, idx) => (
								<li
									key={idx}
									id={`suggestion-${idx}`}
									className={`flex items-center gap-2 px-4 py-3 cursor-pointer text-sm transition-colors ${idx === suggestionIndex
											? 'bg-navy-50 dark:bg-navy-900/40 text-navy-700 dark:text-navy-300'
											: 'hover:bg-gray-50 dark:hover:bg-gray-800/70'
										}`}
									onClick={() => onSuggestionSelect(suggestion)}
									onMouseEnter={() => onSuggestionSelect(suggestion)}
									role="option"
									aria-selected={idx === suggestionIndex}
								>
									<FaMapMarkerAlt className={`${idx === suggestionIndex ? 'text-red-500' : 'text-gray-400'}`} />
									<span>{highlightMatch(suggestion, formData.senderAddress)}</span>
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

				{/* Location History */}
				{locationHistory.length > 1 && (
					<div className="mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
							<FaHistory /> Recent locations:
						</div>
						<div className="flex flex-wrap gap-2">
							{locationHistory.map((loc, idx) => (
								<button
									key={idx}
									className="px-2 py-1 rounded-md text-xs bg-white dark:bg-gray-800 hover:bg-navy-50 dark:hover:bg-navy-900/30 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:text-navy-700 dark:hover:text-navy-300 transition-colors"
									onClick={() => onMapCoordsClick(loc)}
									type="button"
								>
									{loc.lat.toFixed(4)}, {loc.lon.toFixed(4)}
								</button>
							))}
						</div>
					</div>
				)}

				{/* Form Fields in Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="space-y-2">
						<label htmlFor="senderName" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaUser className="mr-2 text-navy-600 dark:text-navy-400" />
							Full Name <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="text"
							id="senderName"
							name="senderName"
							required
							value={formData.senderName}
							onChange={onInputChange}
							placeholder="Enter your full name"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderEmail" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaEnvelope className="mr-2 text-navy-600 dark:text-navy-400" />
							Email Address <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="email"
							id="senderEmail"
							name="senderEmail"
							required
							value={formData.senderEmail}
							onChange={onInputChange}
							placeholder="your.email@example.com"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderPhone" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaPhone className="mr-2 text-navy-600 dark:text-navy-400" />
							Phone Number <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="tel"
							id="senderPhone"
							name="senderPhone"
							required
							value={formData.senderPhone}
							onChange={onInputChange}
							placeholder="+1 (123) 456-7890"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderCity" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaCity className="mr-2 text-navy-600 dark:text-navy-400" />
							City <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="text"
							id="senderCity"
							name="senderCity"
							required
							value={formData.senderCity}
							onChange={onInputChange}
							placeholder="Enter your city"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderState" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaMapMarkerAlt className="mr-2 text-navy-600 dark:text-navy-400" />
							State/Province <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="text"
							id="senderState"
							name="senderState"
							required
							value={formData.senderState}
							onChange={onInputChange}
							placeholder="Enter your state or province"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderZip" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaMapPin className="mr-2 text-navy-600 dark:text-navy-400" />
							ZIP/Postal Code <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="text"
							id="senderZip"
							name="senderZip"
							required
							value={formData.senderZip}
							onChange={onInputChange}
							placeholder="Enter your ZIP/postal code"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderCountry" className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
							<FaGlobeAmericas className="mr-2 text-navy-600 dark:text-navy-400" />
							Country <span className="text-red-500 ml-1">*</span>
						</label>
						<input
							type="text"
							id="senderCountry"
							name="senderCountry"
							required
							value={formData.senderCountry}
							onChange={onInputChange}
							placeholder="Enter your country"
							className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-3 text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 shadow-sm focus:border-navy-500 focus:ring-2 focus:ring-navy-200 dark:focus:ring-navy-700 transition-all placeholder-gray-400 dark:placeholder-gray-500"
						/>
					</div>
				</div>

				{/* Map Section */}
				{mapCoords && (
					<div className="mt-8">
						<div className="flex justify-between items-center mb-2">
							<button
								onClick={() => setExpandedMap(!expandedMap)}
								className="flex items-center gap-2 text-sm font-medium text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-300"
							>
								<span className="text-xs bg-navy-100 dark:bg-navy-900 text-navy-600 dark:text-navy-300 px-2 py-0.5 rounded">
									{expandedMap ? '−' : '+'}
								</span>
								Location Map
								<span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
									(drag marker to adjust)
								</span>
							</button>

							<a
								href={`https://www.openstreetmap.org/?mlat=${mapCoords.lat}&mlon=${mapCoords.lon}#map=16/${mapCoords.lat}/${mapCoords.lon}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-xs text-navy-600 dark:text-navy-400 hover:text-navy-800 dark:hover:text-navy-300 hover:underline"
							>
								View on OpenStreetMap
							</a>
						</div>

						{expandedMap && (
							<div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-300">
								<MapContainer
									center={[mapCoords.lat, mapCoords.lon]}
									zoom={16}
									style={{ width: '100%', height: 320 }}
									scrollWheelZoom={true}
									className="z-10"
								>
									<TileLayer
										attribution='&copy; OpenStreetMap contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									<DraggableMarker position={mapCoords} onDragEnd={onMarkerDrag} animateBounce={false} />
								</MapContainer>

								<div className="bg-gray-50 dark:bg-gray-800 p-2 text-xs text-center text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
									Coordinates: {mapCoords.lat.toFixed(6)}, {mapCoords.lon.toFixed(6)}
								</div>
							</div>
						)}
					</div>
				)}
			</div>

			{/* Footer */}
			<div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
				<div className="text-xs text-gray-500 dark:text-gray-400">
					<span className="text-red-500">*</span> Required fields
				</div>
				<div className="text-xs text-gray-500 dark:text-gray-400">
					All information is secured and encrypted
				</div>
			</div>
		</section>
	);
};

export default SenderForm;