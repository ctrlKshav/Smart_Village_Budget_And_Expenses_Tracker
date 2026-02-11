import { Route } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import Villages from '@/pages/dashboard/Villages';
import Budgets from '@/pages/dashboard/Budgets';
import Categories from '@/pages/dashboard/Categories';
import Expenses from '@/pages/dashboard/Expenses';

export default function DashboardRoutes() {
  return (
    <Route path="/dashboard" element={<DashboardLayout />}>
      <Route index element={<DashboardHome />} />
      <Route path="villages" element={<Villages />} />
      <Route path="budgets" element={<Budgets />} />
      <Route path="categories" element={<Categories />} />
      <Route path="expenses" element={<Expenses />} />
    </Route>
  );
}
