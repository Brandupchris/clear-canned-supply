import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, User, type LucideIcon } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { accountNavLink, mainNavLinks } from "@/lib/nav";
import logo from "@/assets/logo.png";

const desktopNavLinks = mainNavLinks.filter((link) => link.to !== "/order-now");

const navLinkClass = (active: boolean) =>
  `flex items-center gap-3 rounded-sm px-3 py-3 text-sm transition-colors ${
    active
      ? "bg-secondary text-foreground font-bold"
      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
  }`;

const NavIcon = ({ icon: Icon, active }: { icon: LucideIcon; active: boolean }) => (
  <Icon
    className={`w-4 h-4 shrink-0 ${active ? "text-foreground" : "text-muted-foreground"}`}
    strokeWidth={1.75}
    aria-hidden
  />
);

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    if (to === "/order-now")
      return location.pathname === "/order-now" || location.pathname === "/shop";
    return location.pathname.startsWith(to);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 h-14 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <img src={logo} alt="Clear Canned Supply" className="h-8" width={244} height={32} />
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <nav className="hidden lg:flex items-center gap-5">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-sans text-sm transition-colors ${
                  isActive(link.to)
                    ? "text-foreground font-bold"
                    : "text-muted-foreground font-normal hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/order-now"
            className="type-cta inline-flex items-center gap-1.5 h-9 px-4 sm:px-5 bg-primary text-primary-foreground text-xs sm:text-sm rounded-sm transition-colors hover:bg-foreground/90 shrink-0"
          >
            Order Now
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
          <CartDrawer />
          <Link
            to="/account"
            className="hidden md:block p-1.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5" />
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="lg:hidden p-1 text-foreground"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100vw-3rem,20rem)] p-0 flex flex-col">
              <SheetHeader className="px-6 py-5 border-b border-border text-left">
                <SheetTitle className="text-base font-bold tracking-tight">
                  Menu
                </SheetTitle>
              </SheetHeader>
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {mainNavLinks.map((link) => {
                  const active = isActive(link.to);
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={navLinkClass(active)}
                    >
                      <NavIcon icon={Icon} active={active} />
                      {link.label}
                    </Link>
                  );
                })}
                <Link
                  to={accountNavLink.to}
                  onClick={() => setOpen(false)}
                  className={navLinkClass(isActive(accountNavLink.to))}
                >
                  <NavIcon icon={accountNavLink.icon} active={isActive(accountNavLink.to)} />
                  {accountNavLink.label}
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
