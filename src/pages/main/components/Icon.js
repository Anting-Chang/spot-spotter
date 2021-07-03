import L from 'leaflet';
import markerRed from "../../../assets/red-marker.svg";
import markerBlue from "../../../assets/blue-marker.svg";

export const redIcon = new L.Icon({
    iconUrl: markerRed,
    iconRetinaUrl: markerRed,
    popupAnchor:  [-0, -0],
    iconSize: [30,30],
    iconAnchor: [15, 30]
});
export const blueIcon = new L.Icon({
    iconUrl: markerBlue,
    iconRetinaUrl: markerBlue,
    popupAnchor:  [-0, -0],
    iconSize: [30,30],
    iconAnchor: [15, 30]
});