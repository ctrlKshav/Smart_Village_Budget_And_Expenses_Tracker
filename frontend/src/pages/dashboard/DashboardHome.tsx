import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, DollarSign, FolderOpen, Receipt } from 'lucide-react';

const stats = [
  {
    title: 'Total Villages',
    value: '0',
    icon: Building2,
    description: 'Registered villages',
  },
  {
    title: 'Total Budgets',
    value: '0',
    icon: DollarSign,
    description: 'Budget allocations',
  },
  {
    title: 'Total Categories',
    value: '0',
    icon: FolderOpen,
    description: 'Budget categories',
  },
  {
    title: 'Total Expenses',
    value: '0',
    icon: Receipt,
    description: 'Recorded expenses',
  },
];

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of village budgets and expenses
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to Smart Village Budget Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Manage village budgets, track expenses, and ensure transparency in fund utilization.
            Use the navigation menu to explore different sections.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
