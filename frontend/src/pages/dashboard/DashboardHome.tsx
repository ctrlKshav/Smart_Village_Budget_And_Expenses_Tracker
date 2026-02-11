import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, DollarSign, FolderOpen, Receipt, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import api from '@/services/api';

interface Budget {
  id: number;
  village_id: number;
  year: number;
  total_allocated: string;
}

interface Category {
  id: number;
  budget_id: number;
  category_name: string;
  allocated_amount: string;
}

interface Expense {
  id: number;
  category_id: number;
  amount: string;
}

export default function DashboardHome() {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [budgetsRes, categoriesRes, expensesRes] = await Promise.all([
        api.get('/budgets/'),
        api.get('/categories/'),
        api.get('/expenses/'),
      ]);
      setBudgets(budgetsRes.data);
      setCategories(categoriesRes.data);
      setExpenses(expensesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + parseFloat(b.total_allocated), 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);

  const stats = [
    {
      title: 'Total Budget',
      value: loading ? '...' : `₹${totalBudget.toLocaleString()}`,
      icon: DollarSign,
      description: `${budgets.length} budget allocation(s)`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Total Expenses',
      value: loading ? '...' : `₹${totalExpenses.toLocaleString()}`,
      icon: Receipt,
      description: `${expenses.length} recorded expenses`,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      title: 'Budget Categories',
      value: loading ? '...' : categories.length,
      icon: FolderOpen,
      description: 'Active categories',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Remaining Budget',
      value: loading ? '...' : `₹${(totalBudget - totalExpenses).toLocaleString()}`,
      icon: DollarSign,
      description: 'Available funds',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's your village budget overview
        </p>
      </div>

      {/* Village Info Card */}
      {user?.village && (
        <Card className="border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {user.village.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{user.village.district}, {user.village.state}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Manage your village's budget allocations and track expenses efficiently.
            </p>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">📊 Budget Management</h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage annual budget allocations for your village.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-2">💰 Expense Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Log and monitor expenses against allocated budget categories.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
