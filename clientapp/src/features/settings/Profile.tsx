import { DUMMY_USER } from "../../app-config";

//   // TODO: Fetch user profile from API here// useEffect(() => {// API: Placeholder for fetching and updating user profile// import axios from "axios"; // Uncomment when ready to use APIs

//   // Example: axios.get('/api/profile').then(...)
// }, []);
// const handleUpdateProfile = (profileData) => {
//   // TODO: Update user profile via API here
//   // Example: axios.put('/api/profile', profileData).then(...)
// };

const ProfileField = ({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon: string;
}) => (
	<div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-2 shadow-sm">
		<span className="text-lg">{icon}</span>
		<span className="font-medium text-gray-700 dark:text-gray-300 w-24">
			{label}:
		</span>
		<span className="text-gray-900 dark:text-gray-100 truncate">{value}</span>
	</div>
);

const Profile = () => (
	<div className="max-w-lg mx-auto mt-12 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-10 border border-gray-100 dark:border-gray-800 flex flex-col items-center">
		<div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-red-400 flex items-center justify-center text-4xl font-bold text-white mb-4 shadow-lg">
			{DUMMY_USER.fullName
				.split(" ")
				.map((n) => n[0])
				.join("")}
		</div>
		<h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
			{DUMMY_USER.fullName}
		</h2>
		<span className="text-sm text-gray-500 dark:text-gray-400 mb-6 capitalize">
			{DUMMY_USER.role}
		</span>
		<div className="w-full space-y-4">
			<ProfileField label="Email" value={DUMMY_USER.email} icon="@" />
			<ProfileField label="Phone" value={DUMMY_USER.phone} icon="📞" />
			<ProfileField label="Address" value={DUMMY_USER.address} icon="🏠" />
			<div className="grid grid-cols-2 gap-4">
				<ProfileField label="City" value={DUMMY_USER.city} icon="🏙️" />
				<ProfileField label="State" value={DUMMY_USER.state} icon="🗺️" />
				<ProfileField label="ZIP" value={DUMMY_USER.zip} icon="#" />
				<ProfileField label="Country" value={DUMMY_USER.country} icon="🌎" />
			</div>
		</div>
		<button className="mt-8 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow transition-all">
			Edit Profile
		</button>
	</div>
);

export default Profile;
