import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	Package,
	MapPin,
	User,
	FileText,
	AlertCircle,
	CheckCircle,
	Truck,
	Info
} from "lucide-react";

interface FormData {
	// Sender information
	senderName: string;
	senderAddress: string;
	senderCity: string;
	senderState: string;
	senderZip: string;
	senderCountry: string;
	senderPhone: string;
	senderEmail: string;

	// Recipient information
	recipientName: string;
	recipientAddress: string;
	recipientCity: string;
	recipientState: string;
	recipientZip: string;
	recipientCountry: string;
	recipientPhone: string;
	recipientEmail: string;

	// Package information
	packageType: string;
	packageWeight: string;
	packageWidth: string;
	packageHeight: string;
	packageLength: string;
	packageContent: string;
	packageValue: string;

	// Shipping options
	shippingOption: string;
	shippingNotes: string;
}

const initialFormData: FormData = {
	// Sender information
	senderName: "",
	senderAddress: "",
	senderCity: "",
	senderState: "",
	senderZip: "",
	senderCountry: "United States",
	senderPhone: "",
	senderEmail: "",

	// Recipient information
	recipientName: "",
	recipientAddress: "",
	recipientCity: "",
	recipientState: "",
	recipientZip: "",
	recipientCountry: "United States",
	recipientPhone: "",
	recipientEmail: "",

	// Package information
	packageType: "box",
	packageWeight: "",
	packageWidth: "",
	packageHeight: "",
	packageLength: "",
	packageContent: "",
	packageValue: "",

	// Shipping options
	shippingOption: "standard",
	shippingNotes: ""
};

