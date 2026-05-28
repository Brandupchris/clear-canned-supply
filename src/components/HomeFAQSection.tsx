import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const homeFaqs = [
  {
    q: "Are lids really included?",
    a: "Yes — every box includes 100 cans and 100 matching lids. No separate orders, no hidden add-ons. What you see is what you get.",
  },
  {
    q: "How fast does it ship?",
    a: "We ship within 1 business day. Most U.S. orders arrive in 2–4 business days depending on location. Tracking is included with every order.",
  },
  {
    q: "Are these cans food-safe and BPA-free?",
    a: "Yes. Our cans are made from crystal-clear BPA-free plastic and are fully food-safe for beverages. They meet FDA standards for direct food contact.",
  },
  {
    q: "Can I order a sample before buying in bulk?",
    a: (
      <>
        We offer a single-box minimum so you can test before scaling up. Email us at{" "}
        <a
          href="mailto:clearcannedsupply@gmail.com"
          className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
        >
          clearcannedsupply@gmail.com
        </a>{" "}
        and we&apos;ll get you sorted.
      </>
    ),
  },
  {
    q: "What's your return policy?",
    a: (
      <>
        If anything arrives damaged or incorrect, we&apos;ll replace it immediately. See our{" "}
        <Link
          to="/returns"
          className="text-foreground underline underline-offset-2 hover:text-muted-foreground"
        >
          Returns & Refunds
        </Link>{" "}
        page for full details.
      </>
    ),
  },
];

export const HomeFAQSection = () => (
  <section className="border-t border-border">
    <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12 py-20 md:py-28">
      <div className="text-center mb-12 md:mb-14">
        <p className="type-eyebrow mb-4">Common questions</p>
        <h2 className="type-display-sm">Everything you need to know.</h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {homeFaqs.map((item, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border-border border-b last:border-b"
          >
            <AccordionTrigger
              className={cn(
                "py-5 text-left type-faq-question hover:no-underline",
                "[&>svg:last-child]:hidden [&[data-state=open]_.faq-plus]:rotate-45"
              )}
            >
              <span className="pr-4">{item.q}</span>
              <Plus
                className="faq-plus h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
                strokeWidth={1.5}
              />
            </AccordionTrigger>
            <AccordionContent className="type-body-sm pb-5">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <p className="text-center mt-10">
        <Link
          to="/faq"
          className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          View all FAQs
        </Link>
      </p>
    </div>
  </section>
);
