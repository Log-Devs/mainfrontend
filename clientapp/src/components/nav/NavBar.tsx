import React, { useState } from "react";
import { USER_NAME } from "../../app-config";
import { Menu, Bell, User as UserIcon, X } from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";

export default function NavBar({ hasNotifications = false }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Dynamic greeting based on time
	const getGreeting = () => {
		const hour = new Date().getHours();
		if (hour < 12) return "Good morning";
		if (hour < 18) return "Good afternoon";
		return "Good evening";
	};

	return (
		<header className="sticky top-0 z-30 w-full m-auto pb-5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
			<div className="flex items-center justify-between h-16 px-4 md:px-6">
				{/* Left side - Greeting */}
				<div className="flex items-center">
					<div className="ml-2 md:ml-4">
						<h1 className="text-base md:text-xl font-semibold text-standard-navy dark:text-white">
							{getGreeting()},<br />
							<span className="whitespace-nowrap">{USER_NAME}</span>
						</h1>
					</div>
				</div>

				{/* Right side - Controls */}
				<div className="flex items-center space-x-4">
					{/* Theme toggle from our new component */}
					<ThemeToggle />

					{/* Mobile menu toggle */}
					<button
						className="md:hidden p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						aria-label="Toggle menu"
					>
						{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
					</button>

					{/* Notification and Profile (desktop always visible) */}
					<div className={`${isMenuOpen ? 'absolute top-16 right-4 bg-white dark:bg-gray-900 p-2 rounded-lg shadow-lg md:shadow-none md:bg-transparent' : 'hidden'} md:flex md:static md:bg-transparent md:dark:bg-transparent md:p-0 items-center space-x-4`}>
						<button
							className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 relative"
							aria-label="Notifications"
						>
							<Bell className="h-5 w-5" />
							{hasNotifications && (
								<span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
							)}
						</button>

						<button
							className="flex items-center p-1 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-transform duration-200 hover:scale-105"
							aria-label="User menu"
						>
							<div className="h-8 w-8 rounded-full bg-standard-navy hover:bg-red-600 transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-red-500 text-white flex items-center justify-center">
								<UserIcon className="h-5 w-5" />
							</div>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}