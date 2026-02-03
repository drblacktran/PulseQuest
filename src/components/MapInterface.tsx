import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MELBOURNE_ATTRACTIONS, ATTRACTION_COLORS, Attraction } from '../data/attractions';
import { MELBOURNE_ROUTES } from '../data/routes';
import LocationDetailsPanel from './LocationDetailsPanel';
import MapControls from './MapControls';
import '../styles/MapInterface.css';

const MELBOURNE_CENTER: [number, number] = [-37.8136, 144.9631];

// Fix default Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

function createColoredIcon(color: string) {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 24px;
      height: 24px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });
}

function UserLocationMarker() {
  const map = useMap();
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc: [number, number] = [pos.coords.latitude, pos.coords.longitude];
          setPosition(loc);
          map.setView(loc, 14);
        },
        () => {
          map.setView(MELBOURNE_CENTER, 14);
        }
      );
    }
  }, [map]);

  if (!position) return null;

  return (
    <CircleMarker
      center={position}
      radius={10}
      pathOptions={{ color: '#4285F4', fillColor: '#4285F4', fillOpacity: 0.8 }}
    >
      <Popup>Your Location</Popup>
    </CircleMarker>
  );
}

function ZoomFilteredMarkers({
  attractions,
  onSelect,
}: {
  attractions: Attraction[];
  onSelect: (a: Attraction) => void;
}) {
  const map = useMap();
  const [zoom, setZoom] = useState(map.getZoom());

  useEffect(() => {
    const handler = () => setZoom(map.getZoom());
    map.on('zoomend', handler);
    return () => { map.off('zoomend', handler); };
  }, [map]);

  // Limit markers at low zoom levels
  let maxMarkers = attractions.length;
  if (zoom <= 12) maxMarkers = 5;
  else if (zoom <= 13) maxMarkers = 10;
  else if (zoom <= 14) maxMarkers = 15;

  const visible = attractions.slice(0, maxMarkers);

  return (
    <>
      {visible.map((attraction) => (
        <Marker
          key={attraction.id}
          position={attraction.position}
          icon={createColoredIcon(ATTRACTION_COLORS[attraction.type] || '#9C27B0')}
          eventHandlers={{ click: () => onSelect(attraction) }}
        >
          <Popup>
            <strong>{attraction.name}</strong>
            <br />
            {attraction.rating} / 5
          </Popup>
        </Marker>
      ))}
    </>
  );
}

const MapInterface: React.FC = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [showRoutes, setShowRoutes] = useState(false);
  const [filterOpenOnly, setFilterOpenOnly] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const filteredAttractions = filterOpenOnly
    ? MELBOURNE_ATTRACTIONS.filter((a) => a.isOpen)
    : MELBOURNE_ATTRACTIONS;

  return (
    <div className="map-container">
      <MapContainer
        center={MELBOURNE_CENTER}
        zoom={14}
        style={{ width: '100%', height: '100vh' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <UserLocationMarker />

        <ZoomFilteredMarkers
          attractions={filteredAttractions}
          onSelect={setSelectedAttraction}
        />

        {/* Routes - User Story 1.3 */}
        {showRoutes &&
          MELBOURNE_ROUTES.map((route) => (
            <Polyline
              key={route.id}
              positions={route.waypoints}
              pathOptions={{
                color: route.color,
                opacity: selectedRoute === route.id ? 1.0 : 0.5,
                weight: selectedRoute === route.id ? 6 : 3,
              }}
              eventHandlers={{
                click: () => setSelectedRoute(route.id),
              }}
            />
          ))}
      </MapContainer>

      {/* Legend */}
      <div className="map-legend">
        <h4>Legend</h4>
        {Object.entries(ATTRACTION_COLORS).map(([type, color]) => (
          <div key={type} className="legend-item">
            <span className="legend-dot" style={{ backgroundColor: color }} />
            <span>{type.replace('_', ' ')}</span>
          </div>
        ))}
      </div>

      {/* Controls */}
      <MapControls
        showRoutes={showRoutes}
        onToggleRoutes={() => setShowRoutes(!showRoutes)}
        filterOpenOnly={filterOpenOnly}
        onToggleOpenFilter={() => setFilterOpenOnly(!filterOpenOnly)}
        routes={MELBOURNE_ROUTES}
        selectedRoute={selectedRoute}
        onSelectRoute={setSelectedRoute}
      />

      {/* Details Panel */}
      {selectedAttraction && (
        <LocationDetailsPanel
          attraction={selectedAttraction}
          onClose={() => setSelectedAttraction(null)}
        />
      )}
    </div>
  );
};

export default MapInterface;
