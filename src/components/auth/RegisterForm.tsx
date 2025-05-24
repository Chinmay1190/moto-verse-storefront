
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface RegisterFormProps {
  redirectTo: string;
  onNavigate: (path: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ redirectTo, onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [registerErrors, setRegisterErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRegisterForm = () => {
    const errors = { name: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!registerForm.name.trim()) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!registerForm.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(registerForm.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!registerForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (registerForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!registerForm.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (registerForm.password !== registerForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setRegisterErrors(errors);
    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(registerForm.email, registerForm.password, registerForm.name);
      if (success) {
        onNavigate(redirectTo);
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-name"
            type="text"
            placeholder="Enter your full name"
            value={registerForm.name}
            onChange={(e) => {
              setRegisterForm(prev => ({ ...prev, name: e.target.value }));
              if (registerErrors.name) setRegisterErrors(prev => ({ ...prev, name: '' }));
            }}
            className={`pl-10 ${registerErrors.name ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {registerErrors.name && (
          <p className="text-red-500 text-sm">{registerErrors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-email"
            type="email"
            placeholder="Enter your email"
            value={registerForm.email}
            onChange={(e) => {
              setRegisterForm(prev => ({ ...prev, email: e.target.value }));
              if (registerErrors.email) setRegisterErrors(prev => ({ ...prev, email: '' }));
            }}
            className={`pl-10 ${registerErrors.email ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {registerErrors.email && (
          <p className="text-red-500 text-sm">{registerErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={registerForm.password}
            onChange={(e) => {
              setRegisterForm(prev => ({ ...prev, password: e.target.value }));
              if (registerErrors.password) setRegisterErrors(prev => ({ ...prev, password: '' }));
            }}
            className={`pl-10 pr-10 ${registerErrors.password ? 'border-red-500' : ''}`}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {registerErrors.password && (
          <p className="text-red-500 text-sm">{registerErrors.password}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-confirm-password">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="register-confirm-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={registerForm.confirmPassword}
            onChange={(e) => {
              setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }));
              if (registerErrors.confirmPassword) setRegisterErrors(prev => ({ ...prev, confirmPassword: '' }));
            }}
            className={`pl-10 ${registerErrors.confirmPassword ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {registerErrors.confirmPassword && (
          <p className="text-red-500 text-sm">{registerErrors.confirmPassword}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-superbike-500 hover:bg-superbike-600 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
