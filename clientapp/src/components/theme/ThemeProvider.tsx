import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ThemeContextType = {
	theme: Theme;
	systemTheme: 'light' | 'dark';
	setTheme: (theme: Theme) => void;
	resolvedTheme: 'light' | 'dark'; // The actual theme being applied (resolving 'system')
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	// Get initial theme from localStorage or default to 'system'
	const [theme, setThemeState] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('theme') as Theme) || 'system';
		}
		return 'system';
	});

	// Track the system theme separately
	const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

	// The resolved theme is the actual theme applied (when theme is 'system', use systemTheme)
	const resolvedTheme = theme === 'system' ? systemTheme : theme;

	useEffect(() => {
		// Detect system theme using prefers-color-scheme media query
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

		const handleChange = () => {
			setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
		};

		// Set the initial value
		handleChange();

		// Add listener for changes
		mediaQuery.addEventListener('change', handleChange);

		// Clean up
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	// Update document classes when theme changes
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;

		if (resolvedTheme === 'dark') {
			html.classList.add('dark');
			html.classList.remove('light');
			body.classList.add('dark');
			body.classList.remove('light');
		} else {
			html.classList.add('light');
			html.classList.remove('dark');
			body.classList.add('light');
			body.classList.remove('dark');
		}

		// Save the user's explicit theme choice (not the resolved theme)
		localStorage.setItem('theme', theme);
	}, [resolvedTheme, theme]);

	const setTheme = (newTheme: Theme) => {
		setThemeState(newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, systemTheme, resolvedTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Custom hook to use the theme
export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};