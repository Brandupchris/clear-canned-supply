import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ease = [0.25, 0.1, 0.25, 1] as const;

const Shop = () => {
  const { data: products, isLoading, error } = useProducts();
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const product = products?.[0];
  const variants = product?.node.variants?.edges || [];
  const images = product?.node.images?.edges || [];
  const options = product?.node.options || [];

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedVariant = variants[selectedVariantIdx]?.node;
  const price = selectedVariant?.price || product?.node.priceRange.minVariantPrice;

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title || "Default",
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || []
    });
    setAddedToCart(true);
    toast.success(`${quantity} box${quantity > 1 ? "es" : ""} added to cart`, {
      position: "top-center"
    });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-10 md:py-16">
        {isLoading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-lg font-medium">Failed to load products</p>
            <p className="text-sm text-muted-foreground mt-2">Please try again later.</p>
          </div>
        ) : !product ? (
          <div className="text-center py-32">
            <p className="text-lg font-medium">No products available yet</p>
            <p className="text-sm text-muted-foreground mt-2">Check back soon.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            {/* Breadcrumb */}
            <p className="text-sm text-muted-foreground mb-8">
              <a href="/" className="hover:text-foreground transition-colors">Home</a>
              <span className="mx-2">/</span>
              <span className="text-foreground">Order</span>
            </p>

            <div className="grid md:grid-cols-2 gap-10 md:gap-16">
              {/* Images */}
              <div className="space-y-3">
                <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
                  {images[selectedImage]?.node ? (
                    <motion.img
                      key={selectedImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={images[selectedImage].node.url}
                      alt={images[selectedImage].node.altText || product.node.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-16 h-16 rounded overflow-hidden flex-shrink-0 border-2 transition-colors ${
                          i === selectedImage ? "border-primary" : "border-transparent"
                        }`}
                      >
                        <img src={img.node.url} alt={img.node.altText || ""} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info & Order */}
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
                  {product.node.title}
                </h1>

                {price && (
                  <p className="text-2xl font-medium tabular-nums mt-4">
                    ${parseFloat(price.amount).toFixed(2)}
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      per box
                    </span>
                  </p>
                )}

                {/* Variant Options */}
                {options.map((option) => {
                  if (option.name === "Title" && option.values.length === 1 && option.values[0] === "Default Title") return null;
                  return (
                    <div key={option.name} className="mt-6">
                      <label className="text-sm font-medium mb-2 block">{option.name}</label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value) => {
                          const isSelected = selectedVariant?.selectedOptions?.some(
                            (o) => o.name === option.name && o.value === value
                          );
                          return (
                            <button
                              key={value}
                              onClick={() => {
                                const idx = variants.findIndex((v) =>
                                  v.node.selectedOptions.some((o) => o.name === option.name && o.value === value)
                                );
                                if (idx !== -1) setSelectedVariantIdx(idx);
                              }}
                              className={`h-10 px-4 text-sm rounded-sm border transition-colors ${
                                isSelected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border hover:border-foreground"
                              }`}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Description from Shopify */}
                {product.node.description && (
                  <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
                    Premium 16oz clear plastic cans designed to deliver a clean, modern presentation for cold beverages. With a sleek transparent finish and matching lids included, each box comes with 100 cans built to elevate packaging for iced coffee, cold brew, smoothies, juices, and specialty drinks.
                  </p>
                )}

                {/* Quantity */}
                <div className="mt-8">
                  <label className="text-sm font-medium mb-2 block">Quantity (boxes)</label>
                  <div className="inline-flex items-center border border-border rounded-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10 flex items-center justify-center hover:bg-secondary transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {price && quantity > 1 && (
                    <p className="text-sm text-muted-foreground mt-2 tabular-nums">
                      Total: ${(parseFloat(price.amount) * quantity).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Add to Cart */}
                <Button
                  onClick={handleAddToCart}
                  disabled={cartLoading || !selectedVariant?.availableForSale || addedToCart}
                  className="w-full h-12 rounded-sm mt-8 text-sm tracking-wide"
                >
                  <AnimatePresence mode="wait">
                    {cartLoading ? (
                      <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </motion.span>
                    ) : addedToCart ? (
                      <motion.span key="added" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> Added to Cart
                      </motion.span>
                    ) : (
                      <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
