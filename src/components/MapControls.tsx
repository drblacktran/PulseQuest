import { Route } from '../data/routes';

interface MapControlsProps {
  showRoutes: boolean;
  onToggleRoutes: () => void;
  filterOpenOnly: boolean;
  onToggleOpenFilter: () => void;
  routes: Route[];
  selectedRoute: string | null;
  onSelectRoute: (routeId: string | null) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  showRoutes,
  onToggleRoutes,
  filterOpenOnly,
  onToggleOpenFilter,
  routes,
  selectedRoute,
  onSelectRoute,
}) => {
  return (
    <div className="map-controls">
      <h3 className="controls-title">PulseQuest</h3>

      <div className="control-group">
        <label>
          <input type="checkbox" checked={showRoutes} onChange={onToggleRoutes} />
          Show Routes
        </label>
      </div>

      <div className="control-group">
        <label>
          <input type="checkbox" checked={filterOpenOnly} onChange={onToggleOpenFilter} />
          Open Now Only
        </label>
      </div>

      {showRoutes && (
        <div className="routes-list">
          <h4>Available Routes</h4>
          {routes.map((route) => (
            <div
              key={route.id}
              className={`route-item ${selectedRoute === route.id ? 'selected' : ''}`}
              onClick={() => onSelectRoute(selectedRoute === route.id ? null : route.id)}
            >
              <div className="route-color" style={{ backgroundColor: route.color }} />
              <div className="route-info">
                <strong>{route.name}</strong>
                <span>{route.distance} &bull; {route.duration}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapControls;
