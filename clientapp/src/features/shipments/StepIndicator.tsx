const StepIndicator = ({ step }: { step: number }) => (
	<div className="flex items-center justify-center gap-4 mb-6">
		{[1, 2, 3, 4].map((s) => (
			<div key={s} className="flex items-center">
				<div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-semibold
					${step === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-gray-300 dark:border-gray-600'}`}>{s}</div>
				{s < 4 && <div className="w-8 h-1 bg-gray-200 dark:bg-gray-700 mx-2 rounded" />}
			</div>
		))}
		<span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Step {step} of 4</span>
	</div>
);

export default StepIndicator;
