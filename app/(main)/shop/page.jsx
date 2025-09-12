"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  medicalProducts,
  medicalCategories,
  priceRanges,
  getProductsByCategory,
  getProductsByPriceRange,
  searchProducts,
  sortProducts,
} from "@/lib/medical-products";
import {
  Search,
  ShoppingCart,
  Star,
  Filter,
  Grid3X3,
  List,
  Plus,
  Minus,
  Heart,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ShopPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let products = getProductsByCategory(selectedCategory);
    products = getProductsByPriceRange(products, selectedPriceRange);
    products = searchProducts(products, searchTerm);
    products = sortProducts(products, sortBy);
    return products;
  }, [searchTerm, selectedCategory, selectedPriceRange, sortBy]);

  // Cart functions
  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.success("Item removed from cart!");
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Wishlist functions
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isInWishlist) {
        toast.success("Removed from wishlist!");
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        toast.success("Added to wishlist!");
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Product card component
  const ProductCard = ({ product }) => {
    const cartItem = cart.find((item) => item.id === product.id);
    const isInCart = !!cartItem;

    return (
      <Card
        className={cn(
          "group product-card relative overflow-hidden transition-all duration-300 hover:shadow-lg",
          viewMode === "list" && "flex flex-row pb-0"
        )}
      >
        {/* Discount badge */}
        {product.originalPrice > product.price && (
          <Badge className="absolute top-2 left-2 z-10 bg-red-500 hover:bg-red-600">
            {Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )}
            % OFF
          </Badge>
        )}

        {/* Wishlist button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 z-10 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => toggleWishlist(product)}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isInWishlist(product.id)
                ? "fill-red-500 text-red-500"
                : "text-gray-500"
            )}
          />
        </Button>

        {/* Product image */}
        <div
          className={cn(
            "relative bg-white flex items-center justify-center",
            viewMode === "grid" ? "aspect-square" : "w-auto max-w-48 h-full aspect-square"
          )}
        >
          {/* <ShoppingBag className="h-16 w-16 text-gray-400" /> */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full aspect-square object-contain p-4 text-gray-400"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>

        <div className="flex-1">
          <CardHeader className={cn(viewMode === "list" && "pb-2")}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <CardTitle
                  className={cn(
                    "line-clamp-2",
                    viewMode === "list" ? "text-lg" : "text-base"
                  )}
                >
                  {product.name}
                </CardTitle>
                <CardDescription className={cn("text-sm text-muted-foreground", viewMode === "list" && "mt-4")}>
                  {product.brand}
                </CardDescription>
              </div>
              {product.prescription && (
                <Badge variant="outline" className="text-xs">
                  Rx
                </Badge>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3 w-3",
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-3">
            <CardDescription
              className={cn(
                "line-clamp-2 text-sm",
                viewMode === "list" && "line-clamp-1"
              )}
            >
              {product.description}
            </CardDescription>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Add to cart section */}
            <div className="flex items-center gap-2">
              {!isInCart ? (
                <Button
                  onClick={() => addToCart(product)}
                  disabled={!product.inStock}
                  className="flex-1"
                  size={viewMode === "list" ? "sm" : "default"}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              ) : (
                <div className="flex items-center gap-2 flex-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateCartQuantity(product.id, cartItem.quantity - 1)
                    }
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="flex-1 text-center font-medium">
                    {cartItem.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() =>
                      updateCartQuantity(product.id, cartItem.quantity + 1)
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between mb-4">
          <div>
            {/* <h1 className="text-3xl font-bold tracking-tight">Medical Shop</h1> */}
            <p className="text-muted-foreground">
              Quality medical products and supplies for your health needs
            </p>
          </div>

          {/* Cart summary */}
          <div className="flex justify-between md:justify-normal w-full md:w-auto mb-4 md:mb-0 items-center gap-4">
            <div className="text-left md:text-right">
              <div className="text-sm text-muted-foreground">Cart Total</div>
              <div className="text-lg font-bold">
                ${getCartTotal().toFixed(2)}
              </div>
            </div>
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {getCartItemCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getCartItemCount()}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Search and filters */}
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter controls */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>

            <div
              className={cn(
                "flex flex-wrap items-center gap-4 flex-1",
                "lg:flex",
                showFilters ? "flex" : "hidden lg:flex"
              )}
            >
              {/* Category filter */}
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="category"
                  className="text-sm font-medium whitespace-nowrap"
                >
                  Category:
                </Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {medicalCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price filter */}
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="price"
                  className="text-sm font-medium whitespace-nowrap"
                >
                  Price:
                </Label>
                <Select
                  value={selectedPriceRange}
                  onValueChange={setSelectedPriceRange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priceRanges.map((range) => (
                      <SelectItem key={range.id} value={range.id}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort filter */}
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="sort"
                  className="text-sm font-medium whitespace-nowrap"
                >
                  Sort by:
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name-asc">Name A-Z</SelectItem>
                    <SelectItem value="name-desc">Name Z-A</SelectItem>
                    <SelectItem value="price-asc">Price Low-High</SelectItem>
                    <SelectItem value="price-desc">Price High-Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* View mode toggle */}
            <div className="flex items-center gap-1 border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Results info */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredProducts.length} of {medicalProducts.length} products
        </p>

        {/* Active filters */}
        <div className="flex items-center gap-2">
          {selectedCategory !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {medicalCategories.find((c) => c.id === selectedCategory)?.name}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => setSelectedCategory("all")}
              >
                ×
              </Button>
            </Badge>
          )}
          {selectedPriceRange !== "all" && (
            <Badge variant="secondary" className="gap-1">
              {priceRanges.find((p) => p.id === selectedPriceRange)?.label}
              <Button
                variant="ghost"
                size="sm"
                className="h-auto p-0 hover:bg-transparent"
                onClick={() => setSelectedPriceRange("all")}
              >
                ×
              </Button>
            </Badge>
          )}
        </div>
      </div>

      {/* Products grid/list */}
      {filteredProducts.length > 0 ? (
        <div
          className={cn(
            "gap-6",
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "flex flex-col space-y-4"
          )}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedPriceRange("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
