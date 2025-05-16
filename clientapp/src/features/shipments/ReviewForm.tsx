interface ReviewFormProps {
	formData: {
		senderName: string;
		// Add other fields as needed
	};
	onEdit: (section: number) => void;
}

const ReviewForm = ({ formData, onEdit }: ReviewFormProps) => (
	<div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6 border border-gray-100 dark:border-gray-700">
		<h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200">Review Your Shipment</h3>
		<div className="space-y-2 text-gray-700 dark:text-gray-200">
			<div><span className="font-medium">Name:</span> {formData.senderName}</div>
			{/* ...other review fields styled similarly... */}
		</div>
		<div className="flex gap-2 mt-4">
			<button onClick={() => onEdit(1)} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-4 rounded-md transition-colors">Edit Sender</button>
			<button onClick={() => onEdit(2)} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-4 rounded-md transition-colors">Edit Recipient</button>
			<button onClick={() => onEdit(3)} className="bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1 px-4 rounded-md transition-colors">Edit Package</button>
		</div>
	</div>
);

export default ReviewForm;
