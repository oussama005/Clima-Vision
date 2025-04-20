import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Cloud, Wind, Gauge, Sunrise, Sunset, MapPin } from "lucide-react";

const createMarkerIcon = () => {
  return L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

interface WeatherData {
  temperature: string;
  feelsLike: string;
  precipitation: string;
  windSpeed: string;
  windDirection: string;
  humidity: string;
  clouds: string;
  pressure: string;
  sunrise: string;
  sunset: string;
  location: string;
}

export function WeatherMap() {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<[number, number]>([31.63, -8.00]);

  const fetchWeatherData = (lat: number, lng: number): WeatherData => {
    return {
      temperature: `${(Math.random() * 10 + 18).toFixed(1)}°C`,
      feelsLike: `${(Math.random() * 10 + 17).toFixed(1)}°C`,
      precipitation: `${Math.floor(Math.random() * 5)}mm`,
      windSpeed: `${Math.floor(Math.random() * 20 + 5)} km/h`,
      windDirection: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.floor(Math.random() * 8)],
      humidity: `${Math.floor(Math.random() * 40 + 30)}%`,
      clouds: `${Math.floor(Math.random() * 100)}%`,
      pressure: `${Math.floor(Math.random() * 20 + 1000)} hPa`,
      sunrise: '06:45',
      sunset: '19:30',
      location: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`
    };
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView(selectedLocation, 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapRef.current);

    // Handle map click
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setSelectedLocation([lat, lng]);
      
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: createMarkerIcon() })
          .addTo(mapRef.current!)
          .bindPopup(`Selected location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`)
          .openPopup();
      }

      setWeatherData(fetchWeatherData(lat, lng));
    };

    mapRef.current.on('click', handleMapClick);

    // Initial marker
    markerRef.current = L.marker(selectedLocation, { icon: createMarkerIcon() })
      .addTo(mapRef.current)
      .bindPopup('Default location: Marrakech')
      .openPopup();

    setWeatherData(fetchWeatherData(...selectedLocation));

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            Weather Map & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Map Section - Height matches details */}
            <div className="lg:col-span-2 h-full">
              <div 
                ref={mapContainerRef} 
                className="h-full w-full rounded-lg border shadow-sm"
              />
            </div>

            {/* Weather Details - Scrollable container */}
            {weatherData && (
              <div className="space-y-4 overflow-y-auto pr-2">
                {/* Current Weather Summary */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg p-4 border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Weather</p>
                      <p className="text-3xl font-bold">{weatherData.temperature}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Feels like</p>
                      <p className="text-xl font-medium">{weatherData.feelsLike}</p>
                    </div>
                  </div>
                </div>

                {/* Precipitation Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Precipitation</h3>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{weatherData.precipitation}</span>
                    <p className="text-sm text-muted-foreground">Last 24h: {weatherData.precipitation}</p>
                  </div>
                </div>

                {/* Wind Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <Wind className="h-5 w-5 text-blue-500" />
                    <h3 className="font-semibold">Wind</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Speed</p>
                      <p className="text-lg font-medium">{weatherData.windSpeed}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Direction</p>
                      <p className="text-lg font-medium">{weatherData.windDirection}</p>
                    </div>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border shadow-sm">
                  <h3 className="font-semibold mb-3">Weather Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Cloud className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Cloud Cover</p>
                        <p className="font-medium">{weatherData.clouds}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Humidity</p>
                        <p className="font-medium">{weatherData.humidity}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Gauge className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Pressure</p>
                        <p className="font-medium">{weatherData.pressure}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sunrise className="h-5 w-5 text-orange-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Sunrise</p>
                        <p className="font-medium">{weatherData.sunrise}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sunset className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-muted-foreground">Sunset</p>
                        <p className="font-medium">{weatherData.sunset}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border shadow-sm">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-sm text-muted-foreground">Selected Location</p>
                      <p className="font-medium">{weatherData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}