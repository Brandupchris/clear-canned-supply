import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link to="/" className="font-sans text-base font-bold tracking-tight text-white hover:text-white/80 transition-colors">
              Clear Canned Supply
            </Link>
            <p className="font-sans text-sm font-normal text-white/70 mt-3 leading-relaxed max-w-xs">
              Premium 16oz clear cans sold wholesale — 100 per box with lids included.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-sans text-sm font-bold mb-4 text-white">Shop</h4>
            <ul className="space-y-2.5 font-sans text-sm font-normal text-white/70">
              <li>
                <Link to="/order-now" className="hover:text-white transition-colors">
                  Order Now
                </Link>
              </li>
              <li>
                <Link to="/wholesale" className="hover:text-white transition-colors">
                  Wholesale
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-sm font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2.5 font-sans text-sm font-normal text-white/70">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/track" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-sans text-sm font-bold mb-4 text-white">Policies</h4>
            <ul className="space-y-2.5 font-sans text-sm font-normal text-white/70">
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/damaged-missing" className="hover:text-white transition-colors">
                  Damaged & Missing Items
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs font-normal text-white/70">
            © {new Date().getFullYear()} Clear Canned Supply. All rights reserved.
          </p>
          <a
            href="mailto:clearcannedsupply@gmail.com"
            className="font-sans text-xs font-normal text-white/70 hover:text-white transition-colors"
          >
            clearcannedsupply@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );

};