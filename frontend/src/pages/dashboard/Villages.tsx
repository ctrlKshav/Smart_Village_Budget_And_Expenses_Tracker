import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin, Calendar } from 'lucide-react';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

interface Village {
  id: number;
  name: string;
  district: string | null;
  state: string | null;
  created_at: string;
}

export default function Villages() {
  const { user } = useAuth();
  const [village, setVillage] = useState<Village | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVillage();
  }, []);

  const fetchVillage = async () => {
    try {
      const response = await api.get('/villages/me');
      setVillage(response.data);
    } catch (error) {
      console.error('Error fetching village:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Village Information</h1>
        <p className="text-muted-foreground">View your village details and information</p>
      </div>

      {loading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2 text-sm text-muted-foreground">Loading village information...</p>
            </div>
          </CardContent>
        </Card>
      ) : !village ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">Village information not available.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-l-4 border-l-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Building2 className="h-6 w-6" />
                {village.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">District</p>
                    <p className="text-lg font-semibold">{village.district || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">State</p>
                    <p className="text-lg font-semibold">{village.state || 'Not specified'}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Village ID</p>
                    <p className="text-lg font-semibold">#{village.id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Registered Since</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="text-lg font-semibold">
                        {new Date(village.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-medium">{village.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {village.district && village.state
                      ? `${village.district}, ${village.state}`
                      : 'Location details not available'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {user && (
            <Card>
              <CardHeader>
                <CardTitle>Your Role</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    You are managing the budget and expenses for <span className="font-semibold text-foreground">{village.name}</span>.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Your account: <span className="font-medium text-foreground">{user.name}</span> ({user.email})
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
