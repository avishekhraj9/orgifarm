
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import ThemeToggle from './ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-apple px-4 md:px-8',
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm py-2'
          : 'bg-transparent py-3'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src="/img/Orgifarm_logo.png" alt="Orgifarm Logo" className="h-14 w-auto" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            to="/blog"
            className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:text-primary transition-colors flex items-center gap-1">
              Company <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link to="/about">About Us</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/contact">Contact</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-[160px] lg:w-[200px] h-9 rounded-full bg-secondary/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-gray-400" />
            </button>
          </form>

          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 hover:bg-secondary"
                >
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <div className="px-4 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="h-9 rounded-full hover:bg-secondary"
            >
              Login
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 hover:bg-secondary relative"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-3">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 hover:bg-secondary relative"
            onClick={() => navigate('/cart')}
          >
            <ShoppingCart className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-9 w-9 hover:bg-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background shadow-lg border-t animate-slide-down">
          <div className="p-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full bg-secondary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                aria-label="Search"
              >
                <Search className="h-4 w-4 text-gray-400" />
              </button>
            </form>

            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/blog"
                className="text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about"
                className="text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>

            <div className="pt-3 border-t">
              {user ? (
                <div className="space-y-3">
                  <div className="px-2">
                    <p className="text-sm font-medium dark:text-gray-200">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/account"
                    className="block text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Account
                  </Link>
                  <Link
                    to="/orders"
                    className="block text-base font-medium p-2 hover:bg-secondary rounded-md dark:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      navigate('/signup');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign up
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
