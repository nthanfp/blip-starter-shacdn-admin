import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Eye, EyeOff, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/modules/shared/components/ConfirmDialog";
import { toastHelper } from "@/lib/toast";
import { productsApi } from "../lib/api";
import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  
  // Filter states (applied)
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortBy, setSortBy] = useState("");
  
  // Temporary filter states (before apply)
  const [tempCategoryFilter, setTempCategoryFilter] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("");
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempStockFilter, setTempStockFilter] = useState("");
  const [tempSortBy, setTempSortBy] = useState("");
  
  const [showFilters, setShowFilters] = useState(false);
  
  // Delete dialog state
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productsApi.getAll();
      setProducts(data);
    } catch (error) {
      toastHelper.error({
        title: "Error",
        description: "Failed to fetch products.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync temp filters with applied filters when opening panel
  useEffect(() => {
    if (showFilters) {
      setTempCategoryFilter(categoryFilter);
      setTempStatusFilter(statusFilter);
      setTempMinPrice(minPrice);
      setTempMaxPrice(maxPrice);
      setTempStockFilter(stockFilter);
      setTempSortBy(sortBy);
    }
  }, [showFilters, categoryFilter, statusFilter, minPrice, maxPrice, stockFilter, sortBy]);

  // Apply filters button handler
  const applyFilters = () => {
    setCategoryFilter(tempCategoryFilter);
    setStatusFilter(tempStatusFilter);
    setMinPrice(tempMinPrice);
    setMaxPrice(tempMaxPrice);
    setStockFilter(tempStockFilter);
    setSortBy(tempSortBy);
  };

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Status filter
    if (statusFilter) {
      result = result.filter((p) => p.status === statusFilter);
    }

    // Price range filter
    if (minPrice) {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Stock filter
    if (stockFilter) {
      if (stockFilter === "outofstock") {
        result = result.filter((p) => p.stock === 0);
      } else if (stockFilter === "lowstock") {
        result = result.filter((p) => p.stock > 0 && p.stock < 50);
      } else if (stockFilter === "instock") {
        result = result.filter((p) => p.stock >= 50);
      }
    }

    // Sorting
    if (sortBy) {
      result.sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "stock-asc":
            return a.stock - b.stock;
          case "stock-desc":
            return b.stock - a.stock;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [products, statusFilter, minPrice, maxPrice, stockFilter, sortBy]);

  // Handle toggle status
  const handleToggleStatus = async (product: Product) => {
    try {
      await productsApi.update(product.id, {
        status: product.status === "active" ? "inactive" : "active",
      });
      toastHelper.success({
        title: "Success",
        description: `Product ${product.status === "active" ? "deactivated" : "activated"}.`,
      });
      fetchProducts();
    } catch (error) {
      toastHelper.error({
        title: "Error",
        description: "Failed to update product status.",
      });
    }
  };

  // Handle delete click
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteOpen(true);
  };

  // Confirm delete
  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    setIsSubmitting(true);
    try {
      await productsApi.delete(productToDelete.id);
      toastHelper.success({
        title: "Success",
        description: "Product deleted successfully.",
      });
      setIsDeleteOpen(false);
      setProductToDelete(null);
      fetchProducts();
    } catch (error) {
      toastHelper.error({
        title: "Error",
        description: "Failed to delete product.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Table columns
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Product Name",
        cell: ({ row }) => (
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">{row.original.sku}</div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <Badge variant="secondary">{row.original.category}</Badge>
        ),
        filterFn: "equalsString",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
          <span className="font-medium">${row.original.price.toFixed(2)}</span>
        ),
      },
      {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
          const stock = row.original.stock;
          return (
            <span
              className={
                stock === 0
                  ? "text-red-500 font-medium"
                  : stock < 50
                  ? "text-yellow-500 font-medium"
                  : ""
              }
            >
              {stock}
              {stock === 0 && " (Out of stock)"}
              {stock > 0 && stock < 50 && " (Low stock)"}
            </span>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.original.status;
          return (
            <Badge
              variant={
                status === "active"
                  ? "default"
                  : status === "inactive"
                  ? "secondary"
                  : "outline"
              }
            >
              {status}
            </Badge>
          );
        },
        filterFn: "equalsString",
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring">
              <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => navigate(`/products/${row.original.id}/edit`)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleToggleStatus(row.original)}
              >
                {row.original.status === "active" ? (
                  <>
                    <EyeOff className="mr-2 h-4 w-4" />
                    Deactivate
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-4 w-4" />
                    Activate
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteClick(row.original)}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredProducts,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // Get unique categories for filter
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, [products]);

  // Reset all filters
  const resetFilters = () => {
    setTempCategoryFilter("");
    setTempStatusFilter("");
    setTempMinPrice("");
    setTempMaxPrice("");
    setTempStockFilter("");
    setTempSortBy("");
    setCategoryFilter("");
    setStatusFilter("");
    setMinPrice("");
    setMaxPrice("");
    setStockFilter("");
    setSortBy("");
  };

  // Check if any filter is active
  const hasActiveFilters = categoryFilter || statusFilter || minPrice || maxPrice || stockFilter || sortBy;
  
  // Check if temp filters differ from applied (for Apply button state)
  const hasUnappliedFilters = tempCategoryFilter !== categoryFilter || 
    tempStatusFilter !== statusFilter || 
    tempMinPrice !== minPrice || 
    tempMaxPrice !== maxPrice || 
    tempStockFilter !== stockFilter || 
    tempSortBy !== sortBy;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">
          Manage your product inventory
        </p>
      </div>

      {/* Search, Add Product, and Filters - Aligned Row */}
      <div className="flex items-center gap-2 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters || hasActiveFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge variant="secondary" className="h-5 px-1.5 py-0 text-xs">
              {hasUnappliedFilters ? "!" : "✓"}
            </Badge>
          )}
        </Button>
        <Button onClick={() => navigate("/products/add")} className="ml-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-3 pb-3 border-b">
              <div>
                <h3 className="font-semibold">Advanced Filters</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust filters and click Apply to see results
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetFilters}
                  disabled={!hasActiveFilters && !hasUnappliedFilters}
                >
                  Reset
                </Button>
                <Button
                  onClick={applyFilters}
                  disabled={!hasUnappliedFilters}
                >
                  Apply Filters
                  {!hasUnappliedFilters && (
                    <Badge variant="secondary" className="ml-2 h-5 px-1.5 py-0 text-xs">
                      Applied
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={tempCategoryFilter} onValueChange={(v) => setTempCategoryFilter(v || "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {tempCategoryFilter || "All Categories"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={tempStatusFilter} onValueChange={(v) => setTempStatusFilter(v || "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {tempStatusFilter ? 
                        tempStatusFilter.charAt(0).toUpperCase() + tempStatusFilter.slice(1) 
                        : "All Statuses"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stock Filter */}
              <div className="space-y-2">
                <Label>Stock Level</Label>
                <Select value={tempStockFilter} onValueChange={(v) => setTempStockFilter(v || "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {tempStockFilter === "instock" && "In Stock (50+)"}
                      {tempStockFilter === "lowstock" && "Low Stock (1-49)"}
                      {tempStockFilter === "outofstock" && "Out of Stock"}
                      {!tempStockFilter && "All Stock Levels"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Stock Levels</SelectItem>
                    <SelectItem value="instock">In Stock (50+)</SelectItem>
                    <SelectItem value="lowstock">Low Stock (1-49)</SelectItem>
                    <SelectItem value="outofstock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label>Sort By</Label>
                <Select value={tempSortBy} onValueChange={(v) => setTempSortBy(v || "")}>
                  <SelectTrigger className="w-full">
                    <SelectValue>
                      {tempSortBy === "name-asc" && "Name (A-Z)"}
                      {tempSortBy === "name-desc" && "Name (Z-A)"}
                      {tempSortBy === "price-asc" && "Price (Low to High)"}
                      {tempSortBy === "price-desc" && "Price (High to Low)"}
                      {tempSortBy === "stock-asc" && "Stock (Low to High)"}
                      {tempSortBy === "stock-desc" && "Stock (High to Low)"}
                      {!tempSortBy && "Default"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Default</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                    <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                    <SelectItem value="stock-asc">Stock (Low to High)</SelectItem>
                    <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Min Price */}
              <div className="space-y-2">
                <Label>Min Price ($)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  min="0"
                  step="0.01"
                  value={tempMinPrice}
                  onChange={(e) => setTempMinPrice(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Max Price */}
              <div className="space-y-2">
                <Label>Max Price ($)</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  min="0"
                  step="0.01"
                  value={tempMaxPrice}
                  onChange={(e) => setTempMaxPrice(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading products...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {filteredProducts.length} product(s)
          {hasActiveFilters && ` (filtered from ${products.length} total)`}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <span className="text-sm">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Delete Product"
        description={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        variant="destructive"
        loading={isSubmitting}
      />
    </div>
  );
}
