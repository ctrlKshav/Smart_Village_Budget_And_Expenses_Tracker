import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, DollarSign, FolderOpen, Receipt } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard Home', href: '/dashboard', icon: Home },
    // Villages only visible to admin
    ...(user?.role === 'admin' ? [{ name: 'Villages', href: '/dashboard/villages', icon: Building2 }] : []),
    { name: 'Budgets', href: '/dashboard/budgets', icon: DollarSign },
    { name: 'Categories', href: '/dashboard/categories', icon: FolderOpen },
    { name: 'Expenses', href: '/dashboard/expenses', icon: Receipt },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 border-r bg-background">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold">Smart Village</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
