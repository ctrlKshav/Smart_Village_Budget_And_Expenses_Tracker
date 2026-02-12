import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Expense {
  id: number;
  category_id: number;
  amount: string;
  expense_date: string; // ISO date
}

interface Category {
  id: number;
  category_name: string;
}

interface Props {
  expenses: Expense[];
  categories: Category[];
}

const ExpenseCharts: React.FC<Props> = ({ expenses, categories }) => {
  // Bar: expenses sum by category
  const catMap: Record<number, string> = {};
  categories.forEach((c) => (catMap[c.id] = c.category_name));
  const byCategory: Record<string, number> = {};
  expenses.forEach((e) => {
    const name = catMap[e.category_id] || `Category ${e.category_id}`;
    byCategory[name] = (byCategory[name] || 0) + parseFloat(e.amount || '0');
  });
  const catLabels = Object.keys(byCategory);
  const catValues = catLabels.map((l) => byCategory[l]);

  const barData = {
    labels: catLabels,
    datasets: [
      {
        label: 'Expenses (₹)',
        data: catValues,
        backgroundColor: 'rgba(239,68,68,0.85)',
      },
    ],
  };

  // Line: expenses over time (monthly)
  const byMonth: Record<string, number> = {};
  expenses.forEach((e) => {
    const d = new Date(e.expense_date);
    if (isNaN(d.getTime())) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    byMonth[key] = (byMonth[key] || 0) + parseFloat(e.amount || '0');
  });
  const months = Object.keys(byMonth).sort();
  const monthValues = months.map((m) => byMonth[m]);

  const lineData = {
    labels: months,
    datasets: [
      {
        label: 'Expenses over time (monthly)',
        data: monthValues,
        borderColor: '#f97316',
        backgroundColor: 'rgba(249,115,22,0.2)',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'bottom' as const } },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="h-64 bg-white/5 p-3 rounded-md shadow-sm">
        <h3 className="text-sm font-medium mb-2">Expenses by Category (bar)</h3>
        <div className="h-44 overflow-auto">
          <Bar data={barData} options={options} />
        </div>
      </div>
      <div className="h-64 bg-white/5 p-3 rounded-md shadow-sm">
        <h3 className="text-sm font-medium mb-2">Expenses Over Time (monthly)</h3>
        <div className="h-44">
          <Line data={lineData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ExpenseCharts;
