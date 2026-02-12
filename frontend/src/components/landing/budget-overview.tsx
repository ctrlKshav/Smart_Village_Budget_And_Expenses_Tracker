"use client";

import React from "react"

import { useState, useEffect, useCallback } from "react";
import {
  IndianRupee,
  TrendingUp,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Wallet,
  PiggyBank,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BudgetItem {
  id: string;
  name: string;
  category: string;
  allocated: number;
  spent: number;
}

const CATEGORIES = [
  "Infrastructure",
  "Education",
  "Healthcare",
  "Water Supply",
  "Sanitation",
  "Community",
  "Administration",
  "Energy",
  "MGNREGA",
  "Other",
];

const DEFAULT_BUDGETS: BudgetItem[] = [
  { id: "1", name: "Road Construction & Repair", category: "Infrastructure", allocated: 850000, spent: 620000 },
  { id: "2", name: "Primary School Maintenance", category: "Education", allocated: 500000, spent: 380000 },
  { id: "3", name: "PHC Operations", category: "Healthcare", allocated: 400000, spent: 310000 },
  { id: "4", name: "Borewell & Pipeline", category: "Water Supply", allocated: 350000, spent: 290000 },
  { id: "5", name: "Toilet & Drain Construction", category: "Sanitation", allocated: 200000, spent: 155000 },
  { id: "6", name: "Panchayat Office Expenses", category: "Administration", allocated: 150000, spent: 95000 },
];

const STORAGE_KEY = "grambudget-budgets";

function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function BudgetOverview() {
  const [budgets, setBudgets] = useState<BudgetItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    allocated: "",
    spent: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setBudgets(JSON.parse(stored));
      } catch {
        setBudgets(DEFAULT_BUDGETS);
      }
    } else {
      setBudgets(DEFAULT_BUDGETS);
    }
    setMounted(true);
  }, []);

  // Save to localStorage on change
  const saveBudgets = useCallback((items: BudgetItem[]) => {
    setBudgets(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, []);

  const totalAllocated = budgets.reduce((s, b) => s + b.allocated, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const remaining = totalAllocated - totalSpent;
  const utilization = totalAllocated > 0 ? Math.round((totalSpent / totalAllocated) * 100) : 0;

  function resetForm() {
    setFormData({ name: "", category: "", allocated: "", spent: "" });
    setEditingId(null);
    setShowForm(false);
  }

  function handleAdd() {
    setEditingId(null);
    setFormData({ name: "", category: "", allocated: "", spent: "" });
    setShowForm(true);
  }

  function handleEdit(item: BudgetItem) {
    setEditingId(item.id);
    setFormData({
      name: item.name,
      category: item.category,
      allocated: item.allocated.toString(),
      spent: item.spent.toString(),
    });
    setShowForm(true);
  }

  function handleDelete(id: string) {
    saveBudgets(budgets.filter((b) => b.id !== id));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.allocated) return;

    const item: BudgetItem = {
      id: editingId || generateId(),
      name: formData.name,
      category: formData.category,
      allocated: Number(formData.allocated),
      spent: Number(formData.spent) || 0,
    };

    if (editingId) {
      saveBudgets(budgets.map((b) => (b.id === editingId ? item : b)));
    } else {
      saveBudgets([...budgets, item]);
    }
    resetForm();
  }

  if (!mounted) {
    return (
      <section id="budgets" className="py-20 lg:py-28 bg-card">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="h-96 flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="budgets" className="py-20 lg:py-28 bg-card">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            Budget Management
          </span>
          <h2 className="font-display mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Track Your Village Budget
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Add, edit, and manage budget allocations across departments. Every change
            is saved automatically.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <SummaryCard
            icon={<Wallet className="h-5 w-5" />}
            label="Total Budget"
            value={formatINR(totalAllocated)}
            sub={`${budgets.length} departments`}
            color="primary"
          />
          <SummaryCard
            icon={<ArrowDownRight className="h-5 w-5" />}
            label="Total Spent"
            value={formatINR(totalSpent)}
            sub={`${utilization}% utilized`}
            color="accent"
          />
          <SummaryCard
            icon={<PiggyBank className="h-5 w-5" />}
            label="Remaining"
            value={formatINR(remaining)}
            sub={`${100 - utilization}% available`}
            color="primary"
          />
        </div>

        {/* Add button */}
        <div className="mt-8 flex items-center justify-between">
          <h3 className="font-display text-lg font-bold text-foreground">
            Budget Allocations
          </h3>
          <Button onClick={handleAdd} size="sm" className="gap-2 rounded-full">
            <Plus className="h-4 w-4" />
            Add Budget
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mt-4 rounded-2xl border border-primary/20 bg-background p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-display font-bold text-foreground">
                {editingId ? "Edit Budget Item" : "Add New Budget"}
              </h4>
              <button
                type="button"
                onClick={resetForm}
                className="text-muted-foreground hover:text-foreground"
                aria-label="Close form"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <Label htmlFor="budget-name">Name</Label>
                <Input
                  id="budget-name"
                  placeholder="e.g. Road Construction"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <Label htmlFor="budget-category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger className="mt-1.5" id="budget-category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget-allocated">Allocated (INR)</Label>
                <Input
                  id="budget-allocated"
                  type="number"
                  placeholder="e.g. 500000"
                  value={formData.allocated}
                  onChange={(e) => setFormData({ ...formData, allocated: e.target.value })}
                  className="mt-1.5"
                  required
                  min={0}
                />
              </div>
              <div>
                <Label htmlFor="budget-spent">Spent (INR)</Label>
                <Input
                  id="budget-spent"
                  type="number"
                  placeholder="e.g. 350000"
                  value={formData.spent}
                  onChange={(e) => setFormData({ ...formData, spent: e.target.value })}
                  className="mt-1.5"
                  min={0}
                />
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={resetForm} className="bg-transparent rounded-full">
                Cancel
              </Button>
              <Button type="submit" className="gap-2 rounded-full">
                <Check className="h-4 w-4" />
                {editingId ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        )}

        {/* Budget List */}
        <div className="mt-5 flex flex-col gap-3">
          {budgets.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border bg-background p-12 text-center">
              <Wallet className="mx-auto h-10 w-10 text-muted-foreground/40" />
              <p className="mt-3 text-muted-foreground">No budgets yet. Click &quot;Add Budget&quot; to get started.</p>
            </div>
          )}
          {budgets.map((item) => {
            const pct = item.allocated > 0 ? Math.round((item.spent / item.allocated) * 100) : 0;
            const isOver = pct > 100;
            return (
              <div
                key={item.id}
                className="group rounded-2xl border border-border bg-background p-5 transition-all hover:border-primary/20 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h4 className="truncate font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {item.category}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Allocated: <strong className="text-foreground">{formatINR(item.allocated)}</strong></span>
                      <span>Spent: <strong className="text-foreground">{formatINR(item.spent)}</strong></span>
                      <span className={isOver ? "text-destructive font-semibold" : ""}>
                        {pct}% used
                      </span>
                    </div>
                    <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOver ? "bg-destructive" : pct > 80 ? "bg-accent" : "bg-primary"
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      className="gap-1.5 rounded-full bg-transparent"
                      aria-label={`Edit ${item.name}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="gap-1.5 rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive bg-transparent"
                      aria-label={`Delete ${item.name}`}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Delete</span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: "primary" | "accent";
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${
          color === "primary" ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"
        }`}>
          {icon}
        </div>
      </div>
      <p className="font-display mt-2 text-2xl font-bold text-foreground">
        {value}
      </p>
      <div className="mt-1 flex items-center gap-1.5">
        <TrendingUp className={`h-3.5 w-3.5 ${color === "primary" ? "text-primary" : "text-accent"}`} />
        <span className="text-xs text-muted-foreground">{sub}</span>
      </div>
    </div>
  );
}
