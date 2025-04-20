import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react"; // Ajout de useUser
import { Map, Menu, X, Newspaper, HelpCircleIcon, CalendarClock } from "lucide-react";
import { ThemeToggle } from "../theme-toggle";
import { useTheme } from "@/context/theme-provider";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { DashboardIcon } from "@radix-ui/react-icons";

export function Sidebar() {
  const { theme } = useTheme();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useUser(); // Récupération des infos utilisateur

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon className="h-5 w-5" /> },
    { name: "Map", path: "/map", icon: <Map className="h-5 w-5" /> },
    { name: "Weather News", path: "/weather-news", icon: <Newspaper className="h-5 w-5" /> },
    { name: "ClimaVision Assistant", path: "/ai-assistant", icon: <HelpCircleIcon className="h-5 w-5" /> },
    { name: "Calendar", path: "/calendarPage", icon: <CalendarClock className="h-5 w-5" /> },
  ];

  return (
    <>
      <button
        className={cn(
          "md:hidden fixed bottom-6 left-6 z-50 p-3 bg-primary text-primary-foreground rounded-full shadow-lg",
          "transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen ? "left-[17rem]" : "left-6"
        )}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={cn(
          "fixed left-0 top-0 h-screen w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          "z-40 transition-all duration-300 ease-in-out transform",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4 overflow-y-auto">
          <div className="flex flex-col gap-3 p-3">
            <Link to="/" className="flex items-center gap-3">
              <img
                src={theme === "dark" ? "/logoClimaVision.png" : "/logoClimaVision.png"}
                alt="ClimaVision"
                className="h-25 w-28 "
              />
            </Link>
            
            
          </div>

          <nav className="flex-1 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md transition-colors",
                  location.pathname.startsWith(link.path)
                    ? "bg-accent font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-4 border-t">
            <div className="flex items-center justify-between p-2">
              {/* Profil utilisateur */}
            {user && (
              <div className="flex items-center gap-3  p-2 rounded-lg ">
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8"
                    }
                  }}
                />
                <div className="truncate">
                  <p className="text-sm font-medium truncate">
                    {user.fullName || user.username}
                  </p>
                 
                </div>
              </div>
            )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}