import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '@/services/api';

interface Village {
  id: number;
  name: string;
  district: string | null;
  state: string | null;
  created_at: string;
}

export default function Villages() {
  const [villages, setVillages] = useState<Village[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVillages();
  }, []);

  const fetchVillages = async () => {
    try {
      const response = await api.get('/villages/');
      setVillages(response.data);
    } catch (error) {
      console.error('Error fetching villages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Villages</h1>
        <p className="text-muted-foreground">View and manage village information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Villages List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading villages...</p>
            </div>
          ) : villages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No villages found.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Villages will appear here once they are added to the system.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>State</TableHead>
                    <TableHead>Created At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {villages.map((village) => (
                    <TableRow key={village.id}>
                      <TableCell>{village.id}</TableCell>
                      <TableCell className="font-medium">{village.name}</TableCell>
                      <TableCell>{village.district || '-'}</TableCell>
                      <TableCell>{village.state || '-'}</TableCell>
                      <TableCell>{new Date(village.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
