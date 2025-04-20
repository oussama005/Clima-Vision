import { Footer } from "../StatiquesPages/Footer";
import { Cookie } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <section className="py-20 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4 shadow-sm">
            <Cookie className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary">
              Cookie Usage
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Cookie Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn how we use cookies and similar technologies to enhance your experience.
          </p>
        </div>
      </section>

      <section className="py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit websites. They help sites remember information about your visit.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>We use cookies for:</p>
            <ul>
              <li>Essential site functionality</li>
              <li>Performance analytics</li>
              <li>Personalized weather preferences</li>
              <li>Advertising (opt-out available)</li>
            </ul>

            <h2>3. Cookie Types</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden text-sm">
                <thead>
                  <tr className="bg-muted">
                    <th className="text-left p-3 font-semibold">Type</th>
                    <th className="text-left p-3 font-semibold">Purpose</th>
                    <th className="text-left p-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-3">Strictly Necessary</td>
                    <td className="p-3">Core functionality</td>
                    <td className="p-3">Session</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-3">Preferences</td>
                    <td className="p-3">Remember settings</td>
                    <td className="p-3">1 year</td>
                  </tr>
                  <tr>
                    <td className="p-3">Analytics</td>
                    <td className="p-3">Improve services</td>
                    <td className="p-3">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Managing Cookies</h2>
            <p>
              You can control cookies through your browser settings. Disabling cookies may affect service functionality.
            </p>

            <h2>5. Third-Party Cookies</h2>
            <p>
              We use trusted analytics providers like Google Analytics to understand usage patterns and improve our services.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
