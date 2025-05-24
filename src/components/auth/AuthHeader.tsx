
import React from 'react';
import { BadgeIndianRupee } from 'lucide-react';

const AuthHeader: React.FC = () => {
  return (
    <div className="text-center space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <BadgeIndianRupee className="h-8 w-8 text-superbike-500" />
        <span className="text-2xl font-orbitron font-bold gradient-text">SuperBikes Pro</span>
      </div>
      <p className="text-muted-foreground">Your premium motorcycle destination</p>
    </div>
  );
};

export default AuthHeader;
