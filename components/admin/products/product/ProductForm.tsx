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
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Tag,
  Typography,
  Switch,
  Upload,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import {
  Boxes,
  ImagePlus,
  Info,
  PackagePlus,
  Plus,
  Trash2,
} from "lucide-react";
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
type ProductMode = "simple" | "variants";

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
  costPrice: 0,
  wholesalePrice: 0,
  suggestedPrice: 0,
  stock: 0,
  attributes: [],
};

const resolveAssetUrl = (url?: string | null) => {
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;

  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
  const baseUrl = apiUrl.replace(/\/api\/v\d+$/i, "");
  const normalizedUrl = url.startsWith("/") ? url : `/${url}`;

  return `${baseUrl}${normalizedUrl}`;
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

const getVariantAttributeValue = (
  variant: VariantFormItem,
  attribute: ProductAttribute,
) => {
  const valueIds = new Set(variant.attributes ?? []);
  return attribute.values.find((valueItem) => valueIds.has(valueItem.id))?.id;
};

const setVariantAttributeValue = (
  variant: VariantFormItem,
  attribute: ProductAttribute,
  valueId?: number,
) => {
  const attributeValueIds = new Set(attribute.values.map((item) => item.id));
  const nextAttributes = (variant.attributes ?? []).filter(
    (item) => !attributeValueIds.has(item),
  );

  if (valueId) nextAttributes.push(valueId);

  return nextAttributes;
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
  const [productMode, setProductMode] = useState<ProductMode>(() =>
    initialData?.variants?.some((variant) => variant.attributes.length > 0)
      ? "variants"
      : "simple",
  );
  const [coverFile, setCoverFile] = useState<File | undefined>(undefined);
  const [coverUploadFiles, setCoverUploadFiles] = useState<UploadFile[]>([]);
  const [galleryFiles, setGalleryFiles] = useState<UploadFile[]>([]);

  const flatCategories = useMemo(
    () => flattenCategories(categories),
    [categories],
  );
  const leafCategoryOptions = flatCategories
    .filter((item) => item.isLeaf)
    .map((item) => ({ value: item.id, label: item.path }));

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

  const switchProductMode = (nextMode: ProductMode) => {
    setProductMode(nextMode);
    if (nextMode === "simple") {
      setVariants((prev) => [{ ...(prev[0] ?? DEFAULT_VARIANT), attributes: [] }]);
    }
  };

  const removeVariant = (index: number) => {
    if (variants.length === 1) return;
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    form.resetFields();
    setProductMode(
      initialData?.variants?.some((variant) => variant.attributes.length > 0)
        ? "variants"
        : "simple",
    );
    setVariants(
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
    setCoverFile(undefined);
    setCoverUploadFiles([]);
    setGalleryFiles([]);
  };

  const submit = (values: ProductFormValues) => {
    const selectedVariants =
      productMode === "simple" ? [{ ...variants[0], attributes: [] }] : variants;

    const normalizedVariants = selectedVariants.map((variant) => {
      if (mode === "create") {
        const variantWithoutSku = { ...variant };
        delete variantWithoutSku.sku;
        return variantWithoutSku;
      }

      return variant;
    });

    onSubmit({
      name: values.name,
      categoryId: values.categoryId,
      brandId: values.brandId ?? null,
      shortDescription: values.shortDescription,
      description: values.description,
      videoUrl: values.videoUrl,
      isActive: values.isActive,
      variants: normalizedVariants,
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
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-5">
          <Card
            title={
              <Space size={8}>
                <PackagePlus size={18} />
                <span>Product Details</span>
              </Space>
            }>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Form.Item
                label="Product Name"
                name="name"
                rules={[
                  { required: true, message: "Product name is required" },
                ]}>
                <Input placeholder="Enter product name" />
              </Form.Item>

              <Form.Item
                label="Category"
                name="categoryId"
                extra="Only subcategories are shown because parent categories cannot hold products."
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
                  <Switch
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                  />
                </Form.Item>
              )}
            </div>

            <Form.Item
              label="Short Description"
              name="shortDescription"
              extra="A compact summary shown in product previews.">
              <Input.TextArea
                rows={2}
                placeholder="Example: Premium cotton shirt for daily wear"
                showCount
                maxLength={180}
              />
            </Form.Item>

            <Form.Item label="Description" name="description">
              <Input.TextArea
                rows={5}
                placeholder="Add product materials, sizing, care instructions, warranty, or other selling details"
              />
            </Form.Item>

            <Form.Item label="Video URL" name="videoUrl">
              <Input placeholder="https://..." />
            </Form.Item>
          </Card>

          <Card
            title={
              <Space size={8}>
                <ImagePlus size={18} />
                <span>Product Images</span>
              </Space>
            }>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Form.Item
                label="Cover Image"
                required={mode === "create"}
                extra={
                  mode === "edit"
                    ? "Upload a new file only if you want to replace the current cover."
                    : "Required. This image appears first in product listings."
                }>
                <Upload
                  listType="picture-card"
                  fileList={coverUploadFiles}
                  beforeUpload={(file) => {
                    setCoverFile(file);
                    setCoverUploadFiles([file]);
                    return false;
                  }}
                  onRemove={() => {
                    setCoverFile(undefined);
                    setCoverUploadFiles([]);
                  }}
                  maxCount={1}
                  accept="image/*">
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <ImagePlus size={22} />
                    <span>Select</span>
                  </div>
                </Upload>
                {mode === "edit" && initialData?.coverImage ? (
                  <div className="mt-3">
                    <Typography.Text
                      type="secondary"
                      className="mb-2 block text-xs">
                      Current cover
                    </Typography.Text>
                    <Image
                      src={resolveAssetUrl(initialData.coverImage)}
                      alt={initialData.name}
                      width={96}
                      height={96}
                      className="rounded-md object-cover"
                    />
                  </div>
                ) : null}
              </Form.Item>

              <Form.Item
                label="Gallery Images"
                extra="Optional. Add up to 20 supporting product photos.">
                <Upload
                  listType="picture-card"
                  fileList={galleryFiles}
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
                  <div className="flex flex-col items-center gap-2 text-slate-600">
                    <Plus size={22} />
                    <span>Add</span>
                  </div>
                </Upload>
                {mode === "edit" && initialData?.images?.length ? (
                  <div className="mt-3">
                    <Typography.Text
                      type="secondary"
                      className="mb-2 block text-xs">
                      Current gallery
                    </Typography.Text>
                    <div className="flex flex-wrap gap-2">
                      {initialData.images.map((image) => (
                        <Image
                          key={image.id}
                          src={resolveAssetUrl(image.url)}
                          alt={`${initialData.name} gallery image`}
                          width={64}
                          height={64}
                          className="rounded-md object-cover"
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </Form.Item>
            </div>
          </Card>

          <Card
            title={
              <Space size={8}>
                <Boxes size={18} />
                <span>Pricing & Stock</span>
              </Space>
            }
            extra={
              productMode === "variants" ? (
                <Button
                  type="primary"
                  icon={<Plus size={14} />}
                  onClick={addVariant}>
                  Add Variant
                </Button>
              ) : null
            }>
            <div className="mb-4">
              <Typography.Text className="mb-2 block text-sm">
                Product Type
              </Typography.Text>
              <Radio.Group
                value={productMode}
                onChange={(event) => switchProductMode(event.target.value)}
                optionType="button"
                buttonStyle="solid">
                <Radio.Button value="simple">No Variation</Radio.Button>
                <Radio.Button value="variants">Has Variations</Radio.Button>
              </Radio.Group>
            </div>

            <div className="space-y-4">
              {(productMode === "simple" ? variants.slice(0, 1) : variants).map((variant, index) => (
                <div
                  key={`variant-${index}`}
                  className="rounded-lg border border-slate-200 bg-slate-50/60 p-4">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <Space size={8}>
                      <Tag color={productMode === "simple" ? "green" : "blue"}>
                        {productMode === "simple"
                          ? "Simple Product"
                          : `Variant ${index + 1}`}
                      </Tag>
                      {mode === "edit" && productMode === "variants" && variant.sku ? (
                        <Typography.Text type="secondary">
                          SKU: {variant.sku}
                        </Typography.Text>
                      ) : null}
                    </Space>
                    {productMode === "variants" ? (
                      <Button
                        danger
                        size="small"
                        icon={<Trash2 size={14} />}
                        onClick={() => removeVariant(index)}
                        disabled={variants.length === 1}>
                        Remove
                      </Button>
                    ) : null}
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div>
                      <Typography.Text className="mb-1 block text-sm">
                        Cost Price
                      </Typography.Text>
                      <InputNumber
                        className="!w-full"
                        placeholder="0"
                        min={0}
                        value={variant.costPrice}
                        onChange={(value) =>
                          updateVariant(index, "costPrice", Number(value || 0))
                        }
                      />
                    </div>
                    <div>
                      <Typography.Text className="mb-1 block text-sm">
                        Wholesale Price
                      </Typography.Text>
                      <InputNumber
                        className="!w-full"
                        placeholder="0"
                        min={0}
                        value={variant.wholesalePrice}
                        onChange={(value) =>
                          updateVariant(
                            index,
                            "wholesalePrice",
                            Number(value || 0),
                          )
                        }
                      />
                    </div>
                    <div>
                      <Typography.Text className="mb-1 block text-sm">
                        Suggested Price
                      </Typography.Text>
                      <InputNumber
                        className="!w-full"
                        placeholder="0"
                        min={0}
                        value={variant.suggestedPrice}
                        onChange={(value) =>
                          updateVariant(
                            index,
                            "suggestedPrice",
                            Number(value || 0),
                          )
                        }
                      />
                    </div>
                    <div>
                      <Typography.Text className="mb-1 block text-sm">
                        Stock
                      </Typography.Text>
                      <InputNumber
                        className="!w-full"
                        placeholder="0"
                        min={0}
                        value={variant.stock}
                        onChange={(value) =>
                          updateVariant(index, "stock", Number(value || 0))
                        }
                      />
                    </div>
                  </div>
                  {productMode === "variants" ? (
                    <>
                      <Divider className="!my-4" />
                      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                        <Typography.Text className="block text-sm">
                          Attributes
                        </Typography.Text>
                        <Typography.Text type="secondary" className="text-xs">
                          Select one value from each needed attribute
                        </Typography.Text>
                      </div>
                      {attributes.length ? (
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {attributes.map((attribute) => (
                            <div key={attribute.id}>
                              <Typography.Text className="mb-1 block text-xs text-slate-600">
                                {attribute.name}
                              </Typography.Text>
                              <Select
                                allowClear
                                className="!w-full"
                                options={attribute.values.map((valueItem) => ({
                                  value: valueItem.id,
                                  label: valueItem.value,
                                }))}
                                value={getVariantAttributeValue(
                                  variant,
                                  attribute,
                                )}
                                onChange={(value) =>
                                  updateVariant(
                                    index,
                                    "attributes",
                                    setVariantAttributeValue(
                                      variant,
                                      attribute,
                                      value,
                                    ),
                                  )
                                }
                                placeholder={`Select ${attribute.name}`}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Typography.Text type="secondary">
                          Create attributes first to use product variations.
                        </Typography.Text>
                      )}
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <Space align="start" size={12}>
              <Info size={18} className="mt-1 text-blue-600" />
              <div>
                <Typography.Title level={5} className="!mb-1">
                  SKU is automatic
                </Typography.Title>
                <Typography.Paragraph type="secondary" className="!mb-0">
                  {mode === "edit"
                    ? "Existing SKU values are shown for reference only. Price, stock, images, status, and details can be updated here."
                    : "The backend creates product and variant SKU values. You only need to add category, images, price, stock, and optional attributes."}
                </Typography.Paragraph>
              </div>
            </Space>
          </Card>

          <Card>
            <Typography.Title level={5} className="!mb-3">
              Before submitting
            </Typography.Title>
            <div className="space-y-3 text-sm text-slate-600">
              <div>
                <Tag color="green">1</Tag>
                Select a subcategory, not a parent category.
              </div>
              <div>
                <Tag color="green">2</Tag>
                Add a clear cover image.
              </div>
              <div>
                <Tag color="green">3</Tag>
                Use variants when size, color, or price changes.
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Typography.Text type="secondary">
            {mode === "create"
              ? "Review product details before creating it."
              : "Changes will update this product after submission."}
          </Typography.Text>
          <Space>
            <Button htmlType="button" onClick={resetForm}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit" loading={submitting}>
              {mode === "create" ? "Create Product" : "Update Product"}
            </Button>
          </Space>
        </div>
      </Card>
    </Form>
  );
}
