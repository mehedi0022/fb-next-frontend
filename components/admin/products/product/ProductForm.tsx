"use client";

import {
  ProductAttribute,
  ProductBrand,
  ProductCategory,
  ProductDetails,
  ProductVariantPayload,
} from "@/appstore/modules/products/api";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Upload,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import { Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type ProductFormValues = {
  name: string;
  categoryId: number;
  brandId?: number;
  shortDescription?: string;
  description?: string;
  videoUrl?: string;
  isActive?: boolean;
};

type VariantFormItem = ProductVariantPayload;

export type ProductFormSubmitPayload = {
  name: string;
  categoryId: number;
  brandId?: number | null;
  shortDescription?: string;
  description?: string;
  videoUrl?: string;
  isActive?: boolean;
  variants: ProductVariantPayload[];
  coverImage?: File;
  images?: File[];
};

type Props = {
  mode: "create" | "edit";
  brands: ProductBrand[];
  categories: ProductCategory[];
  attributes: ProductAttribute[];
  initialData?: ProductDetails;
  submitting?: boolean;
  onSubmit: (payload: ProductFormSubmitPayload) => void;
};

const DEFAULT_VARIANT: VariantFormItem = {
  sku: "",
  costPrice: 0,
  wholesalePrice: 0,
  suggestedPrice: 0,
  stock: 0,
  attributes: [],
};

const flattenCategories = (
  nodes: ProductCategory[],
  parentPath = "",
): Array<ProductCategory & { path: string; isLeaf: boolean }> => {
  return nodes.flatMap((node) => {
    const path = parentPath ? `${parentPath} > ${node.name}` : node.name;
    const children = node.children || [];
    const current = { ...node, path, isLeaf: children.length === 0 };
    return [current, ...flattenCategories(children, path)];
  });
};

export default function ProductForm({
  mode,
  brands,
  categories,
  attributes,
  initialData,
  submitting,
  onSubmit,
}: Props) {
  const [form] = Form.useForm<ProductFormValues>();
  const [variants, setVariants] = useState<VariantFormItem[]>(
    initialData?.variants?.length
      ? initialData.variants.map((item) => ({
          sku: item.sku,
          costPrice: Number(item.costPrice),
          wholesalePrice: Number(item.wholesalePrice),
          suggestedPrice: Number(item.suggestedPrice),
          stock: Number(item.stock),
          attributes: item.attributes.map((attr) => attr.valueId),
        }))
      : [{ ...DEFAULT_VARIANT }],
  );
  const [coverFile, setCoverFile] = useState<File | undefined>(undefined);
  const [galleryFiles, setGalleryFiles] = useState<UploadFile[]>([]);

  const flatCategories = useMemo(
    () => flattenCategories(categories),
    [categories],
  );
  const leafCategoryOptions = flatCategories
    .filter((item) => item.isLeaf)
    .map((item) => ({ value: item.id, label: item.path }));

  const attributeValueOptions = useMemo(
    () =>
      attributes.flatMap((attribute) =>
        attribute.values.map((valueItem) => ({
          value: valueItem.id,
          label: `${attribute.name}: ${valueItem.value}`,
        })),
      ),
    [attributes],
  );

  const updateVariant = (
    index: number,
    key: keyof VariantFormItem,
    value: string | number | number[],
  ) => {
    setVariants((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [key]: value } : item)),
    );
  };

  const addVariant = () => {
    setVariants((prev) => [...prev, { ...DEFAULT_VARIANT }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length === 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const submit = (values: ProductFormValues) => {
    onSubmit({
      name: values.name,
      categoryId: values.categoryId,
      brandId: values.brandId ?? null,
      shortDescription: values.shortDescription,
      description: values.description,
      videoUrl: values.videoUrl,
      isActive: values.isActive,
      variants,
      coverImage: coverFile,
      images: galleryFiles
        .map((file) => file.originFileObj)
        .filter(Boolean) as File[],
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={submit}
      initialValues={{
        name: initialData?.name,
        categoryId: initialData?.category?.id,
        brandId: initialData?.brand?.id,
        shortDescription: initialData?.shortDescription ?? "",
        description: initialData?.description ?? "",
        videoUrl: initialData?.videoUrl ?? "",
        isActive: initialData?.isActive ?? true,
      }}
      className="space-y-5">
      <Card title="Basic Information">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            label="Product Name"
            name="name"
            rules={[{ required: true, message: "Product name is required" }]}>
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            label="Category (Leaf only)"
            name="categoryId"
            rules={[{ required: true, message: "Category is required" }]}>
            <Select
              showSearch
              optionFilterProp="label"
              options={leafCategoryOptions}
              placeholder="Select subcategory"
            />
          </Form.Item>

          <Form.Item label="Brand" name="brandId">
            <Select
              allowClear
              options={brands.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              placeholder="Select brand"
            />
          </Form.Item>

          {mode === "edit" && (
            <Form.Item
              label="Active Status"
              name="isActive"
              valuePropName="checked">
              <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
            </Form.Item>
          )}
        </div>

        <Form.Item label="Short Description" name="shortDescription">
          <Input.TextArea rows={2} placeholder="Short description" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Detailed description" />
        </Form.Item>

        <Form.Item label="Video URL" name="videoUrl">
          <Input placeholder="https://..." />
        </Form.Item>
      </Card>

      <Card title="Images">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item
            label="Cover Image"
            required={mode === "create"}
            extra={
              mode === "edit" ? "Upload to replace current cover image" : ""
            }>
            <Upload
              beforeUpload={(file) => {
                setCoverFile(file);
                return false;
              }}
              maxCount={1}
              accept="image/*">
              <Button>Select Cover Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item label="Gallery Images (max 20)">
            <Upload
              beforeUpload={(file) => {
                setGalleryFiles((prev) => [...prev, file]);
                return false;
              }}
              onRemove={(file) => {
                setGalleryFiles((prev) =>
                  prev.filter((item) => item.uid !== file.uid),
                );
              }}
              multiple
              maxCount={20}
              accept="image/*">
              <Button>Select Gallery Images</Button>
            </Upload>
          </Form.Item>
        </div>
      </Card>

      <Card
        title="Variants"
        extra={
          <Button type="primary" icon={<Plus size={14} />} onClick={addVariant}>
            Add Variant
          </Button>
        }>
        <div className="space-y-4">
          {variants.map((variant, index) => (
            <Card
              key={`variant-${index}`}
              type="inner"
              title={`Variant ${index + 1}`}
              extra={
                <Button
                  danger
                  size="small"
                  onClick={() => removeVariant(index)}
                  disabled={variants.length === 1}>
                  <Trash2 size={14} />
                </Button>
              }>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Input
                  placeholder="SKU"
                  value={variant.sku}
                  onChange={(e) => updateVariant(index, "sku", e.target.value)}
                />
                <InputNumber
                  className="!w-full"
                  placeholder="Cost Price"
                  min={0}
                  value={variant.costPrice}
                  onChange={(value) =>
                    updateVariant(index, "costPrice", Number(value || 0))
                  }
                />
                <InputNumber
                  className="!w-full"
                  placeholder="Wholesale Price"
                  min={0}
                  value={variant.wholesalePrice}
                  onChange={(value) =>
                    updateVariant(index, "wholesalePrice", Number(value || 0))
                  }
                />
                <InputNumber
                  className="!w-full"
                  placeholder="Suggested Price"
                  min={0}
                  value={variant.suggestedPrice}
                  onChange={(value) =>
                    updateVariant(index, "suggestedPrice", Number(value || 0))
                  }
                />
                <InputNumber
                  className="!w-full"
                  placeholder="Stock"
                  min={0}
                  value={variant.stock}
                  onChange={(value) =>
                    updateVariant(index, "stock", Number(value || 0))
                  }
                />
                <Select
                  mode="multiple"
                  options={attributeValueOptions}
                  value={variant.attributes}
                  onChange={(value) =>
                    updateVariant(index, "attributes", value)
                  }
                  placeholder="Select attributes"
                />
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <Space>
        <Button type="primary" htmlType="submit" loading={submitting}>
          {mode === "create" ? "Create Product" : "Update Product"}
        </Button>
      </Space>
    </Form>
  );
}
