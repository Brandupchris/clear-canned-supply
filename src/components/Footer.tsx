import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="text-base font-medium tracking-tight">
              Clear Canned Supply
            </Link>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs">Premium 16oz clear cans sold wholesale — 100 per box with lids included.

            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-medium mb-4">Shop</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/shop" className="hover:text-foreground transition-colors">
                  Order Now
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-medium mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-foreground transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-medium mb-4">Policies</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <Link to="/returns" className="hover:text-foreground transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/damaged-missing" className="hover:text-foreground transition-colors">
                  Damaged & Missing Items
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Clear Canned Supply. All rights reserved.
          </p>
          <a
            href="mailto:support@clearcanned.com"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            
            clearcannedsupply@gmail.com
          </a>
        </div>
      </div>
    </footer>);

};