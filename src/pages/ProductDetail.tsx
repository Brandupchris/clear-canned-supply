import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useProductByHandle } from "@/hooks/useProducts";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { data: product, isLoading } = useProductByHandle(handle || "");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <p className="text-lg font-bold">Product not found</p>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground mt-2 inline-block transition-colors">
            ← Back to store
          </Link>
        </div>
      </div>
    );
  }

  const { title, description, images, variants, options } = product.node;
  const imageList = images.edges;
  const variantList = variants.edges;
  const selectedVariant = variantList[selectedVariantIdx]?.node;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    setAddedToCart(true);
    toast.success("Added to cart", { position: "top-center" });
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* Images */}
          <div className="space-y-3">
            <div className="aspect-square bg-secondary rounded-lg overflow-hidden">
              {imageList[selectedImage]?.node ? (
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={imageList[selectedImage].node.url}
                  alt={imageList[selectedImage].node.altText || title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
              )}
            </div>
            {imageList.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {imageList.map((img, i) => (
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

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="type-section-title">{title}</h1>
            {selectedVariant && (
              <p className="type-price text-xl mt-2">
                ${parseFloat(selectedVariant.price.amount).toFixed(2)} {selectedVariant.price.currencyCode}
              </p>
            )}

            {/* Options */}
            {options.map((option, optIdx) => {
              if (option.name === 'Title' && option.values.length === 1 && option.values[0] === 'Default Title') return null;
              return (
                <div key={option.name} className="mt-6">
                  <label className="type-label mb-2 block">{option.name}</label>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map((value) => {
                      const isSelected = selectedVariant?.selectedOptions?.some(
                        (o) => o.name === option.name && o.value === value
                      );
                      return (
                        <button
                          key={value}
                          onClick={() => {
                            const idx = variantList.findIndex((v) =>
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

            {description && (
              <p className="text-sm text-muted-foreground mt-6 leading-relaxed">{description}</p>
            )}

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
                    <Check className="h-4 w-4" /> Added
                  </motion.span>
                ) : (
                  <motion.span key="add" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {selectedVariant?.availableForSale ? "Add to Cart" : "Sold Out"}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
