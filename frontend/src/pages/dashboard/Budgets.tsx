import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BudgetCharts from '@/components/charts/BudgetCharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2, Calendar, DollarSign } from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface Budget {
  id: number;
  village_id: number;
  year: number;
  total_allocated: string;
}

interface Village {
  id: number;
  name: string;
}

export default function Budgets() {
  const { user } = useAuth();
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    total_allocated: '',
    village_id: '',
  });

  useEffect(() => {
    fetchBudgets();
    if (user?.role === 'admin') {
      fetchVillages();
    }
  }, []);

  const fetchBudgets = async () => {
    try {
      const response = await api.get('/budgets/');
      setBudgets(response.data);
    } catch (error) {
      console.error('Error fetching budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVillages = async () => {
    try {
      const response = await api.get('/villages/');
      setVillages(response.data);
    } catch (error) {
      console.error('Error fetching villages:', error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload: any = {
        year: formData.year,
        total_allocated: formData.total_allocated,
      };
      if (user?.role === 'admin' && formData.village_id) {
        payload.village_id = parseInt(formData.village_id);
      }
      await api.post('/budgets/', payload);
      setIsCreateOpen(false);
      setFormData({ year: new Date().getFullYear(), total_allocated: '', village_id: '' });
      fetchBudgets();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to create budget');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBudget) return;
    try {
      await api.put(`/budgets/${editingBudget.id}`, formData);
      setIsEditOpen(false);
      setEditingBudget(null);
      setFormData({ year: new Date().getFullYear(), total_allocated: '', village_id: '' });
      fetchBudgets();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to update budget');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this budget?')) return;
    try {
      await api.delete(`/budgets/${id}`);
      fetchBudgets();
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to delete budget');
    }
  };

  const openEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setFormData({
      year: budget.year,
      total_allocated: budget.total_allocated,
      village_id: '',
    });
    setIsEditOpen(true);
  };

  const getVillageName = (villageId: number) => {
    return villages.find(v => v.id === villageId)?.name || `Village #${villageId}`;
  };

  return (
    <div className="space-y-6">
      {/* Charts: keep current table intact below */}
      <BudgetCharts budgets={budgets} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Budget Allocations</h1>
          <p className="text-muted-foreground">Manage annual budget allocations for your village</p>
        </div>
        {user?.role === 'admin' && (
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Budget
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Budget Allocation</DialogTitle>
                <DialogDescription>
                  Set up a new annual budget for your village.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate}>
                <div className="grid gap-4 py-4">
                  {user?.role === 'admin' && (
                    <div className="grid gap-2">
                      <Label htmlFor="village_id">Village</Label>
                      <select
                        id="village_id"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        value={formData.village_id}
                        onChange={(e) => setFormData({ ...formData, village_id: e.target.value })}
                        required
                      >
                        <option value="">Select a village</option>
                        {villages.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
                      type="number"
                      min="2000"
                      max="2100"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="total_allocated">Total Budget Amount (₹)</Label>
                    <Input
                      id="total_allocated"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="1000000.00"
                      value={formData.total_allocated}
                      onChange={(e) => setFormData({ ...formData, total_allocated: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Budget</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}

      </div>

      <Card>
        <CardHeader>
          <CardTitle>Budgets List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading budgets...</p>
            </div>
          ) : budgets.length === 0 ? (
            <div className="text-center py-8">
              <DollarSign className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">No budgets found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Create your first budget allocation to get started.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    {user?.role === 'admin' && <TableHead>Village</TableHead>}
                    <TableHead>Year</TableHead>
                    <TableHead>Total Allocated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgets.map((budget) => (
                    <TableRow key={budget.id}>
                      {user?.role === 'admin' && (
                        <TableCell className="font-medium">
                          {getVillageName(budget.village_id)}
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{budget.year}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">₹{parseFloat(budget.total_allocated).toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {user?.role === 'admin' && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => openEdit(budget)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDelete(budget.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget Allocation</DialogTitle>
            <DialogDescription>
              Update the budget allocation details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  type="number"
                  min="2000"
                  max="2100"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-total_allocated">Total Budget Amount (₹)</Label>
                <Input
                  id="edit-total_allocated"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="1000000.00"
                  value={formData.total_allocated}
                  onChange={(e) => setFormData({ ...formData, total_allocated: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Budget</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
