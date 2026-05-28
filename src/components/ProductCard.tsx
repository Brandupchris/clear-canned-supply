import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { title, handle, priceRange, images } = product.node;
  const image = images.edges[0]?.node;
  const price = priceRange.minVariantPrice;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 8 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      <Link to={`/product/${handle}`} className="group block">
        <div className="aspect-square bg-secondary rounded-lg overflow-hidden mb-3">
          {image ? (
            <img
              src={image.url}
              alt={image.altText || title}
              className="w-full h-full object-cover transition-transform duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.04]"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              No image
            </div>
          )}
        </div>
        <h3 className="text-sm font-bold tracking-tight truncate">{title}</h3>
        <p className="text-sm text-muted-foreground tabular-nums mt-0.5">
          ${parseFloat(price.amount).toFixed(2)} {price.currencyCode}
        </p>
      </Link>
    </motion.div>
  );
};
