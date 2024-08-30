export type DroneData = {
  id: string;
  name: string;
  position: { lat: number; lon: number; alt: number };
  speed: number; // Скорость в м/с
  route: { lat: number; lon: number; alt: number }[]; // История полета
};

export const droneFlights: DroneData[] = [
  {
    id: "drone1",
    name: "Recon Alpha",
    position: { lat: 37.7749, lon: -122.4194, alt: 150 }, // Текущие координаты (Широта, Долгота, Высота)
    speed: 12, // Скорость в м/с
    route: [
      { lat: 37.7749, lon: -122.4194, alt: 150 },
      { lat: 37.775, lon: -122.42, alt: 160 },
      { lat: 37.7755, lon: -122.4205, alt: 155 },
      { lat: 37.776, lon: -122.421, alt: 150 },
    ], // Пройденный маршрут
  },
  {
    id: "drone2",
    name: "Scout Bravo",
    position: { lat: 34.0522, lon: -118.2437, alt: 120 },
    speed: 15,
    route: [
      { lat: 34.0522, lon: -118.2437, alt: 120 },
      { lat: 34.053, lon: -118.244, alt: 125 },
      { lat: 34.0535, lon: -118.2445, alt: 130 },
      { lat: 34.054, lon: -118.245, alt: 120 },
    ],
  },
  {
    id: "drone3",
    name: "Surveyor Charlie",
    position: { lat: 40.7128, lon: -74.006, alt: 100 },
    speed: 10,
    route: [
      { lat: 40.7128, lon: -74.006, alt: 100 },
      { lat: 40.713, lon: -74.0065, alt: 105 },
      { lat: 40.7135, lon: -74.007, alt: 110 },
      { lat: 40.714, lon: -74.0075, alt: 100 },
    ],
  },
  {
    id: "drone4",
    name: "Guardian Delta",
    position: { lat: 51.5074, lon: -0.1278, alt: 200 },
    speed: 8,
    route: [
      { lat: 51.5074, lon: -0.1278, alt: 200 },
      { lat: 51.508, lon: -0.1285, alt: 195 },
      { lat: 51.5085, lon: -0.129, alt: 190 },
      { lat: 51.509, lon: -0.1295, alt: 185 },
    ],
  },
];
