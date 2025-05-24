
import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, BadgeIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Cart = () => {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const deliveryFee = state.total > 1000000 ? 0 : 15000; // Free delivery over 10 lakh
  const tax = Math.round(state.total * 0.18); // 18% GST
  const finalTotal = state.total + deliveryFee + tax;

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto text-center racing-card">
          <CardContent className="p-8 space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added any motorcycles to your cart yet.
            </p>
            <Link to="/products">
              <Button className="bg-superbike-500 hover:bg-superbike-600">
                Start Shopping
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/products">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h1 className="text-3xl font-orbitron font-bold">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="racing-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cart Items ({state.itemCount})</CardTitle>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearCart}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear Cart
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                  <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div>
                      <h3 className="font-semibold">
                        <Link 
                          to={`/product/${item.product.id}`}
                          className="hover:text-superbike-500 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold flex items-center">
                          <BadgeIndianRupee className="h-4 w-4" />
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        {item.product.originalPrice && (
                          <div className="text-sm text-muted-foreground line-through">
                            {formatPrice(item.product.originalPrice * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="racing-card">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="flex items-center">
                    <BadgeIndianRupee className="h-4 w-4" />
                    {formatPrice(state.total)}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="flex items-center">
                    {deliveryFee === 0 ? (
                      <span className="text-green-600 font-medium">FREE</span>
                    ) : (
                      <>
                        <BadgeIndianRupee className="h-4 w-4" />
                        {formatPrice(deliveryFee)}
                      </>
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span className="flex items-center">
                    <BadgeIndianRupee className="h-4 w-4" />
                    {formatPrice(tax)}
                  </span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="flex items-center text-superbike-500">
                      <BadgeIndianRupee className="h-5 w-5" />
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {deliveryFee > 0 && (
                <div className="p-3 bg-superbike-50 dark:bg-superbike-950 rounded-lg">
                  <p className="text-sm text-superbike-700 dark:text-superbike-300">
                    💡 Add {formatPrice(1000000 - state.total)} more for free delivery
                  </p>
                </div>
              )}

              <div className="space-y-3">
                {user ? (
                  <Link to="/checkout">
                    <Button className="w-full bg-superbike-500 hover:bg-superbike-600 text-white">
                      Proceed to Checkout
                    </Button>
                  </Link>
                ) : (
                  <Link to="/auth?redirect=/checkout">
                    <Button className="w-full bg-superbike-500 hover:bg-superbike-600 text-white">
                      Login to Checkout
                    </Button>
                  </Link>
                )}
                
                <Link to="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Security Badge */}
          <Card className="racing-card">
            <CardContent className="p-4 text-center space-y-2">
              <div className="text-green-600 font-medium">🔒 Secure Checkout</div>
              <p className="text-xs text-muted-foreground">
                Your payment information is protected with bank-level security
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;
