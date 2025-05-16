import { useEffect, useState } from "react";
import SenderForm from './SenderForm';
import RecipientForm from './RecipientForm';
import PackageForm from './PackageForm';
import ReviewForm from './ReviewForm';
import StepIndicator from './StepIndicator';
import { useShipmentForm } from './hooks/useShipmentForm';
import { initialFormData } from './constants';

// Define AddressSuggestion type to match SenderForm
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

const SubmitGoods = () => {
	const { formData, setFormData } = useShipmentForm(initialFormData);
	const [step, setStep] = useState<number>(1);
	const [senderAddressSuggestions, setSenderAddressSuggestions] = useState<AddressSuggestion[]>([]);
	const [senderAddressLoading, setSenderAddressLoading] = useState(false);
	const [senderAddressError, setSenderAddressError] = useState<string | null>(null);
	const [senderSuggestionIndex, setSenderSuggestionIndex] = useState(-1);
	const [mapCoords, setMapCoords] = useState<{ lat: number; lon: number } | null>(null);
	const [locationHistory, setLocationHistory] = useState<{ lat: number; lon: number }[]>([]);
	const [locating, setLocating] = useState(false);
	const [locationSuccess, setLocationSuccess] = useState(false);
	const [locationError, setLocationError] = useState<string | null>(null);

	useEffect(() => {
		if (formData.recipientCountry === "USA") {
			setFormData(prev => ({ ...prev, recipientPhoneCountryCode: "+1" }));
		} else if (formData.recipientCountry === "Ghana") {
			setFormData(prev => ({ ...prev, recipientPhoneCountryCode: "+233" }));
		}
	}, [formData.recipientCountry, setFormData]);

	// Handlers for each step/component
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value, type } = e.target;
		const checked = (e.target as HTMLInputElement).checked;

		setFormData(prev => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
			// Reset recipient name if ID is being used and changes, or if switching modes
			...(name === 'recipientId' && prev.recipientKnowsId && { recipientName: '' }),
			...(name === 'recipientKnowsId' && { recipientName: '', recipientId: '' }),
		}));
	};

	// Address auto-complete for sender (with keyboard nav)
	const handleSenderAddressInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setFormData(prev => ({ ...prev, senderAddress: value }));
		setSenderAddressError(null);
		setSenderAddressLoading(true);
		setSenderAddressSuggestions([]);
		setSenderSuggestionIndex(-1);
		if (value.length > 2) {
			try {
				const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(value)}`;
				const res = await fetch(url);
				const data = await res.json();
				setSenderAddressSuggestions(data);
			} catch {
				setSenderAddressError("Failed to fetch address suggestions.");
			}
		}
		setSenderAddressLoading(false);
	};

	// Keyboard navigation for suggestions
	const handleSenderAddressKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!senderAddressSuggestions.length) return;
		if (e.key === 'ArrowDown') {
			setSenderSuggestionIndex(idx => Math.min(idx + 1, senderAddressSuggestions.length - 1));
		} else if (e.key === 'ArrowUp') {
			setSenderSuggestionIndex(idx => Math.max(idx - 1, 0));
		} else if (e.key === 'Enter' && senderSuggestionIndex >= 0) {
			handleSenderSuggestionSelect(senderAddressSuggestions[senderSuggestionIndex]);
		}
	};

	// When user selects a suggestion (full form auto-fill)
	const handleSenderSuggestionSelect = async (suggestion: AddressSuggestion) => {
		setFormData(prev => ({
			...prev,
			senderAddress: suggestion.address?.road || suggestion.address?.pedestrian || suggestion.address?.footway || suggestion.display_name || "",
			senderCity: suggestion.address?.city || suggestion.address?.town || suggestion.address?.village || suggestion.address?.hamlet || "",
			senderState: suggestion.address?.state || "",
			senderZip: suggestion.address?.postcode || "",
			senderCountry: suggestion.address?.country || ""
		}));
		setMapCoords({ lat: parseFloat(suggestion.lat), lon: parseFloat(suggestion.lon) });
		setSenderAddressSuggestions([]);
		setSenderSuggestionIndex(-1);
	};

	// Add to location history on detect or drag
	useEffect(() => {
		if (mapCoords) {
			setLocationHistory(prev => {
				if (prev.length === 0 || prev[0].lat !== mapCoords.lat || prev[0].lon !== mapCoords.lon) {
					const newHist = [{ lat: mapCoords.lat, lon: mapCoords.lon }, ...prev];
					return newHist.slice(0, 3);
				}
				return prev;
			});
		}
	}, [mapCoords]);

	const goToNextStep = async () => {
		setStep(step + 1);
		window.scrollTo(0, 0);
	};

	const goToPreviousStep = () => {
		setStep(step - 1);
		window.scrollTo(0, 0);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
	};

	// Use browser geolocation for real current location
	const handleDetectLocation = () => {
		setLocating(true);
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					setMapCoords({ lat: latitude, lon: longitude });
					setLocating(false);
					setLocationSuccess(true);
					setLocationError(null);
				},
				() => {
					setLocating(false);
					setLocationSuccess(false);
					setLocationError("Unable to detect your location. Please allow location access.");
				}
			);
		} else {
			setLocating(false);
			setLocationSuccess(false);
			setLocationError("Geolocation is not supported by your browser.");
		}
	};
	const handleMarkerDrag = (lat: number, lon: number) => {
		setMapCoords({ lat, lon });
	};

	// Step rendering
	const renderStep = () => {
		switch (step) {
			case 1:
				return (
					<SenderForm
						formData={formData}
						onInputChange={handleInputChange}
						onAddressInput={handleSenderAddressInput}
						onAddressKeyDown={handleSenderAddressKeyDown}
						addressSuggestions={senderAddressSuggestions}
						addressLoading={senderAddressLoading}
						addressError={senderAddressError}
						onSuggestionSelect={handleSenderSuggestionSelect}
						suggestionIndex={senderSuggestionIndex}
						mapCoords={mapCoords}
						onDetectLocation={handleDetectLocation}
						locating={locating}
						locationSuccess={locationSuccess}
						locationError={locationError}
						locationHistory={locationHistory}
						onMapCoordsClick={setMapCoords}
						onMarkerDrag={handleMarkerDrag}
						highlightMatch={highlightMatch}
					/>
				);
			case 2:
				return (
					<RecipientForm
						formData={formData}
						onInputChange={handleInputChange}
						onUsaAddressInput={handleInputChange}
						addressSuggestions={[]}
						addressLoading={false}
						addressError={null}
						onSuggestionSelect={() => { }}
						suggestionIndex={-1}
						highlightMatch={highlightMatchLabel}
					/>
				);
			case 3:
				return (
					<PackageForm
						formData={formData}
						onInputChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => handleInputChange(e)}
						onPackageNoteChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev) => ({ ...prev, packageNote: e.target.value }))}
					/>
				);
			case 4:
				return (
					<ReviewForm
						formData={formData}
						onEdit={setStep}
					/>
				);
			default:
				return null;
		}
	};

	// Main render
	return (
		<div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
			<h1 className="text-2xl font-bold mb-1">Create New Shipment</h1>
			<StepIndicator step={step} />
			<form onSubmit={handleSubmit}>
				{renderStep()}
				<div className="flex justify-between mt-8">
					{step > 1 ? (
						<button
							type="button"
							onClick={goToPreviousStep}
							className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-6 rounded-md transition-colors"
						>
							Back
						</button>
					) : (
						<div></div>
					)}
					{step < 4 ? (
						<button
							type="button"
							onClick={goToNextStep}
							className="bg-red-700 hover:bg-red-900 text-white py-2 px-6 rounded-md transition-colors disabled:opacity-50"
						>
							Continue
						</button>
					) : (
						<button
							type="submit"
							className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors flex items-center"
						>
							Submit Shipment
						</button>
					)}
				</div>
			</form>
		</div>
	);
};

// highlightMatch for address suggestions (SenderForm)
const highlightMatch = (suggestion: AddressSuggestion, input: string): React.ReactNode => {
	if (!input) return suggestion.display_name;
	const regex = new RegExp(`(${input})`, 'gi');
	const parts = suggestion.display_name.split(regex);
	return parts.map((part, i) =>
		regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
	);
};

// highlightMatch for RecipientForm (expects { id, label })
const highlightMatchLabel = (suggestion: { id: string; label: string }, input: string): React.ReactNode => {
	if (!input) return suggestion.label;
	const regex = new RegExp(`(${input})`, 'gi');
	const parts = suggestion.label.split(regex);
	return parts.map((part, i) =>
		regex.test(part) ? <span key={i} className="bg-yellow-200">{part}</span> : part
	);
};

export default SubmitGoods;
