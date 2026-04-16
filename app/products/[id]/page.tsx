import React from 'react';
import productsData from "@/public/assets/products.json";
import { Product } from '@/app/types/productTypes';
import ProductDetails from '@/app/components/products/productDetails';

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