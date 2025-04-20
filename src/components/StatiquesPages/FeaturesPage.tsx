import { CheckCircle } from "lucide-react";
import { Footer } from "./Footer";
import { SignUpButton } from "@clerk/clerk-react";

export default function FeaturesPage() {
  const features = [
    {
      title: "Real-time Forecasts",
      description: "Weather data updated every 15 minutes for your exact location",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "Hourly Predictions",
      description: "View weather changes hour-by-hour for the next 48 hours",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "7-Day Forecast",
      description: "Plan your week with our accurate daily predictions",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "City Search",
      description: "Check weather for any city worldwide",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "Weather Alerts",
      description: "Instant notifications for dangerous conditions",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    },
    {
      title: "Customizable Interface",
      description: "Light/dark theme and measurement units",
      icon: <CheckCircle className="h-6 w-6 text-green-500" />
    }
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Key Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover what makes ClimaVision the most reliable weather companion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index}
            className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              {feature.icon}
              <h3 className="text-xl font-semibold">{feature.title}</h3>
            </div>
            <p className="text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to try ClimaVision?</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          Join thousands of users who trust our accurate forecasts daily.
        </p>
        <SignUpButton mode="modal">
        <button className="inline-flex items-center justify-center px-6 py-3 bg-primary mb-10 text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
        Get Started
        </button>
        </SignUpButton>
     
      </div>
       <Footer />
    </div>
  );
}