import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, PRODUCTS_QUERY, PRODUCT_BY_HANDLE_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useProducts(first = 20) {
  return useQuery({
    queryKey: ['products', first],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCTS_QUERY, { first });
      const products = data?.data?.products?.edges || [];
      return products as ShopifyProduct[];
    },
  });
}

export function useProductByHandle(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      const product = data?.data?.productByHandle;
      if (!product) return null;
      return { node: product } as ShopifyProduct;
    },
    enabled: !!handle,
  });
}
