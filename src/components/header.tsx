// header.tsx
import { useState } from 'react';
import { Link } from "react-router-dom";
import { ThemeToggle } from "./theme-toggle";
import { useTheme } from "@/context/theme-provider";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./SidebarPages/sidebar";

export function Header() {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Team", path: "/team" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <>
      <SignedIn>
        <Sidebar />
      </SignedIn>
      
      <SignedOut>
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  className="md:hidden text-foreground"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src={theme === "dark" ? "/logoClimaVision.png" : "/logoClimaVision.png"}
                    alt="ClimaVision logo"
                    className="h-40 w-50"
                  />
                </Link>
              </div>

              <nav className="hidden md:flex gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-sm font-medium hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <SignedOut>
                  <div className="hidden sm:flex gap-2">
                    <SignInButton mode="modal">
                      <button className="px-3 py-1 text-sm bg-transparent hover:bg-accent rounded">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                </SignedOut>
                <ThemeToggle />
              </div>
            </div>

            {mobileMenuOpen && (
              <div className="md:hidden pb-4">
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className="py-2 px-3 rounded-md hover:bg-accent"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <SignedOut>
                    <div className="flex gap-2 pt-2">
                      <SignInButton mode="modal">
                        <button 
                          className="w-full py-2 px-3 rounded-md bg-transparent hover:bg-accent text-sm font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign In
                        </button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <button 
                          className="w-full py-2 px-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Sign Up
                        </button>
                      </SignUpButton>
                    </div>
                  </SignedOut>
                </div>
              </div>
            )}
          </div>
        </header>
      </SignedOut>
    </>
  );
}