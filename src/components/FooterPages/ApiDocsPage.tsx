import { Footer } from "../StatiquesPages/Footer";
import { Code, Cpu, Key, Terminal } from "lucide-react";

export default function ApiDocsPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/weather",
      description: "Current weather data for any location",
      params: "lat, lon, units"
    },
    {
      method: "GET",
      path: "/forecast",
      description: "5-day weather forecast with 3-hour intervals",
      params: "lat, lon, cnt, units"
    },
    {
      method: "GET",
      path: "/air-quality",
      description: "Real-time air quality index and pollutants",
      params: "lat, lon"
    }
  ];

  const codeExample = `fetch('https://api.climavision.com/data/2.5/weather?lat=35&lon=139&appid=YOUR_API_KEY')
  .then(response => response.json())
  .then(data => console.log(data));`;

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Code className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Developer Portal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">API Documentation</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate ClimaVision's weather data into your applications
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>
              
              <div className="space-y-6 mb-12">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="bg-background border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        endpoint.method === "GET" ? "bg-blue-100 text-blue-800" : 
                        endpoint.method === "POST" ? "bg-green-100 text-green-800" : 
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="font-mono text-primary">{endpoint.path}</code>
                    </div>
                    <p className="text-muted-foreground mb-3">{endpoint.description}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Parameters:</span>
                      <span className="font-mono">{endpoint.params}</span>
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-6">Quick Start</h3>
              <div className="bg-gray-900 rounded-xl p-6 mb-8">
                <pre className="text-gray-300 font-mono text-sm overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-secondary/5 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">API Keys</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Register for a developer account to get your API key and access our weather data.
                </p>
              
              </div>

              <div className="bg-secondary/5 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">Rate Limits</h3>
                </div>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Free tier: 60 requests/minute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Pro tier: 300 requests/minute</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Enterprise: Custom limits</span>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/5 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-semibold">SDKs</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Official client libraries for popular programming languages.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {['JavaScript', 'React', 'Vite', 'TypeScript'].map((lang) => (
                    <span key={lang} className="bg-background px-3 py-2 rounded-md text-sm text-center">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}