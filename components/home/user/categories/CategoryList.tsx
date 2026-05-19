"use client";

import React, { Suspense, useMemo } from "react";
import { toast } from "react-toastify";
import Container from "../../common/Container";
import CategorySearch from "./CategorySearch";
import Title from "../../common/Title";
import CategoryCarousel from "../home/CategoryCarousel";
import { SearchParamsProps } from "@/lib/home";
import CategoryCard from "./CategoryCard";
import { getApiErrorMessage } from "@/lib/getApiErrorMessage";
import { useGetAllCategoriesQuery, type ProductCategory } from "@/appstore/modules/products/api";
import {
  useCreateSellerCategoryMutation,
  useGetSellerCategoriesQuery,
} from "@/appstore/modules/seller/panel.api";
import { useAppSelector } from "@/appstore/hooks/hooks";
import { selectIsAuthenticated, selectUserRole } from "@/appstore/slices/sessionSlice";

interface CategoryListProps {
  searchParams: SearchParamsProps;
  isCarousel?: boolean;
}

type CategoryNode = ProductCategory & { children?: CategoryNode[] };
type LeafCategoryNode = CategoryNode & { displayName: string };

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";

const toLeafCategories = (
  nodes: CategoryNode[],
  prefix = "",
): LeafCategoryNode[] => {
  return nodes.flatMap((node) => {
    const currentPath = prefix ? `${prefix} > ${node.name}` : node.name;
    const children = (node.children || []) as CategoryNode[];
    if (children.length === 0) {
      return [{ ...node, displayName: currentPath }];
    }
    return toLeafCategories(children, currentPath);
  });
};

const CategoryList = ({ searchParams, isCarousel = false }: CategoryListProps) => {
  const search = searchParams?.category || "";
  const searchText = search.trim().toLowerCase();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const userRole = useAppSelector(selectUserRole);
  const isSeller = isAuthenticated && userRole === "seller";

  const { data: categoriesRes, isLoading } = useGetAllCategoriesQuery();
  const { data: sellerCategoriesRes } = useGetSellerCategoriesQuery(undefined, {
    skip: !isSeller,
  });
  const [createSellerCategory, { isLoading: creatingCategory }] =
    useCreateSellerCategoryMutation();

  const existingCategoryIds = useMemo(
    () => new Set((sellerCategoriesRes?.data ?? []).map((item) => item.categoryId)),
    [sellerCategoriesRes?.data],
  );

  const categories = useMemo(() => {
    const siteBaseUrl = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/api\/v\d+$/i, "");
    const normalizeImage = (img?: string | null) => {
      if (!img) return FALLBACK_IMAGE;
      if (/^https?:\/\//i.test(img)) return img;
      const normalized = img.startsWith("/") ? img : `/${img}`;
      return `${siteBaseUrl}${normalized.replace(/\\/g, "/")}`;
    };
    const tree = (categoriesRes?.data ?? []) as CategoryNode[];
    const leaves = toLeafCategories(tree);
    return leaves.map((item) => ({
      id: item.id,
      name: item.displayName,
      slug: item.slug,
      img: normalizeImage(item.image),
      href: `/products?categoryId=${item.id}`,
      isAdded: existingCategoryIds.has(item.id),
    }));
  }, [categoriesRes?.data, existingCategoryIds]);

  const filteredCategories = searchText === ""
    ? categories
    : categories.filter((category) =>
        category.name.toLowerCase().includes(searchText),
      );

  const handleAddCategory = async (categoryId: number) => {
    try {
      const result = await createSellerCategory({ categoryId }).unwrap();
      toast.success(result?.message || "Category added to your panel.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Failed to add category."));
    }
  };

  return (
    <section className="py-16 bg-ternary">
      <Container>
        <Title subtitle="আসল পণ্য কাজ শুরু করতে ক্যাটাগরি থেকে বেছে নিন, তারপর সেই ক্যাটাগরির প্রোডাক্ট যোগ করুন।">
          আমাদের ক্যাটাগরির সমূহ
        </Title>

        <Suspense fallback={<div>Loading...</div>}>
          <CategorySearch />
        </Suspense>

        {search && (
          <p className="text-sm text-gray-500 mt-2 mb-4">
            Showing results for &ldquo;{search}&rdquo;
          </p>
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="text-center py-10 text-gray-400">Loading categories...</div>
          ) : filteredCategories.length > 0 ? (
            isCarousel ? (
              <CategoryCarousel
                categories={filteredCategories}
                showAddButton={isSeller}
                onAddCategory={handleAddCategory}
                creatingCategory={creatingCategory}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCategories.map((cat) => (
                  <CategoryCard
                    key={cat.id}
                    category={cat}
                    showAddButton={isSeller}
                    onAddCategory={handleAddCategory}
                    creatingCategory={creatingCategory}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-10 text-gray-400">No categories found.</div>
          )}
        </div>
      </Container>
    </section>
  );
};

export default CategoryList;
