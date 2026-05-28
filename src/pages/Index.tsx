import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import clearCansHero from "@/assets/clear-cans-hero.png";
import singleCanProduct from "@/assets/single-can-product.jpg";

const Index = () => {
  const { data: products } = useProducts(1);
  const product = products?.[0];
  const price = product?.node.priceRange.minVariantPrice;
  const priceDisplay = price ? `$${parseFloat(price.amount).toFixed(0)}` : "$85";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="max-w-lg animate-fade-in">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-5">
                Wholesale · 100 Pack
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.05]">
                The clear can
                <br />
                brands trust.
              </h1>
              <p className="text-muted-foreground text-base mt-5 leading-relaxed max-w-sm">
                Clean, modern packaging for iced drinks, specialty beverages, and grab-and-go service. 100 cans and lids per box.
              </p>
              <div className="mt-10">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 h-12 px-8 bg-primary text-primary-foreground text-sm tracking-wide rounded-sm transition-colors hover:bg-foreground/90"
                >
                  Order Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
              <img
                src={clearCansHero}
                alt="Clear aesthetic cans with colorful beverages in a modern café"
                className="w-full h-full object-cover"
                width={1365}
                height={1024}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Product Preview */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary order-2 md:order-1">
              <img
                src={singleCanProduct}
                alt="Clear 16oz aesthetic can close-up"
                className="w-full h-full object-cover"
                width={1920}
                height={1920}
                loading="lazy"
              />
            </div>

            <div className="order-1 md:order-2">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
                What's Inside
              </p>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight leading-tight">
                Premium clear cans,
                <br />
                ready to ship.
              </h2>
              <ul className="mt-8 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                  <span>100 cans + 100 matching lids per box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                  <span>Crystal-clear BPA-free plastic, 16oz capacity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                  <span>Great for iced coffee, smoothies, lemonade, and any drink</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 flex-shrink-0" />
                  <span>Stocked & ready — fast U.S. shipping</span>
                </li>
              </ul>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
              >
                View pricing & order
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 md:gap-16">
            {[
              { title: "100 per box", desc: "Lids included with every order. No hidden extras or surprise fees." },
              { title: "Trending aesthetic", desc: "The clear can look everyone is obsessed with right now." },
              { title: "Fast shipping", desc: "Stocked and ready to ship directly to your door." },
            ].map((feature) => (
              <div key={feature.title}>
                <h3 className="text-sm font-medium tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28 text-center">
          <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Ready to stock up?
          </h2>
          <p className="text-muted-foreground text-base mt-3 max-w-md mx-auto">
            Get the clear cans everyone trusts. Starting at {priceDisplay} per box of 100.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 h-12 px-10 mt-8 bg-primary text-primary-foreground text-sm tracking-wide rounded-sm transition-colors hover:bg-foreground/90"
          >
            Place Your Order
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
