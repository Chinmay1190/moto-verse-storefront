
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Package, CheckCircle, Clock, Truck, BadgeIndianRupee } from 'lucide-react';
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
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto text-center racing-card">
          <CardContent className="p-8 space-y-6">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-orbitron font-bold">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            <div className="p-4 bg-muted/20 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID:</span>
                <span className="font-mono text-superbike-500">{orderId}</span>
              </div>
              {total && (
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">Total Amount:</span>
                  <span className="font-semibold flex items-center">
                    <BadgeIndianRupee className="h-4 w-4" />
                    {formatPrice(total)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                We'll send you a confirmation email with order details and tracking information.
              </p>
              <p className="text-sm text-muted-foreground">
                Expected delivery: 7-10 business days
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <a href="/">Continue Shopping</a>
              </Button>
              <Button variant="outline">
                Track Order
              </Button>
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
          <Card key={order.id} className="racing-card">
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
                <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
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
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                {order.status !== 'Delivered' && (
                  <Button variant="outline" size="sm">
                    Track Order
                  </Button>
                )}
                {order.status === 'Delivered' && (
                  <Button variant="outline" size="sm">
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
            <Button asChild>
              <a href="/products">Start Shopping</a>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Orders;
