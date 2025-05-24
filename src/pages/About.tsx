
import React from 'react';
import { Award, Users, Shield, Truck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  const stats = [
    { icon: Award, label: "Years of Excellence", value: "15+" },
    { icon: Users, label: "Happy Customers", value: "5000+" },
    { icon: Shield, label: "Authentic Products", value: "100%" },
    { icon: Truck, label: "Cities Served", value: "50+" }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        <h1 className="text-4xl font-orbitron font-bold">About SuperBikes Pro</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          India's premier destination for authentic premium motorcycles. We bring you the world's finest superbikes 
          with unmatched service and expertise.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <Card key={index} className="racing-card text-center">
            <CardContent className="p-6 space-y-3">
              <stat.icon className="h-8 w-8 mx-auto text-superbike-500" />
              <div className="text-3xl font-bold font-orbitron">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Story */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-orbitron font-bold">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Founded in 2009, SuperBikes Pro began with a simple vision: to make premium motorcycles 
              accessible to passionate riders across India. What started as a small dealership in Mumbai 
              has grown into the country's most trusted superbike destination.
            </p>
            <p>
              Our founder, a lifelong motorcycle enthusiast, recognized the gap between motorcycle lovers 
              and genuine premium bikes in the Indian market. With deep industry connections and an 
              unwavering commitment to authenticity, we've built relationships with every major motorcycle 
              manufacturer worldwide.
            </p>
            <p>
              Today, we're proud to serve riders from Kashmir to Kanyakumari, delivering not just 
              motorcycles, but dreams on two wheels.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-superbike-500 to-superbike-700 rounded-lg p-8 text-white">
          <h3 className="text-2xl font-orbitron font-bold mb-6">Our Mission</h3>
          <p className="leading-relaxed mb-6">
            To democratize access to premium motorcycles in India by providing authentic products, 
            expert guidance, and exceptional service to every riding enthusiast.
          </p>
          <h3 className="text-2xl font-orbitron font-bold mb-6">Our Vision</h3>
          <p className="leading-relaxed">
            To become India's most trusted motorcycle platform, where every rider finds their perfect 
            machine and begins their journey with confidence.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-orbitron font-bold mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Authenticity",
              description: "Every motorcycle comes with manufacturer warranty and genuine documentation. No compromises on quality."
            },
            {
              title: "Expertise",
              description: "Our team consists of passionate riders and certified technicians who understand motorcycles inside out."
            },
            {
              title: "Service",
              description: "From selection to delivery and beyond, we provide comprehensive support for your entire ownership journey."
            }
          ].map((value, index) => (
            <Card key={index} className="racing-card">
              <CardContent className="p-6 space-y-4 text-center">
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
