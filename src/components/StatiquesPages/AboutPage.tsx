//aboutPage.tsx
import { Globe, Shield, BarChart2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";


export default function AboutPage() {
  const stats = [
    { value: "10M+", label: "Active Users", icon: <Globe className="h-6 w-6" /> },
    { value: "98%", label: "Forecast Accuracy", icon: <Shield className="h-6 w-6" /> },
    { value: "24/7", label: "Service Availability", icon: <BarChart2 className="h-6 w-6" /> }
  ];

  return (
    <div className="bg-background">
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Revolutionizing weather information access through cutting-edge technology
          </p>
        </div>
      </section>

      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-6 text-lg leading-relaxed">
                Founded in 2024, ClimaVision combines meteorological expertise with AI technology
                to deliver the most accurate weather predictions available anywhere.
              </p>
              <p className="text-lg leading-relaxed">
                Our platform aggregates data from satellites, weather stations, and IoT sensors
                worldwide, processed through proprietary algorithms.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 h-full">
              <img 
                src="/logoClimaVision.png"
                alt="Weather technology" 
                className="w-full h-80 rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-background p-8 rounded-xl shadow-sm border text-center">
                <div className="flex justify-center mb-4 text-primary">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 

      <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience ClimaVision?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/features"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Explore Features
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
         <Footer />
    </div>
  );
}