import { useEffect, useRef } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

interface DraggableMarkerProps {
	position: { lat: number; lon: number };
	onDragEnd: (lat: number, lon: number) => void;
	animateBounce: boolean;
}

export const DraggableMarker = ({ position, onDragEnd, animateBounce }: DraggableMarkerProps) => {
	const markerRef = useRef<L.Marker | null>(null);
	useMapEvents({
		dragend() {
			const marker = markerRef.current;
			if (marker != null) {
				const { lat, lng } = marker.getLatLng();
				onDragEnd(lat, lng);
			}
		},
	});
	useEffect(() => {
		if (animateBounce && markerRef.current) {
			const marker = markerRef.current;
			if (marker) {
				const icon = marker.getIcon();
				marker.setIcon(
					L.divIcon({
						...icon.options,
						className: `${icon.options.className} bounce`,
					})
				);
				setTimeout(() => {
					marker.setIcon(
						L.divIcon({
							...icon.options,
							className: icon.options.className?.replace(" bounce", ""),
						})
					);
				}, 700);
			}
		}
	}, [position, animateBounce]);
	return (
		<Marker
			draggable
			eventHandlers={{
				dragend: () => {
					const marker = markerRef.current;
					if (marker != null) {
						const { lat, lng } = marker.getLatLng();
						onDragEnd(lat, lng);
					}
				},
			}}
			position={[position.lat, position.lon]}
			ref={markerRef}
			icon={L.icon({
				iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
				shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
				iconSize: [25, 41],
				iconAnchor: [12, 41],
				popupAnchor: [1, -34],
				shadowSize: [41, 41],
				className: 'leaflet-marker-bounce'
			})}
		/>
	);
};
