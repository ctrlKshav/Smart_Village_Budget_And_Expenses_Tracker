import React from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface Budget {
  id: number;
  village_id: number;
  year: number;
  total_allocated: string; // numeric string
}

interface Props {
  budgets: Budget[];
}

export const BudgetCharts: React.FC<Props> = ({ budgets }) => {
  // Aggregate budgets by year
  const byYear: Record<number, number> = {};
  budgets.forEach((b) => {
    const year = b.year;
    const val = parseFloat(b.total_allocated || '0');
    byYear[year] = (byYear[year] || 0) + val;
  });

  const years = Object.keys(byYear).sort();
  const values = years.map((y) => byYear[Number(y)]);

  const barData = {
    labels: years,
    datasets: [
      {
        label: 'Total Allocated (₹)',
        data: values,
        backgroundColor: 'rgba(59,130,246,0.8)',
      },
    ],
  };

  const pieData = {
    labels: years,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#3b82f6',
          '#ef4444',
          '#f59e0b',
          '#10b981',
          '#8b5cf6',
        ],
      },
    ],
  };

  const cumulative = values.reduce<number[]>((acc, v, i) => {
    acc.push(v + (i > 0 ? acc[i - 1] : 0));
    return acc;
  }, []);

  const lineData = {
    labels: years,
    datasets: [
      {
        label: 'Cumulative Allocated (₹)',
        data: cumulative,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6,182,212,0.3)',
        tension: 0.2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
    },
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <div className="h-64 bg-white/5 p-3 rounded-md shadow-sm">
        <h3 className="text-sm font-medium mb-2">Allocation by Year (bar)</h3>
        <div className="h-44">
          <Bar data={barData} options={commonOptions} />
        </div>
      </div>

      <div className="h-64 bg-white/5 p-3 rounded-md shadow-sm">
        <h3 className="text-sm font-medium mb-2">Share by Year (pie)</h3>
        <div className="h-44">
          <Pie data={pieData} options={commonOptions} />
        </div>
      </div>

      <div className="h-64 bg-white/5 p-3 rounded-md shadow-sm">
        <h3 className="text-sm font-medium mb-2">Cumulative (line)</h3>
        <div className="h-44">
          <Line data={lineData} options={commonOptions} />
        </div>
      </div>
    </div>
  );
};

export default BudgetCharts;
