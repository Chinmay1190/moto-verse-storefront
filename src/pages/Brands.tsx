
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { brands, products } from '@/data/products';

const Brands = () => {
  const getBrandCount = (brand: string) => {
    return products.filter(p => p.brand === brand).length;
  };

  const getBrandDescription = (brand: string) => {
    const descriptions: Record<string, string> = {
      'Ducati': 'Italian excellence in motorcycle engineering with a focus on performance and style.',
      'Yamaha': 'Japanese precision and innovation, delivering reliable and high-performance motorcycles.',
      'Honda': 'World leader in motorcycles with legendary reliability and engineering excellence.',
      'Kawasaki': 'Green machines known for powerful engines and cutting-edge technology.',
      'BMW': 'German engineering precision with luxury touring and adventure motorcycles.',
      'Suzuki': 'Performance-oriented motorcycles with a racing heritage and innovative technology.',
      'Aprilia': 'Italian racing DNA with advanced electronics and sporty performance.',
      'KTM': 'Ready to Race - Austrian brand focusing on lightweight, powerful motorcycles.',
      'Triumph': 'British heritage meets modern performance in classic and contemporary designs.',
      'MV Agusta': 'Italian artistry and exclusivity with hand-crafted superbikes.'
    };
    return descriptions[brand] || 'Premium motorcycle manufacturer.';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-orbitron font-bold">Our Brands</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We partner with the world's leading motorcycle manufacturers to bring you the finest selection of superbikes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Link key={brand} to={`/products?brand=${encodeURIComponent(brand)}`}>
            <Card className="racing-card hover-scale glow-effect h-full">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold font-orbitron">{brand}</h2>
                  <Badge variant="outline" className="text-xs">
                    {getBrandCount(brand)} models
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {getBrandDescription(brand)}
                </p>

                <div className="pt-4 border-t">
                  <span className="text-sm font-medium text-superbike-500 hover:text-superbike-600 transition-colors">
                    View {brand} Collection →
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Brands;
