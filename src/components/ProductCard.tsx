
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, BadgeIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Card className="group racing-card hover-scale glow-effect overflow-hidden">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-racing-500 hover:bg-racing-600 text-white">
              NEW
            </Badge>
          )}
          {product.discount && (
            <Badge variant="destructive">
              {product.discount}% OFF
            </Badge>
          )}
          {product.isFeatured && (
            <Badge className="bg-superbike-500 hover:bg-superbike-600 text-white">
              FEATURED
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm hover:bg-white dark:hover:bg-black transition-all duration-300 opacity-0 group-hover:opacity-100"
          onClick={handleAddToWishlist}
        >
          <Heart className="h-4 w-4" />
        </Button>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg px-4 py-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-superbike-500 transition-colors">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <BadgeIndianRupee className="h-4 w-4 text-superbike-500" />
            <div className="flex flex-col">
              <span className="font-bold text-sm">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            className="bg-superbike-500 hover:bg-superbike-600 text-white"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>

        {/* Quick specs */}
        <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t">
          <span>{product.specifications.engine}</span>
          <span>{product.specifications.power}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
