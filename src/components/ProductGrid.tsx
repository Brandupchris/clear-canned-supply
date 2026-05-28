import { motion } from "framer-motion";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const ProductGrid = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-secondary rounded-lg animate-pulse" />
            <div className="h-4 bg-secondary rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-secondary rounded w-1/4 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-muted-foreground">Failed to load products. Please try again.</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-lg font-medium tracking-tight mb-2">No products found</p>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          This store doesn't have any products yet. Add products through the chat to get started.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </motion.div>
  );
};
