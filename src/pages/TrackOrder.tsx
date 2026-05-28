import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { SHOPIFY_ACCOUNT_ORDERS_URL } from "@/lib/shopifyConfig";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;
    window.open(SHOPIFY_ACCOUNT_ORDERS_URL, "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 sm:py-24 bg-secondary">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <Package className="w-8 h-8 text-foreground" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Track Your Order
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your order number and email to check the status of your shipment.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-md mx-auto px-6">
            <form onSubmit={handleTrackOrder} className="space-y-5">
              <div>
                <label htmlFor="orderNumber" className="block text-sm font-medium text-foreground mb-2">
                  Order Number
                </label>
                <Input
                  id="orderNumber"
                  type="text"
                  placeholder="e.g. #1001"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Search className="w-4 h-4 mr-2" />
                Track Order
              </Button>
            </form>

            <div className="mt-10 p-6 rounded-lg bg-secondary text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Have an account? View all your orders there:
              </p>
              <Link to="/account">
                <Button variant="outline" size="sm">
                  Go to My Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TrackOrder;
