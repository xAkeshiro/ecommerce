import { getProductsWithImages } from "@/lib/products";
import { CartContent } from "@/components/cart-content";

export const revalidate = 60;

export default async function CartPage() {
  const allProducts = await getProductsWithImages();
  return <CartContent allProducts={allProducts} />;
}
