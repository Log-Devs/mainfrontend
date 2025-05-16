import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export const ThemeToggle = () => {
	const { theme, setTheme, resolvedTheme } = useTheme();

	const cycleTheme = () => {
		if (theme === 'light') setTheme('dark');
		else if (theme === 'dark') setTheme('system');
		else setTheme('light');
	};

	return (
		<button
			onClick={cycleTheme}
			className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200"
			aria-label="Toggle theme"
			title={
				theme === 'system'
					? 'Using system theme preference'
					: `Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} mode`
			}
		>
			{theme === 'light' && <Sun size={20} />}
			{theme === 'dark' && <Moon size={20} />}
			{theme === 'system' && (
				<div className="relative">
					<Monitor size={20} />
					<span className="absolute -bottom-1 -right-1 flex h-3 w-3">
						<span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${resolvedTheme === 'dark' ? 'bg-blue-300' : 'bg-yellow-300'} opacity-75`}></span>
						<span className={`relative inline-flex rounded-full h-3 w-3 ${resolvedTheme === 'dark' ? 'bg-blue-500' : 'bg-yellow-500'}`}></span>
					</span>
				</div>
			)}
		</button>
	);
};