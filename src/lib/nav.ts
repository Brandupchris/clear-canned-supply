import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  CircleHelp,
  Home,
  Info,
  Mail,
  PackageSearch,
  ShoppingBag,
  User,
} from "lucide-react";

export type NavLink = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const mainNavLinks: NavLink[] = [
  { label: "Home", to: "/", icon: Home },
  { label: "Order Now", to: "/order-now", icon: ShoppingBag },
  { label: "About", to: "/about", icon: Info },
  { label: "FAQ", to: "/faq", icon: CircleHelp },
  { label: "Track Order", to: "/track", icon: PackageSearch },
  { label: "Contact Us", to: "/contact", icon: Mail },
  { label: "Wholesale", to: "/wholesale", icon: Boxes },
];

export const accountNavLink: NavLink = {
  label: "Account",
  to: "/account",
  icon: User,
};
