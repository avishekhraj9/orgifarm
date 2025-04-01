
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X, Filter, Check, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import PageLayout from '@/components/PageLayout';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { Product } from '@/types/product';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProductsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const queryParams = new URLSearchParams(location.search);
  
  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(queryParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    const params = new URLSearchParams();
    
    if (searchQuery) {
      params.set('search', searchQuery);
    }
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }

    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  }, [searchQuery, selectedCategory, navigate, location.pathname]);

  useEffect(() => {
    let result = [...products];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      // Default: featured
    }
    
    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 1000]);
    setSortBy('featured');
    navigate('/products');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PageLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Shop All Products</h1>
        <p className="text-muted-foreground">
          Browse our collection of minimalist, high-quality products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="space-y-2">
                    <Button
                      variant={!selectedCategory ? "default" : "outline"}
                      size="sm"
                      className="mr-2 mb-2"
                      onClick={() => setSelectedCategory('')}
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        className="mr-2 mb-2"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-1">
                    <Slider
                      value={[priceRange[0], priceRange[1]]}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      className="mb-6"
                    />
                    <div className="flex items-center justify-between">
                      <span className="flex items-center dark:text-gray-300">
                        <IndianRupee className="h-3 w-3 mr-1" />{priceRange[0]}
                      </span>
                      <span className="flex items-center dark:text-gray-300">
                        <IndianRupee className="h-3 w-3 mr-1" />{priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>

                <Button onClick={clearFilters} variant="outline" className="w-full">
                  <X className="mr-2 h-4 w-4" /> Clear Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <div 
                  className={`flex items-center rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${!selectedCategory ? 'bg-primary text-white' : 'hover:bg-secondary dark:hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory('')}
                >
                  {!selectedCategory && <Check className="mr-2 h-4 w-4" />}
                  All Products
                </div>
                {categories.map((category) => (
                  <div 
                    key={category.id}
                    className={`flex items-center rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${selectedCategory === category.id ? 'bg-primary text-white' : 'hover:bg-secondary dark:hover:bg-gray-700'}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {selectedCategory === category.id && <Check className="mr-2 h-4 w-4" />}
                    {category.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-1">
                <Slider
                  value={[priceRange[0], priceRange[1]]}
                  min={0}
                  max={500}
                  step={10}
                  onValueChange={(value) => setPriceRange([value[0], value[1]])}
                  className="mb-6"
                />
                <div className="flex items-center justify-between">
                  <span className="flex items-center dark:text-gray-300">
                    <IndianRupee className="h-3 w-3 mr-1" />{priceRange[0]}
                  </span>
                  <span className="flex items-center dark:text-gray-300">
                    <IndianRupee className="h-3 w-3 mr-1" />{priceRange[1]}
                  </span>
                </div>
              </div>
            </div>

            {(searchQuery || selectedCategory || priceRange[0] > 0 || priceRange[1] < 500) && (
              <Button onClick={clearFilters} variant="outline" className="w-full">
                <X className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </button>
            </form>

            <div className="w-full sm:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  className={isMobile ? "product-card-mobile" : ""}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-secondary/50 dark:bg-secondary/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your filters or search query
                
              </p>
              <Button onClick={clearFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};


export default ProductsPage;
