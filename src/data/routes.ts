export interface Route {
  id: string;
  name: string;
  color: string;
  waypoints: [number, number][]; // [lat, lng]
  distance: string;
  duration: string;
}

export const MELBOURNE_ROUTES: Route[] = [
  {
    id: 'cbd-cultural',
    name: 'CBD Cultural Walk',
    color: '#FF6B6B',
    distance: '3.2 km',
    duration: '45 min',
    waypoints: [
      [-37.8179, 144.9668],
      [-37.8183, 144.9685],
      [-37.8160, 144.9635],
      [-37.8226, 144.9754],
      [-37.8259, 144.9732],
    ],
  },
  {
    id: 'fitzroy-arts',
    name: 'Fitzroy Arts Trail',
    color: '#4ECDC4',
    distance: '2.8 km',
    duration: '40 min',
    waypoints: [
      [-37.7993, 144.9784],
      [-37.8005, 144.9815],
      [-37.8021, 144.9842],
      [-37.8048, 144.9821],
    ],
  },
  {
    id: 'yarra-river',
    name: 'Yarra River Walk',
    color: '#95E1D3',
    distance: '4.5 km',
    duration: '60 min',
    waypoints: [
      [-37.8226, 144.9754],
      [-37.8252, 144.9801],
      [-37.8289, 144.9892],
      [-37.8312, 144.9956],
    ],
  },
  {
    id: 'laneways',
    name: 'Hidden Laneways',
    color: '#F38181',
    distance: '2.1 km',
    duration: '35 min',
    waypoints: [
      [-37.8136, 144.9631],
      [-37.8149, 144.9642],
      [-37.8162, 144.9658],
      [-37.8171, 144.9671],
    ],
  },
  {
    id: 'gardens',
    name: 'Royal Botanic Gardens Loop',
    color: '#AA96DA',
    distance: '3.8 km',
    duration: '50 min',
    waypoints: [
      [-37.8304, 144.9796],
      [-37.8321, 144.9812],
      [-37.8345, 144.9795],
      [-37.8328, 144.9768],
    ],
  },
];
