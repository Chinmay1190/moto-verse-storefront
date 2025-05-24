
import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeIndianRupee, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 font-orbitron font-bold text-xl">
              <BadgeIndianRupee className="h-8 w-8 text-superbike-500" />
              <span className="gradient-text">SuperBikes Pro</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              India's premier destination for premium superbikes. We offer authentic motorcycles from world-renowned brands with expert guidance and exceptional service.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-superbike-500">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-superbike-500">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-superbike-500">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-superbike-500">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/products" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                All Products
              </Link>
              <Link to="/brands" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Brands
              </Link>
              <Link to="/financing" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Financing
              </Link>
              <Link to="/service" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Service & Support
              </Link>
              <Link to="/trade-in" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Trade-in Program
              </Link>
            </nav>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Customer Care</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Contact Us
              </Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Shipping Info
              </Link>
              <Link to="/returns" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Returns & Refunds
              </Link>
              <Link to="/warranty" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Warranty
              </Link>
              <Link to="/faq" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                FAQ
              </Link>
            </nav>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Connected</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to get updates on new arrivals and exclusive offers.
            </p>
            <div className="flex space-x-2">
              <Input placeholder="Enter your email" className="flex-1" />
              <Button size="sm" className="bg-superbike-500 hover:bg-superbike-600">
                Subscribe
              </Button>
            </div>
            
            <div className="space-y-3 pt-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@superbikespro.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © 2024 SuperBikes Pro. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-muted-foreground hover:text-superbike-500 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
