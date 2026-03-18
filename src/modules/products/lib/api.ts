import type { Product, ProductFormData } from "../types";

const generateId = () => Math.random().toString(36).substring(2, 11);

const initialProducts: Product[] = [
  {
    id: generateId(),
    name: "Wireless Bluetooth Headphones",
    sku: "WBH-001",
    description: "High-quality wireless headphones with noise cancellation",
    price: 79.99,
    stock: 150,
    category: "Electronics",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Cotton T-Shirt Classic",
    sku: "CTS-002",
    description: "100% cotton comfortable t-shirt",
    price: 24.99,
    stock: 500,
    category: "Clothing",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Smart Watch Pro",
    sku: "SWP-003",
    description: "Feature-rich smartwatch with health tracking",
    price: 199.99,
    stock: 75,
    category: "Electronics",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Garden Tool Set",
    sku: "GTS-004",
    description: "Complete 10-piece garden tool set",
    price: 49.99,
    stock: 200,
    category: "Home & Garden",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Running Shoes Elite",
    sku: "RSE-005",
    description: "Professional running shoes with cushion support",
    price: 129.99,
    stock: 120,
    category: "Sports",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "JavaScript Programming Guide",
    sku: "JPG-006",
    description: "Comprehensive guide to modern JavaScript",
    price: 39.99,
    stock: 300,
    category: "Books",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Building Blocks Set",
    sku: "BBS-007",
    description: "Creative building blocks for kids 500 pieces",
    price: 34.99,
    stock: 250,
    category: "Toys",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Organic Green Tea",
    sku: "OGT-008",
    description: "Premium organic green tea leaves 100g",
    price: 15.99,
    stock: 400,
    category: "Food & Beverages",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Face Moisturizer Cream",
    sku: "FMC-009",
    description: "Hydrating face cream with SPF 30",
    price: 29.99,
    stock: 180,
    category: "Health & Beauty",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "USB-C Charging Cable",
    sku: "UCC-010",
    description: "Fast charging USB-C cable 2 meters",
    price: 12.99,
    stock: 1000,
    category: "Electronics",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Yoga Mat Premium",
    sku: "YMP-011",
    description: "Non-slip yoga mat with carrying strap",
    price: 44.99,
    stock: 90,
    category: "Sports",
    status: "inactive",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: generateId(),
    name: "Desk Lamp LED",
    sku: "DLL-012",
    description: "Adjustable LED desk lamp with USB port",
    price: 54.99,
    stock: 0,
    category: "Home & Garden",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

let products = [...initialProducts];

export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return [...products];
  },

  getById: async (id: string): Promise<Product | undefined> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return products.find((p) => p.id === id);
  },

  create: async (data: ProductFormData): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const newProduct: Product = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    return newProduct;
  },

  update: async (id: string, data: Partial<ProductFormData>): Promise<Product> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");
    
    products[index] = {
      ...products[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return products[index];
  },

  delete: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    products = products.filter((p) => p.id !== id);
  },
};
