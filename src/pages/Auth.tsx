
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, BadgeIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, user } = useAuth();

  const redirectTo = searchParams.get('redirect') || '/';

  useEffect(() => {
    if (user) {
      navigate(redirectTo);
    }
  }, [user, navigate, redirectTo]);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });

  const [registerErrors, setRegisterErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email) => {
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        navigate(redirectTo);
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(registerForm.email, registerForm.password, registerForm.name);
      if (success) {
        navigate(redirectTo);
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

  const demoLogin = () => {
    setLoginForm({
      email: 'demo@superbikespro.com',
      password: 'demo123'
    });
    setLoginErrors({ email: '', password: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-superbike-50 to-racing-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <BadgeIndianRupee className="h-8 w-8 text-superbike-500" />
            <span className="text-2xl font-orbitron font-bold gradient-text">SuperBikes Pro</span>
          </div>
          <p className="text-muted-foreground">Your premium motorcycle destination</p>
        </div>

        <Card className="racing-card shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-orbitron">Welcome</CardTitle>
            <CardDescription>
              Sign in to your account or create a new one to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
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
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
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
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
