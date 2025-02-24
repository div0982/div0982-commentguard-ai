import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PolicyLayoutProps {
  children: React.ReactNode;
}

export function PolicyLayout({ children }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-4 left-4 z-50">
        <Button asChild variant="outline">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      {children}
    </div>
  );
} 