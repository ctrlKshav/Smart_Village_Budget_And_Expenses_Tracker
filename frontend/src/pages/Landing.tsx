import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-3xl w-full">
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-4 pb-8 pt-12">
            <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Smart Village Budget & Transparency System
            </CardTitle>
            <CardDescription className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering rural communities through transparent budget management and
              accountable expense tracking. Monitor village finances with clarity and trust.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center space-y-6 pb-12">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
