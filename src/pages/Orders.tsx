
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Package, CheckCircle, Clock, Truck, BadgeIndianRupee, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Orders = () => {
  const location = useLocation();
  const orderSuccess = location.state?.orderSuccess;
  const orderId = location.state?.orderId;
  const total = location.state?.total;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen bg-gradient-to-br from-green-50 via-white to-superbike-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-superbike-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-60 right-10 w-2 h-2 bg-superbike-300 rounded-full animate-pulse delay-1000"></div>
          <Sparkles className="absolute top-32 right-40 h-6 w-6 text-green-400 animate-spin opacity-30" style={{ animationDuration: '3s' }} />
          <Sparkles className="absolute bottom-32 left-40 h-4 w-4 text-superbike-400 animate-spin opacity-20" style={{ animationDuration: '4s' }} />
        </div>

        <Card className="max-w-2xl mx-auto text-center racing-card animate-fade-in shadow-2xl border-green-200 dark:border-green-800">
          <CardContent className="p-8 space-y-6">
            {/* Animated Success Icon */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                <CheckCircle className="h-12 w-12 text-white animate-pulse" />
              </div>
              {/* Ripple Effect */}
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-400 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 w-24 h-24 mx-auto bg-green-400 rounded-full animate-ping opacity-10 delay-75"></div>
            </div>
            
            <div className="space-y-2 animate-fade-in delay-300">
              <h1 className="text-4xl font-orbitron font-bold bg-gradient-to-r from-green-600 to-superbike-600 bg-clip-text text-transparent">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground text-lg animate-fade-in delay-500">
                🎉 Thank you for your purchase. Your order has been successfully placed and is being processed.
              </p>
            </div>

            {/* Animated Order Details */}
            <div className="p-6 bg-gradient-to-r from-green-50 to-superbike-50 dark:from-green-950/20 dark:to-superbike-950/20 rounded-lg border border-green-200 dark:border-green-800 animate-fade-in delay-700">
              <div className="space-y-3">
                <div className="flex justify-between items-center group">
                  <span className="font-medium flex items-center">
                    <Package className="h-4 w-4 mr-2 text-green-600" />
                    Order ID:
                  </span>
                  <span className="font-mono text-superbike-500 bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm border group-hover:scale-105 transition-transform">
                    {orderId}
                  </span>
                </div>
                {total && (
                  <div className="flex justify-between items-center group">
                    <span className="font-medium flex items-center">
                      <BadgeIndianRupee className="h-4 w-4 mr-2 text-green-600" />
                      Total Amount:
                    </span>
                    <span className="font-bold text-lg flex items-center text-superbike-500 group-hover:scale-105 transition-transform">
                      {formatPrice(total)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Animated Timeline */}
            <div className="space-y-4 animate-fade-in delay-1000">
              <h3 className="font-semibold text-lg">What happens next?</h3>
              <div className="space-y-3 text-left">
                {[
                  { icon: "✉️", text: "Confirmation email sent to your inbox", delay: "delay-100" },
                  { icon: "🔧", text: "Order processing and quality check", delay: "delay-300" },
                  { icon: "📦", text: "Packaging and dispatch preparation", delay: "delay-500" },
                  { icon: "🚚", text: "Delivery within 7-10 business days", delay: "delay-700" }
                ].map((step, index) => (
                  <div key={index} className={`flex items-center space-x-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg animate-fade-in ${step.delay} hover:bg-white dark:hover:bg-gray-800 transition-colors hover-scale`}>
                    <span className="text-xl">{step.icon}</span>
                    <span className="text-sm text-muted-foreground">{step.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Animated Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-1200">
              <Button asChild className="bg-gradient-to-r from-superbike-500 to-superbike-600 hover:from-superbike-600 hover:to-superbike-700 text-white hover-scale shadow-lg">
                <a href="/">
                  <Package className="mr-2 h-4 w-4" />
                  Continue Shopping
                </a>
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950/20 hover-scale">
                <Truck className="mr-2 h-4 w-4" />
                Track Order
              </Button>
            </div>

            {/* Animated Footer Message */}
            <div className="pt-4 border-t border-green-200 dark:border-green-800 animate-fade-in delay-1500">
              <p className="text-xs text-muted-foreground flex items-center justify-center">
                <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                Secure payment processed • Email confirmation sent
                <Sparkles className="h-3 w-3 ml-1 animate-pulse" />
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sample order data for demonstration
  const sampleOrders = [
    {
      id: 'SPB1234567890',
      date: '2024-01-15',
      status: 'Delivered',
      total: 2500000,
      items: [
        { name: 'Ducati Panigale V4', quantity: 1, price: 2500000 }
      ]
    },
    {
      id: 'SPB0987654321',
      date: '2024-01-10',
      status: 'In Transit',
      total: 1450000,
      items: [
        { name: 'Yamaha MT-09', quantity: 1, price: 1450000 }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'In Transit':
        return <Truck className="h-4 w-4 text-blue-600" />;
      case 'Processing':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-orbitron font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {sampleOrders.map((order) => (
          <Card key={order.id} className="racing-card hover-scale">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                  <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(order.status)}
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold flex items-center">
                      <BadgeIndianRupee className="h-4 w-4" />
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-lg flex items-center text-superbike-500">
                  <BadgeIndianRupee className="h-5 w-5" />
                  {formatPrice(order.total)}
                </span>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="hover-scale">
                  View Details
                </Button>
                {order.status !== 'Delivered' && (
                  <Button variant="outline" size="sm" className="hover-scale">
                    Track Order
                  </Button>
                )}
                {order.status === 'Delivered' && (
                  <Button variant="outline" size="sm" className="hover-scale">
                    Reorder
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sampleOrders.length === 0 && (
        <Card className="text-center p-12 racing-card">
          <CardContent>
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-4">
              When you place your first order, it will appear here.
            </p>
            <Button asChild className="hover-scale">
              <a href="/products">Start Shopping</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
