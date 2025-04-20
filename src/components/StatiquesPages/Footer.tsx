import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, LifeBuoy, FileText, Code, Cookie } from "lucide-react";
import { SignedIn } from "@clerk/clerk-react";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Features", path: "/features" },
    { name: "Team", path: "/team" },
  ];
  
  const supportLinks = [
    { 
      name: "Help Center", 
      path: "/help-center",
      icon: <LifeBuoy className="h-4 w-4 mr-2" />
    },
    { 
      name: "Contact Us", 
      path: "/contact",
      icon: <Mail className="h-4 w-4 mr-2" />
    },
    { 
      name: "API Docs", 
      path: "/api-docs",
      icon: <Code className="h-4 w-4 mr-2" />
    }
  ];

  const legalLinks = [
    { 
      name: "Privacy Policy", 
      path: "/privacy",
      icon: <FileText className="h-4 w-4 mr-2" />
    },
    { 
      name: "Terms of Service", 
      path: "/terms",
      icon: <FileText className="h-4 w-4 mr-2" />
    },
    { 
      name: "Cookie Policy", 
      path: "/cookies",
      icon: <Cookie className="h-4 w-4 mr-2" />
    }
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, url: "#", label: "Facebook" },
    { icon: <Twitter className="h-5 w-5" />, url: "#", label: "Twitter" },
    { icon: <Instagram className="h-5 w-5" />, url: "#", label: "Instagram" },
    { icon: <Linkedin className="h-5 w-5" />, url: "#", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, url: "#", label: "GitHub" }
  ];

  return (
    <footer className={`bg-background border-t ${className}`}>
      <div className="container mx-auto px-4 py-12">
        <SignedIn>
          <div className="ml-64"></div>
        </SignedIn>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex flex-col h-full">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent">
                  ClimaVision
                </span>
              </Link>
              <p className="text-muted-foreground mb-6">
                Providing hyper-accurate weather forecasts powered by AI and advanced satellite data. 
                Trusted by millions worldwide for reliable weather predictions.
              </p>
              <div className="mt-auto">
                <h3 className="text-sm font-medium mb-3">NEWSLETTER</h3>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="px-4 py-2 rounded-md border border-muted-foreground/30 bg-background text-sm flex-1"
                  />
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grouped Links - Same Line */}
          <div className="grid grid-cols-3 md:col-span-2 gap-8">
            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4 flex items-center"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-muted-foreground hover:text-primary transition-colors hover:underline underline-offset-4 flex items-center"
                    >
                      {link.icon}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-muted-foreground/20 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} ClimaVision Technologies, Inc. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            
            <div className="h-5 border-l border-muted-foreground/30 hidden md:block"></div>
            
            <div className="flex gap-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-muted-foreground text-sm hover:text-primary transition-colors hover:underline underline-offset-4"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}