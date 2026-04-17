import React from 'react';
import productsData from "@/public/assets/products.json";
import { Product, ProductDetails } from '@/lib';
import { Metadata } from 'next';

// Product SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const products: Product[] = productsData || [];
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

const page = async({params}:{params: { id: string }}) => {
    const {id} = await params;
  const products: Product[] = productsData || [];

  const product = products.find(p => p.id === id);

    return (
        <div>
            <ProductDetails product={product!} />
        </div>
    );
};

export default page;