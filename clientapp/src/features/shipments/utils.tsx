// Utility functions for shipment forms

export function highlightMatch(text: string, query: string) {
	if (!query) return text;
	const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")})`, 'ig');
	return text.split(regex).map((part, i) =>
		regex.test(part) ? <span key={ i } style = {{ fontWeight: 'bold', background: '#e0e7ff' }}> { part } </span> : part
  );
}

export async function reverseGeocode(lat: number, lon: number) {
	const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
	const res = await fetch(url);
	const data = await res.json();
	return data.address || {};
}
