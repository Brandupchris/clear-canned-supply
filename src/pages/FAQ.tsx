import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "What comes in each box?",
    a: "Every wholesale box includes 100 clear 16oz cans and 100 matching lids. Everything you need to pack and seal drinks in one shipment.",
  },
  {
    q: "What drinks work best in these cans?",
    a: "They're designed for cold beverages — iced coffee, cold brew, smoothies, lemonade, juices, and other specialty drinks served chilled.",
  },
  {
    q: "How do I place an order?",
    a: "Visit our Order Now page, choose your quantity, add to cart, and complete checkout through our secure Shopify checkout. You'll receive order confirmation by email.",
  },
  {
    q: "Do you offer wholesale or bulk pricing?",
    a: "We sell by the box (100 units). For larger or recurring orders, visit our Wholesale page or contact us — we're happy to discuss volume needs.",
  },
  {
    q: "How long does shipping take?",
    a: "Orders ship from U.S. inventory. Most orders arrive within a few business days depending on your location. You'll get tracking once your order ships.",
  },
  {
    q: "What if items arrive damaged or missing?",
    a: "Contact us within 48 hours of delivery with your order number and photos. See our Damaged & Missing Items policy for full details.",
  },
  {
    q: "Can I return or exchange an order?",
    a: "Unopened boxes in original condition may qualify for return. Review our Returns & Refunds policy or reach out before sending anything back.",
  },
  {
    q: "How do I track my order?",
    a: "Use the Track Order page with your order number and email, or sign in to your account to view order history and status.",
  },
];

const FAQ = () => (
  <div className="min-h-screen bg-background flex flex-col">
    <Navbar />
    <PageHero
      eyebrow="Support"
      title="Frequently asked questions"
      description="Quick answers about our clear cans, ordering, shipping, and wholesale."
    />

    <main className="flex-1 max-w-3xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((item, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left type-faq-question hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="type-body-sm">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 p-6 rounded-lg border border-border bg-secondary/30 text-center">
        <p className="type-body-sm">Still have questions?</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
          <Link
            to="/contact"
            className="type-cta inline-flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
          >
            Contact us
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="hidden sm:inline text-muted-foreground">·</span>
          <Link
            to="/order-now"
            className="type-cta inline-flex items-center gap-2 h-10 px-5 bg-primary text-primary-foreground rounded-sm hover:bg-foreground/90 transition-colors"
          >
            Order Now
          </Link>
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default FAQ;
