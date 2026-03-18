export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "inactive" | "draft";
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: "active" | "inactive" | "draft";
}

export const categories = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
  "Toys",
  "Food & Beverages",
  "Health & Beauty",
];

export const productStatuses = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "draft", label: "Draft" },
] as const;