const SubmitGoods = () => {
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [step, setStep] = useState<number>(1);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [submitted, setSubmitted] = useState<boolean>(false);
	const [trackingNumber, setTrackingNumber] = useState<string>("");
	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const goToNextStep = () => {
		setStep(step + 1);
		window.scrollTo(0, 0);
	};

	const goToPreviousStep = () => {
		setStep(step - 1);
		window.scrollTo(0, 0);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			// Simulate API call to submit package
			await new Promise(resolve => setTimeout(resolve, 1500));

			// Generate a random tracking number
			const randomTrackingNum = "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
			setTrackingNumber(randomTrackingNum);
			setSubmitted(true);

			// In a real app, we would send the formData to the server
			// const response = await fetch('/api/shipments', {
			//   method: 'POST',
			//   headers: {
			//     'Content-Type': 'application/json',
			//   },
			//   body: JSON.stringify(formData),
			// });

			// const data = await response.json();
			// setTrackingNumber(data.trackingNumber);
			// setSubmitted(true);

		} catch (error) {
			console.error('Error submitting shipment:', error);
			alert('Failed to submit shipment. Please try again.');
		} finally {
			setSubmitting(false);
		}
	};

	const renderStepIndicator = () => {
		return (
			<div className="mb-8">
				<div className="flex items-center justify-between relative">
					{/* Progress bar background */}
					<div className="absolute left-0 top-1/2 w-full h-1 -translate-y-1/2 bg-gray-200 dark:bg-gray-700"></div>

					{/* Progress bar fill */}
					<div
						className="absolute left-0 top-1/2 h-1 -translate-y-1/2 bg-blue-600 dark:bg-blue-500 transition-all duration-300"
						style={{ width: `${((step - 1) / 3) * 100}%` }}
					></div>

					{/* Step 1: Sender */}
					<div className="relative flex flex-col items-center">
						<div className={`
              flex items-center justify-center w-10 h-10 rounded-full z-10
              ${step > 1
								? 'bg-green-600 dark:bg-green-500 text-white'
								: step === 1
									? 'bg-blue-600 dark:bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
							}
            `}>
							{step > 1 ? <CheckCircle size={20} /> : <User size={20} />}
						</div>
						<span className="mt-2 text-xs font-medium">Sender</span>
					</div>

					{/* Step 2: Recipient */}
					<div className="relative flex flex-col items-center">
						<div className={`
              flex items-center justify-center w-10 h-10 rounded-full z-10
              ${step > 2
								? 'bg-green-600 dark:bg-green-500 text-white'
								: step === 2
									? 'bg-blue-600 dark:bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
							}
            `}>
							{step > 2 ? <CheckCircle size={20} /> : <MapPin size={20} />}
						</div>
						<span className="mt-2 text-xs font-medium">Recipient</span>
					</div>

					{/* Step 3: Package */}
					<div className="relative flex flex-col items-center">
						<div className={`
              flex items-center justify-center w-10 h-10 rounded-full z-10
              ${step > 3
								? 'bg-green-600 dark:bg-green-500 text-white'
								: step === 3
									? 'bg-blue-600 dark:bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
							}
            `}>
							{step > 3 ? <CheckCircle size={20} /> : <Package size={20} />}
						</div>
						<span className="mt-2 text-xs font-medium">Package</span>
					</div>

					{/* Step 4: Review */}
					<div className="relative flex flex-col items-center">
						<div className={`
              flex items-center justify-center w-10 h-10 rounded-full z-10
              ${step > 4
								? 'bg-green-600 dark:bg-green-500 text-white'
								: step === 4
									? 'bg-blue-600 dark:bg-blue-500 text-white ring-4 ring-blue-100 dark:ring-blue-900/30'
									: 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
							}
            `}>
							{step > 4 ? <CheckCircle size={20} /> : <FileText size={20} />}
						</div>
						<span className="mt-2 text-xs font-medium">Review</span>
					</div>
				</div>
			</div>
		);
	};

	const renderSenderForm = () => {
		return (
			<>
				<h2 className="text-lg font-semibold mb-4">Sender Information</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<label htmlFor="senderName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Full Name *
						</label>
						<input
							type="text"
							id="senderName"
							name="senderName"
							required
							value={formData.senderName}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Email Address *
						</label>
						<input
							type="email"
							id="senderEmail"
							name="senderEmail"
							required
							value={formData.senderEmail}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Phone Number *
						</label>
						<input
							type="tel"
							id="senderPhone"
							name="senderPhone"
							required
							value={formData.senderPhone}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Street Address *
						</label>
						<input
							type="text"
							id="senderAddress"
							name="senderAddress"
							required
							value={formData.senderAddress}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							City *
						</label>
						<input
							type="text"
							id="senderCity"
							name="senderCity"
							required
							value={formData.senderCity}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderState" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							State/Province *
						</label>
						<input
							type="text"
							id="senderState"
							name="senderState"
							required
							value={formData.senderState}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderZip" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							ZIP/Postal Code *
						</label>
						<input
							type="text"
							id="senderZip"
							name="senderZip"
							required
							value={formData.senderZip}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="senderCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Country *
						</label>
						<select
							id="senderCountry"
							name="senderCountry"
							required
							value={formData.senderCountry}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="United States">United States</option>
							<option value="Canada">Canada</option>
							<option value="Mexico">Mexico</option>
							<option value="United Kingdom">United Kingdom</option>
							<option value="Australia">Australia</option>
							<option value="Germany">Germany</option>
							<option value="France">France</option>
							<option value="Japan">Japan</option>
							<option value="China">China</option>
						</select>
					</div>
				</div>
			</>
		);
	};

	const renderRecipientForm = () => {
		return (
			<>
				<h2 className="text-lg font-semibold mb-4">Recipient Information</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<label htmlFor="recipientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Full Name *
						</label>
						<input
							type="text"
							id="recipientName"
							name="recipientName"
							required
							value={formData.recipientName}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Email Address *
						</label>
						<input
							type="email"
							id="recipientEmail"
							name="recipientEmail"
							required
							value={formData.recipientEmail}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Phone Number *
						</label>
						<input
							type="tel"
							id="recipientPhone"
							name="recipientPhone"
							required
							value={formData.recipientPhone}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Street Address *
						</label>
						<input
							type="text"
							id="recipientAddress"
							name="recipientAddress"
							required
							value={formData.recipientAddress}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientCity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							City *
						</label>
						<input
							type="text"
							id="recipientCity"
							name="recipientCity"
							required
							value={formData.recipientCity}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientState" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							State/Province *
						</label>
						<input
							type="text"
							id="recipientState"
							name="recipientState"
							required
							value={formData.recipientState}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientZip" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							ZIP/Postal Code *
						</label>
						<input
							type="text"
							id="recipientZip"
							name="recipientZip"
							required
							value={formData.recipientZip}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="recipientCountry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Country *
						</label>
						<select
							id="recipientCountry"
							name="recipientCountry"
							required
							value={formData.recipientCountry}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="United States">United States</option>
							<option value="Canada">Canada</option>
							<option value="Mexico">Mexico</option>
							<option value="United Kingdom">United Kingdom</option>
							<option value="Australia">Australia</option>
							<option value="Germany">Germany</option>
							<option value="France">France</option>
							<option value="Japan">Japan</option>
							<option value="China">China</option>
						</select>
					</div>
				</div>
			</>
		);
	};

	const renderPackageForm = () => {
		return (
			<>
				<h2 className="text-lg font-semibold mb-4">Package Details</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="space-y-2">
						<label htmlFor="packageType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Package Type *
						</label>
						<select
							id="packageType"
							name="packageType"
							required
							value={formData.packageType}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="box">Box</option>
							<option value="envelope">Envelope</option>
							<option value="tube">Tube</option>
							<option value="pallet">Pallet</option>
							<option value="other">Other</option>
						</select>
					</div>

					<div className="space-y-2">
						<label htmlFor="packageWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Weight (kg) *
						</label>
						<input
							type="number"
							id="packageWeight"
							name="packageWeight"
							required
							min="0.1"
							step="0.1"
							value={formData.packageWeight}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="packageLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Length (cm) *
						</label>
						<input
							type="number"
							id="packageLength"
							name="packageLength"
							required
							min="1"
							value={formData.packageLength}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="packageWidth" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Width (cm) *
						</label>
						<input
							type="number"
							id="packageWidth"
							name="packageWidth"
							required
							min="1"
							value={formData.packageWidth}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="packageHeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Height (cm) *
						</label>
						<input
							type="number"
							id="packageHeight"
							name="packageHeight"
							required
							min="1"
							value={formData.packageHeight}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="packageContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Package Content Description *
						</label>
						<input
							type="text"
							id="packageContent"
							name="packageContent"
							required
							value={formData.packageContent}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="packageValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Declared Value (USD) *
						</label>
						<input
							type="number"
							id="packageValue"
							name="packageValue"
							required
							min="1"
							value={formData.packageValue}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>

					<div className="space-y-2 md:col-span-2">
						<label htmlFor="shippingOption" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Shipping Option *
						</label>
						<select
							id="shippingOption"
							name="shippingOption"
							required
							value={formData.shippingOption}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						>
							<option value="standard">Standard Shipping (7-10 days)</option>
							<option value="express">Express Shipping (3-5 days)</option>
							<option value="priority">Priority Shipping (1-2 days)</option>
						</select>
					</div>

					<div className="space-y-2 md:col-span-2">
						<label htmlFor="shippingNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
							Additional Notes (Optional)
						</label>
						<textarea
							id="shippingNotes"
							name="shippingNotes"
							rows={3}
							value={formData.shippingNotes}
							onChange={handleInputChange}
							className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
				</div>
			</>
		);
	};

	const renderReviewForm = () => {
		const shippingOptionLabels: { [key: string]: string } = {
			"standard": "Standard Shipping (7-10 days)",
			"express": "Express Shipping (3-5 days)",
			"priority": "Priority Shipping (1-2 days)"
		};

		return (
			<>
				<h2 className="text-lg font-semibold mb-4">Review Your Shipment</h2>

				<div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
					<div className="flex items-start">
						<Info className="text-blue-600 dark:text-blue-400 mr-3 mt-0.5 h-5 w-5 flex-shrink-0" />
						<div className="text-sm text-blue-800 dark:text-blue-300">
							<p>Please review all information carefully before submitting. Once submitted, your shipment will be assigned a tracking number and marked as PENDING until picked up or dropped off at our facility.</p>
						</div>
					</div>
				</div>

				<div className="space-y-6">
					{/* Sender Information */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
						<div className="flex items-center mb-3">
							<User className="text-blue-600 dark:text-blue-400 mr-2 h-5 w-5" />
							<h3 className="text-md font-medium">Sender Information</h3>
							<button
								onClick={() => setStep(1)}
								className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
							>
								Edit
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
							<div>
								<p className="text-gray-500 dark:text-gray-400">Name:</p>
								<p className="font-medium">{formData.senderName}</p>
							</div>
							<div>
								<p className="text-gray-500 dark:text-gray-400">Contact:</p>
								<p className="font-medium">{formData.senderPhone}</p>
								<p className="font-medium">{formData.senderEmail}</p>
							</div>
							<div className="md:col-span-2">
								<p className="text-gray-500 dark:text-gray-400">Address:</p>
								<p className="font-medium">{formData.senderAddress}</p>
								<p className="font-medium">
									{formData.senderCity}, {formData.senderState} {formData.senderZip}
								</p>
								<p className="font-medium">{formData.senderCountry}</p>
							</div>
						</div>
					</div>

					{/* Recipient Information */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
						<div className="flex items-center mb-3">
							<MapPin className="text-green-600 dark:text-green-400 mr-2 h-5 w-5" />
							<h3 className="text-md font-medium">Recipient Information</h3>
							<button
								onClick={() => setStep(2)}
								className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
							>
								Edit
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
							<div>
								<p className="text-gray-500 dark:text-gray-400">Name:</p>
								<p className="font-medium">{formData.recipientName}</p>
							</div>
							<div>
								<p className="text-gray-500 dark:text-gray-400">Contact:</p>
								<p className="font-medium">{formData.recipientPhone}</p>
								<p className="font-medium">{formData.recipientEmail}</p>
							</div>
							<div className="md:col-span-2">
								<p className="text-gray-500 dark:text-gray-400">Address:</p>
								<p className="font-medium">{formData.recipientAddress}</p>
								<p className="font-medium">
									{formData.recipientCity}, {formData.recipientState} {formData.recipientZip}
								</p>
								<p className="font-medium">{formData.recipientCountry}</p>
							</div>
						</div>
					</div>

					{/* Package Information */}
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
						<div className="flex items-center mb-3">
							<Package className="text-purple-600 dark:text-purple-400 mr-2 h-5 w-5" />
							<h3 className="text-md font-medium">Package Information</h3>
							<button
								onClick={() => setStep(3)}
								className="ml-auto text-sm text-blue-600 dark:text-blue-400 hover:underline"
							>
								Edit
							</button>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
							<div>
								<p className="text-gray-500 dark:text-gray-400">Package Type:</p>
								<p className="font-medium capitalize">{formData.packageType}</p>
							</div>
							<div>
								<p className="text-gray-500 dark:text-gray-400">Weight:</p>
								<p className="font-medium">{formData.packageWeight} kg</p>
							</div>
							<div>
								<p className="text-gray-500 dark:text-gray-400">Dimensions:</p>
								<p className="font-medium">{formData.packageLength} × {formData.packageWidth} × {formData.packageHeight} cm</p>
							</div>
							<div>
								<p className="text-gray-500 dark:text-gray-400">Declared Value:</p>
								<p className="font-medium">${formData.packageValue} USD</p>
							</div>
							<div className="md:col-span-2">
								<p className="text-gray-500 dark:text-gray-400">Content Description:</p>
								<p className="font-medium">{formData.packageContent}</p>
							</div>
							<div className="md:col-span-2">
								<p className="text-gray-500 dark:text-gray-400">Shipping Method:</p>
								<p className="font-medium">{shippingOptionLabels[formData.shippingOption]}</p>
							</div>
							{formData.shippingNotes && (
								<div className="md:col-span-2">
									<p className="text-gray-500 dark:text-gray-400">Additional Notes:</p>
									<p className="font-medium">{formData.shippingNotes}</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	};

	const renderSuccessMessage = () => {
		return (
			<div className="flex flex-col items-center py-10">
				<div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
					<CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
				</div>

				<h2 className="text-2xl font-bold mb-2">Shipment Submitted Successfully!</h2>

				<p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
					Your shipment has been created and is now pending pickup or drop-off at our facility.
				</p>

				<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 flex flex-col items-center mb-8 border border-blue-100 dark:border-blue-800 w-full max-w-md">
					<p className="text-gray-700 dark:text-gray-300 text-sm mb-2">Tracking Number:</p>
					<p className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4">{trackingNumber}</p>

					<div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-md px-4 py-2 w-full">
						<div className="flex items-center">
							<AlertCircle className="text-yellow-600 dark:text-yellow-400 h-5 w-5 mr-2" />
							<p className="text-sm text-yellow-800 dark:text-yellow-300">
								<span className="font-semibold">Status:</span> PENDING
							</p>
						</div>
					</div>
				</div>

				<div className="flex flex-wrap gap-4">
					<button
						onClick={() => navigate(`/shipments/${trackingNumber}`)}
						className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors flex items-center"
					>
						<Truck size={18} className="mr-2" />
						Track Shipment
					</button>

					<button
						onClick={() => navigate("/dashboard")}
						className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-6 rounded-md transition-colors"
					>
						Return to Dashboard
					</button>
				</div>
			</div>
		);
	};

	const renderContent = () => {
		if (submitted) {
			return renderSuccessMessage();
		}

		return (
			<form onSubmit={handleSubmit}>
				{/* Step Indicator */}
				{renderStepIndicator()}

				{/* Form content based on current step */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-6">
					{step === 1 && renderSenderForm()}
					{step === 2 && renderRecipientForm()}
					{step === 3 && renderPackageForm()}
					{step === 4 && renderReviewForm()}

					{/* Navigation buttons */}
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
								className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors"
							>
								Continue
							</button>
						) : (
							<button
								type="submit"
								disabled={submitting}
								className={`
                  bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors 
                  flex items-center
                  ${submitting ? 'opacity-70 cursor-not-allowed' : ''}
                `}
							>
								{submitting ? (
									<>
										<div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
										Processing...
									</>
								) : (
									'Submit Shipment'
								)}
							</button>
						)}
					</div>
				</div>
			</form>
		);
	};

	return (
		<div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
			<div>
				<h1 className="text-2xl font-bold mb-1 text-gray-700 dark:text-gray-300">Create New Shipment</h1>
				<p className="text-gray-500 dark:text-gray-400">
					Fill out the form below to submit a new shipment request
				</p>
			</div>

			{renderContent()}
		</div>
	);
};

export default SubmitGoods;
