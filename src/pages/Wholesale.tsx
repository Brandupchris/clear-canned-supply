import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { useProducts } from "@/hooks/useProducts";
import { ArrowRight, Box, Package, Truck } from "lucide-react";

const Wholesale = () => {
  const { data: products } = useProducts(1);
  const product = products?.[0];
  const price = product?.node.priceRange.minVariantPrice;
  const priceDisplay = price ? `$${parseFloat(price.amount).toFixed(2)}` : "$85.00";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <PageHero
        eyebrow="Wholesale"
        title="Stock up by the box — built for growing brands"
        description="Premium 16oz clear cans sold wholesale. 100 cans and 100 lids per box, shipped fast from U.S. inventory."
      />

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Box,
              title: "100 per box",
              desc: "Full case with matching lids included. No separate lid orders.",
            },
            {
              icon: Package,
              title: "Ready to retail",
              desc: "Crystal-clear presentation for menus, events, and grab-and-go.",
            },
            {
              icon: Truck,
              title: "Fast fulfillment",
              desc: "In-stock wholesale packs shipped directly to your door.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-border rounded-lg p-6">
              <Icon className="w-5 h-5 text-foreground mb-3" />
              <h3 className="type-label">{title}</h3>
              <p className="type-body-sm mt-2">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start border border-border rounded-lg p-8 md:p-10 bg-secondary/20">
          <div>
            <p className="type-eyebrow mb-2">Featured product</p>
            <h2 className="type-subsection-title">
              {product?.node.title ?? "16oz Aesthetic Clear Plastic Can (100 Pack with Lids)"}
            </h2>
            <p className="font-sans text-3xl font-bold tabular-nums mt-4 text-foreground">
              {priceDisplay}
              <span className="type-body-sm ml-2 font-normal">per box</span>
            </p>
            <p className="type-body-sm mt-4">
              Premium 16oz clear plastic cans with matching lids. Perfect for cafés, drink brands,
              events, and retailers scaling the clear-can trend. Order multiple boxes online anytime.
            </p>
            <ul className="mt-6 space-y-2 type-body-sm">
              <li>· 16oz capacity, BPA-free clear plastic</li>
              <li>· 100 cans + 100 lids per case</li>
              <li>· Secure checkout & order tracking</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              to="/order-now"
              className="type-cta inline-flex items-center justify-center gap-2 h-12 bg-primary text-primary-foreground rounded-sm hover:bg-foreground/90 transition-colors"
            >
              Order Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="type-cta inline-flex items-center justify-center gap-2 h-12 border border-border rounded-sm hover:bg-secondary transition-colors"
            >
              Contact for volume orders
            </Link>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Need recurring shipments or custom quantities? Email{" "}
              <a
                href="mailto:clearcannedsupply@gmail.com"
                className="underline hover:text-foreground"
              >
                clearcannedsupply@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wholesale;
