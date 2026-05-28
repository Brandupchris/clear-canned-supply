interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  serif?: boolean;
}

export const PageHero = ({ eyebrow, title, description, serif = false }: PageHeroProps) => (
  <section className="border-b border-border bg-secondary/40">
    <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-20">
      {eyebrow && <p className="type-eyebrow mb-3">{eyebrow}</p>}
      <h1 className={serif ? "type-display-serif max-w-2xl" : "type-display-sm max-w-2xl"}>
        {title}
      </h1>
      {description && <p className="type-body mt-4 max-w-xl">{description}</p>}
    </div>
  </section>
);
