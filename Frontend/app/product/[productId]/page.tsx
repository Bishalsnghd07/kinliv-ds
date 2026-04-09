import { fetchProductById } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from "next";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  
  // 1. Fetch data on the server - NO BLANK SCREEN
  const product = await fetchProductById(productId);

  if (!product) {
    return <div className="text-center py-20 text-white">Product not found</div>;
  }

  // 2. Pass the data to the Client Component for interactivity
  return <ProductDetailClient product={product} />;
}