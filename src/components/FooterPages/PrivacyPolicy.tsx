import { Footer } from "../StatiquesPages/Footer";
import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-background min-h-screen flex flex-col">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Data Protection</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2>1. Information We Collect</h2>
            <p>
              We collect personal information you provide when using our services, including:
            </p>
            <ul>
              <li>Contact information (email, name)</li>
              <li>Location data for weather services</li>
              <li>Usage data and analytics</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>
              Your data helps us provide and improve our weather services, including:
            </p>
            <ul>
              <li>Delivering personalized weather forecasts</li>
              <li>Improving forecast accuracy</li>
              <li>Service optimization and research</li>
            </ul>

            <h2>3. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share anonymized weather data with:
            </p>
            <ul>
              <li>Meteorological research organizations</li>
              <li>Government agencies for public safety</li>
              <li>Service providers under strict confidentiality</li>
            </ul>

            <h2>4. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal data. Contact our Data Protection Officer at dpo@climavision.com.
            </p>

            <h2>5. Security Measures</h2>
            <p>
              We implement industry-standard security including encryption, access controls, and regular audits to protect your data.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}