
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Zap, Shield, Truck, BadgeIndianRupee, TrendingUp, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { products, brands } from '@/data/products';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 6);
  const newProducts = products.filter(p => p.isNew).slice(0, 8);
  const discountedProducts = products.filter(p => p.discount && p.discount > 0).slice(0, 4);

  const heroSlides = [
    {
      title: "Unleash Your Racing Spirit",
      subtitle: "Premium Superbikes Collection",
      description: "Discover the world's most powerful and technologically advanced motorcycles. From track-focused superbikes to comfortable touring machines.",
      cta: "Explore Collection",
      image: "/placeholder.svg",
      highlight: "70+ Premium Models"
    },
    {
      title: "Authentic. Premium. Trusted.",
      subtitle: "India's #1 Superbike Destination",
      description: "We bring you certified authentic motorcycles from world-renowned manufacturers with comprehensive warranty and expert support.",
      cta: "View Brands",
      image: "/placeholder.svg",
      highlight: "Authorized Dealer"
    },
    {
      title: "Finance Your Dream Ride",
      subtitle: "Easy EMI Options Available",
      description: "Make your superbike dreams a reality with our flexible financing options. Low down payments and competitive interest rates.",
      cta: "Check Finance",
      image: "/placeholder.svg",
      highlight: "0% Interest Available"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const stats = [
    { icon: Award, label: "Years of Excellence", value: "15+" },
    { icon: Users, label: "Happy Customers", value: "5000+" },
    { icon: TrendingUp, label: "Bikes Sold", value: "3000+" },
    { icon: Star, label: "Customer Rating", value: "4.9/5" }
  ];

  const features = [
    {
      icon: Shield,
      title: "Authentic Guarantee",
      description: "100% genuine motorcycles with manufacturer warranty"
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Complimentary doorstep delivery across India"
    },
    {
      icon: Zap,
      title: "Expert Service",
      description: "Professional maintenance and support services"
    },
    {
      icon: BadgeIndianRupee,
      title: "Best Prices",
      description: "Competitive pricing with exclusive offers"
    }
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            <div className="space-y-2">
              <Badge className="bg-superbike-500 hover:bg-superbike-600 text-white">
                {heroSlides[currentSlide].highlight}
              </Badge>
              <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-white leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-superbike-400">
                {heroSlides[currentSlide].subtitle}
              </h2>
            </div>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              {heroSlides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="bg-superbike-500 hover:bg-superbike-600 text-white group">
                  {heroSlides[currentSlide].cta}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/brands">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Explore Brands
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-superbike-500' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-superbike-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <stat.icon className="h-8 w-8 mx-auto" />
                <div className="text-3xl font-bold font-orbitron">{stat.value}</div>
                <div className="text-superbike-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-superbike-500 hover:bg-superbike-600 text-white">
              Featured Collection
            </Badge>
            <h2 className="text-4xl font-orbitron font-bold">Premium Superbikes</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked selection of the most sought-after motorcycles from leading manufacturers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" className="bg-superbike-500 hover:bg-superbike-600 text-white">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-orbitron font-bold">Trusted Brands</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We partner with the world's leading motorcycle manufacturers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {brands.slice(0, 10).map((brand, index) => (
              <div key={index} className="flex items-center justify-center p-6 bg-background rounded-lg hover:shadow-lg transition-shadow">
                <span className="text-xl font-bold text-muted-foreground hover:text-superbike-500 transition-colors">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      {discountedProducts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-4 mb-12">
              <Badge variant="destructive" className="text-white">
                Limited Time Offers
              </Badge>
              <h2 className="text-4xl font-orbitron font-bold">Special Deals</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't miss these exclusive discounts on premium motorcycles
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals */}
      <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-racing-500 hover:bg-racing-600 text-white">
              Just Arrived
            </Badge>
            <h2 className="text-4xl font-orbitron font-bold">Latest Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Be the first to experience the newest additions to our collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-superbike-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-orbitron font-bold">Why Choose SuperBikes Pro?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the difference with our premium services and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center racing-card hover-scale">
                <CardContent className="p-6 space-y-4">
                  <div className="w-16 h-16 mx-auto bg-superbike-500 rounded-full flex items-center justify-center">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-superbike-500 to-superbike-700 text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl font-orbitron font-bold">Ready to Ride?</h2>
          <p className="text-xl text-superbike-100 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have found their perfect motorcycle with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-superbike-500 hover:bg-gray-100">
                Browse Motorcycles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-superbike-500">
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
