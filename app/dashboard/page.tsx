'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StudentDashboard } from '@/components/student/StudentDashboard';
import { useAuth } from '@/lib/auth-context';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'student')) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || !isAuthenticated || user?.role !== 'student') {
    return <main className="min-h-screen bg-background" />;
  }

  return <StudentDashboard />;
}
