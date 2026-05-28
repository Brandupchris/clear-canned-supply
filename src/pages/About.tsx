import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import clearCansHero from "@/assets/clear-cans-hero.png";
import singleCanProduct from "@/assets/single-can-product.jpg";

const About = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <PageHero
      eyebrow="Our story"
      title="Packaging built for brands that want to stand out"
      description="Clear Canned Supply helps cafés, drink brands, and retailers ship a premium clear-can experience — 100 cans and lids per box, ready to go."
    />

    <main className="flex-1 max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
          <img
            src={clearCansHero}
            alt="Clear aesthetic cans in a modern café setting"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <h2 className="type-subsection-title">Who we are</h2>
          <p className="type-body-sm mt-4">
            We specialize in wholesale 16oz clear plastic cans — the packaging trend driving iced coffee,
            cold brew, smoothies, and specialty beverages. Every box includes 100 crystal-clear cans and
            100 matching lids so you can launch or restock without hunting for extras.
          </p>
          <p className="type-body-sm mt-4">
            Based in the U.S., we focus on fast fulfillment and consistent quality so your team can
            focus on what you pour, not what you pack in.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mt-16 md:mt-24">
        <div className="order-2 md:order-1">
          <h2 className="type-subsection-title">What you get</h2>
          <ul className="mt-6 space-y-4 type-body-sm">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
              <span>16oz BPA-free clear cans with a sleek, modern look</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
              <span>100 cans + 100 lids per wholesale box</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
              <span>Ideal for iced drinks, lemonades, juices, and grab-and-go menus</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-1.5 shrink-0" />
              <span>Simple online ordering with secure Shopify checkout</span>
            </li>
          </ul>
          <Link
            to="/order-now"
            className="type-cta inline-flex items-center gap-2 mt-8 h-11 px-6 bg-primary text-primary-foreground rounded-sm hover:bg-foreground/90 transition-colors"
          >
            Order Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="aspect-square rounded-lg overflow-hidden bg-secondary order-1 md:order-2">
          <img
            src={singleCanProduct}
            alt="Single clear 16oz can"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default About;
