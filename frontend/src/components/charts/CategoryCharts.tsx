import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Category {
  id: number;
  budget_id: number;
  category_name: string;
  allocated_amount: string;
}

interface Budget {
  id: number;
  year: number;
}

interface Props {
  categories: Category[];
  budgets: Budget[];
}

const CategoryCharts: React.FC<Props> = ({ categories, budgets }) => {
  // Pie: allocation by category
  const labels = categories.map((c) => c.category_name);
  const values = categories.map((c) => parseFloat(c.allocated_amount || '0'));

  const pieData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#06b6d4', '#f97316',
        ],
      },
    ],
  };

  // Bar: total allocation per budget year
  const yearMap: Record<number, number> = {};
  const budgetById: Record<number, number> = {}; // budget_id -> year
  budgets.forEach((b) => (budgetById[b.id] = b.year));
  categories.forEach((c) => {
    const year = budgetById[c.budget_id] || 0;
    yearMap[year] = (yearMap[year] || 0) + parseFloat(c.allocated_amount || '0');
  });
  const years = Object.keys(yearMap).filter((y) => Number(y) !== 0).sort();
  const yearValues = years.map((y) => yearMap[Number(y)]);

  const barData = {
    labels: years,
    datasets: [
      {
        label: 'Allocated (₹)',
        data: yearValues,
        backgroundColor: 'rgba(59,130,246,0.8)',
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
        <h3 className="text-sm font-medium mb-2">Allocation by Category (pie)</h3>
        <div className="h-44">
          <Pie data={pieData} options={options} />
        </div>
      </div>
      <div className="h-64 bg-white/5 p-3 rounded-md shadow-sm">
        <h3 className="text-sm font-medium mb-2">Allocation by Budget Year (bar)</h3>
        <div className="h-44">
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CategoryCharts;
