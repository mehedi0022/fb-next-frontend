
export type Price = {
  wholesale: number;   // supplier price
  sale: number;        // selling price
  shipping?: number;   // delivery / dropshipping cost
  profit: number;      // calculated profit
  currency: "BDT";
};

export type Product = {
  id: string;
  title: string;
  slug: string;

  description: string;

  price: Price; 

  stock: number;
  isInStock: boolean;

  thumbnail: string;
  images: string[];

  category: string;
  brand?: string;

  createdAt: string;
};