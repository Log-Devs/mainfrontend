declare module '@headlessui/react' {
	export const Switch: React.ComponentType<{
		checked: boolean;
		onChange: (checked: boolean) => void;
		className?: string;
		children?: React.ReactNode;
		[key: string]: unknown;
	}>;
}