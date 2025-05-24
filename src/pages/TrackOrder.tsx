
import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async () => {
    if (!orderId.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock tracking data
    setTrackingData({
      orderId: orderId,
      status: 'In Transit',
      currentLocation: 'Mumbai Distribution Center',
      estimatedDelivery: '2024-01-25',
      timeline: [
        {
          status: 'Order Confirmed',
          date: '2024-01-20',
          time: '10:30 AM',
          completed: true,
          description: 'Your order has been confirmed and is being processed'
        },
        {
          status: 'Packed',
          date: '2024-01-21',
          time: '2:15 PM',
          completed: true,
          description: 'Order has been packed and ready for dispatch'
        },
        {
          status: 'In Transit',
          date: '2024-01-22',
          time: '8:00 AM',
          completed: true,
          description: 'Package is on the way to your location'
        },
        {
          status: 'Out for Delivery',
          date: '2024-01-25',
          time: 'Expected',
          completed: false,
          description: 'Package will be delivered today'
        },
        {
          status: 'Delivered',
          date: '2024-01-25',
          time: 'Pending',
          completed: false,
          description: 'Package delivered successfully'
        }
      ]
    });
    
    setIsLoading(false);
  };

  const getStatusIcon = (status, completed) => {
    if (!completed) {
      return <Clock className="h-5 w-5 text-gray-400" />;
    }
    
    switch (status) {
      case 'Order Confirmed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Packed':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'In Transit':
        return <Truck className="h-5 w-5 text-orange-600" />;
      case 'Out for Delivery':
        return <MapPin className="h-5 w-5 text-purple-600" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-gradient-to-br from-superbike-50 to-racing-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-orbitron font-bold">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to get real-time updates on your motorcycle delivery
          </p>
        </div>

        {/* Search Section */}
        <Card className="racing-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="mr-2 h-5 w-5" />
              Order Tracking
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                placeholder="Enter your order ID (e.g., SPB1234567890)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleTrackOrder}
                disabled={isLoading || !orderId.trim()}
                className="bg-superbike-500 hover:bg-superbike-600"
              >
                {isLoading ? 'Tracking...' : 'Track Order'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              You can find your order ID in the confirmation email or your account orders page.
            </p>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6 animate-fade-in">
            {/* Order Summary */}
            <Card className="racing-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{trackingData.orderId}</CardTitle>
                    <p className="text-muted-foreground">Current Status: {trackingData.status}</p>
                  </div>
                  <Badge className="bg-superbike-500 text-white">
                    {trackingData.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Current Location: {trackingData.currentLocation}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Estimated Delivery: {trackingData.estimatedDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="racing-card">
              <CardHeader>
                <CardTitle>Delivery Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {trackingData.timeline.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(event.status, event.completed)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${event.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {event.status}
                          </h4>
                          <span className="text-sm text-muted-foreground">
                            {event.date} {event.time !== 'Expected' && event.time !== 'Pending' && `at ${event.time}`}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="racing-card">
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-superbike-500" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-superbike-500" />
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-sm text-muted-foreground">support@superbikespro.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Sample Order IDs for Demo */}
        <Card className="racing-card">
          <CardHeader>
            <CardTitle>Demo Order IDs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Try these sample order IDs to see the tracking in action:
            </p>
            <div className="flex flex-wrap gap-2">
              {['SPB1234567890', 'SPB0987654321', 'SPB1122334455'].map((id) => (
                <Button
                  key={id}
                  variant="outline"
                  size="sm"
                  onClick={() => setOrderId(id)}
                  className="text-xs"
                >
                  {id}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrackOrder;
