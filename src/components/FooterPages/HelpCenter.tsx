import { Footer } from "../StatiquesPages/Footer";
import { LifeBuoy, MessageSquare, Clock, Mail } from "lucide-react";


export default function HelpCenter() {
  const faqs = [
    {
      question: "How do I interpret the weather symbols?",
      answer: "Each symbol represents specific weather conditions. Hover over any symbol to see a detailed description."
    },
    {
      question: "Why is my location not showing accurate data?",
      answer: "Ensure location services are enabled. If issues persist, try manually entering your coordinates for precision."
    },
    {
      question: "How often is the weather data updated?",
      answer: "Our forecasts update every 15 minutes using live satellite and sensor data for maximum accuracy."
    }
  ];

  const supportChannels = [
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Live Chat",
      description: "Instant support from our weather experts",
      action: "Start Chat"
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email Support",
      description: "Response within 24 hours",
      action: "support@climavision.com"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Emergency Contact",
      description: "For critical weather events",
      action: "+1 (555) 911-WEATHER"
    }
  ];

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <LifeBuoy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help?</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions or connect with our weather support team
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-background border rounded-xl p-6 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/5 rounded-xl p-8 h-fit sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Support Channels</h3>
              <div className="space-y-6">
                {supportChannels.map((channel, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      {channel.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{channel.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                      <span className="text-primary text-sm font-medium">{channel.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">API Documentation</h2>
            <p className="text-xl text-muted-foreground mb-8">
              For developers looking to integrate ClimaVision's weather data
            </p>
         
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}