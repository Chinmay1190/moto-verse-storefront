
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface LoginFormProps {
  redirectTo: string;
  onNavigate: (path: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ redirectTo, onNavigate }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateLoginForm = () => {
    const errors = { email: '', password: '' };
    let isValid = true;

    if (!loginForm.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(loginForm.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!loginForm.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (loginForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        onNavigate(redirectTo);
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = () => {
    setLoginForm({
      email: 'demo@superbikespro.com',
      password: 'demo123'
    });
    setLoginErrors({ email: '', password: '' });
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={loginForm.email}
            onChange={(e) => {
              setLoginForm(prev => ({ ...prev, email: e.target.value }));
              if (loginErrors.email) setLoginErrors(prev => ({ ...prev, email: '' }));
            }}
            className={`pl-10 ${loginErrors.email ? 'border-red-500' : ''}`}
            required
          />
        </div>
        {loginErrors.email && (
          <p className="text-red-500 text-sm">{loginErrors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={loginForm.password}
            onChange={(e) => {
              setLoginForm(prev => ({ ...prev, password: e.target.value }));
              if (loginErrors.password) setLoginErrors(prev => ({ ...prev, password: '' }));
            }}
            className={`pl-10 pr-10 ${loginErrors.password ? 'border-red-500' : ''}`}
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
        {loginErrors.password && (
          <p className="text-red-500 text-sm">{loginErrors.password}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-superbike-500 hover:bg-superbike-600 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>

      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={demoLogin}
      >
        Try Demo Account
      </Button>
    </form>
  );
};

export default LoginForm;
