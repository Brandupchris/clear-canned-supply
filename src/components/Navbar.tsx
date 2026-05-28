import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Order Now", to: "/shop" },
  { label: "Track Order", to: "/track" },
  { label: "Contact Us", to: "/contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Clear Canned Supply" className="h-8" width={244} height={32} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors ${
                location.pathname === link.to
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <CartDrawer />
          <Link
            to="/account"
            className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <CartDrawer />
          <button
            onClick={() => setOpen(!open)}
            className="p-1 text-foreground"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <nav
        className={`md:hidden overflow-hidden border-t border-border bg-background transition-all duration-200 ease-in-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm transition-colors ${
                location.pathname === link.to
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className={`flex items-center gap-2 py-2.5 text-sm transition-colors ${
              location.pathname === "/account"
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-4 h-4" />
            Account
          </Link>
        </div>
      </nav>
    </header>
  );
};
