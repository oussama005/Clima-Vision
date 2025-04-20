import { Footer } from "../StatiquesPages/Footer";
import { FileText } from "lucide-react";

export default function TermsOfService() {
  const formattedDate = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4 shadow-sm">
            <FileText className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary">
              Legal Terms
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Effective date: {formattedDate}
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using ClimaVision services, you agree to be bound by these Terms. If you disagree, you may not use our services.
            </p>

            <h2>2. Service Description</h2>
            <p>
              ClimaVision provides weather forecasting services through various platforms including web, mobile, and API services.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Use services only for lawful purposes</li>
              <li>Not misuse or disrupt our services</li>
              <li>Comply with all applicable laws</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All weather data, forecasts, and proprietary algorithms are owned by ClimaVision and protected by copyright laws.
            </p>

            <h2>5. Limitation of Liability</h2>
            <p>
              ClimaVision provides weather data "as is" and is not liable for decisions made based on our forecasts. Weather predictions are probabilistic in nature.
            </p>

            <h2>6. Modifications</h2>
            <p>
              We may modify these Terms at any time. Continued use constitutes acceptance of revised Terms.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
