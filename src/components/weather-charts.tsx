import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";

interface WeatherChartProps {
  forecastData: ForecastData;
}

interface ChartDataPoint {
  date: Date;
  time: string;
  temp: number;
  feels_like: number;
  humidity: number;
  wind: number;
  pressure: number;
}

export function WeatherCharts({ forecastData }: WeatherChartProps) {
  // Préparer les données pour les graphiques
  const chartData: ChartDataPoint[] = forecastData.list.map(item => {
    const date = new Date(item.dt * 1000);
    return {
      date,
      time: format(date, 'HH:mm'),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
      humidity: item.main.humidity,
      wind: Math.round(item.wind.speed * 3.6), // Convert to km/h
      pressure: item.main.pressure
    };
  });

  // Fonction de formatage sécurisée pour le tooltip
  const safeFormatDate = (date: Date) => {
    try {
      return format(date, 'PPpp');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Temperature Chart */}
          <div className="h-80">
            <h3 className="text-lg font-semibold mb-2">Temperature & Feels Like</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={(time) => time}
                  interval={Math.floor(chartData.length / 5)}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value}°C`, value === 'temp' ? 'Temperature' : 'Feels Like']}
                  labelFormatter={(value) => {
                    // Trouver le point de données correspondant
                    const dataPoint = chartData.find(item => item.time === value);
                    return dataPoint ? safeFormatDate(dataPoint.date) : value;
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#8884d8" 
                  name="Temperature" 
                  dot={false}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="feels_like" 
                  stroke="#82ca9d" 
                  name="Feels Like" 
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Humidity & Wind Chart */}
          <div className="h-80">
            <h3 className="text-lg font-semibold mb-2">Humidity & Wind Speed</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="time" 
                  tickFormatter={(time) => time}
                  interval={Math.floor(chartData.length / 5)}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'humidity' ? `${value}%` : `${value} km/h`,
                    name === 'humidity' ? 'Humidity' : 'Wind Speed'
                  ]}
                  labelFormatter={(value) => {
                    const dataPoint = chartData.find(item => item.time === value);
                    return dataPoint ? safeFormatDate(dataPoint.date) : value;
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#8884d8" 
                  name="Humidity" 
                  dot={false}
                  strokeWidth={2}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="wind" 
                  stroke="#ff7300" 
                  name="Wind Speed" 
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}