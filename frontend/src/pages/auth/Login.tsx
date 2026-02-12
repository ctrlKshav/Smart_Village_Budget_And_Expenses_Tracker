import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [role, setRole] = useState<'villager' | 'admin'>('villager');
  const [selectedVillage, setSelectedVillage] = useState<number | null>(null);
  const [villages, setVillages] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate villager village selection
    if (role === 'villager' && !selectedVillage) {
      setError('Please select a village');
      return;
    }

    setLoading(true);

    try {
      await login(formData.email, formData.password, role, role === 'villager' ? selectedVillage ?? undefined : undefined);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch villages for villager selection
  useEffect(() => {
    const fetchVillages = async () => {
      try {
        const res = await fetch('http://localhost:8000/villages/public');
        const data = await res.json();
        setVillages(data || []);
        if (data && data.length > 0) setSelectedVillage(data[0].id);
      } catch (e) {
        // ignore
      }
    };
    fetchVillages();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label>Login As</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    checked={role === 'villager'} 
                    onChange={() => setRole('villager')} 
                  />
                  <span>Villager</span>
                </label>
                <label className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    checked={role === 'admin'} 
                    onChange={() => setRole('admin')} 
                  />
                  <span>Admin</span>
                </label>
              </div>
            </div>
            {role === 'villager' && (
              <div className="space-y-2">
                <Label htmlFor="village">Select Village</Label>
                <select 
                  id="village" 
                  className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" 
                  value={selectedVillage ?? ''} 
                  onChange={(e) => setSelectedVillage(Number(e.target.value))}
                  required
                >
                  <option value="">Select a village</option>
                  {villages.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={role === 'admin' ? 'admin@example.com' : 'your@email.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
