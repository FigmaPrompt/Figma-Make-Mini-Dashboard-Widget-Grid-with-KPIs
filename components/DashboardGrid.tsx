import React from 'react';
import { KPICard, KPIData } from './KPICard';

interface DashboardGridProps {
  data?: KPIData[];
  loading?: boolean;
  error?: boolean;
  className?: string;
}

export function DashboardGrid({ data, loading = false, error = false, className }: DashboardGridProps) {
  // Generate mock data if none provided
  const mockData: KPIData[] = [
    {
      id: '1',
      title: 'Total Revenue',
      value: '$45,231',
      change: { value: 12.5, type: 'increase' },
      icon: 'dollar-sign',
      chartData: [
        { value: 400 }, { value: 300 }, { value: 500 }, { value: 280 }, 
        { value: 590 }, { value: 320 }, { value: 450 }, { value: 380 }, 
        { value: 520 }, { value: 480 }
      ]
    },
    {
      id: '2', 
      title: 'Active Users',
      value: '2,350',
      change: { value: 8.2, type: 'increase' },
      icon: 'users',
      chartData: [
        { value: 200 }, { value: 180 }, { value: 220 }, { value: 240 }, 
        { value: 210 }, { value: 250 }, { value: 230 }, { value: 270 }, 
        { value: 260 }, { value: 280 }
      ]
    },
    {
      id: '3',
      title: 'Orders',
      value: '1,429',
      change: { value: 3.7, type: 'decrease' },
      icon: 'shopping-cart',
      chartData: [
        { value: 150 }, { value: 120 }, { value: 180 }, { value: 160 }, 
        { value: 140 }, { value: 170 }, { value: 130 }, { value: 155 }, 
        { value: 145 }, { value: 135 }
      ]
    },
    {
      id: '4',
      title: 'Conversion Rate',
      value: '3.24%',
      change: { value: 1.8, type: 'increase' },
      icon: 'activity',
      chartData: [
        { value: 3.1 }, { value: 3.2 }, { value: 3.0 }, { value: 3.3 }, 
        { value: 3.15 }, { value: 3.25 }, { value: 3.18 }, { value: 3.28 }, 
        { value: 3.22 }, { value: 3.24 }
      ]
    }
  ];

  const displayData = data || mockData;

  if (loading) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <KPICard key={`loading-${index}`} state="loading" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <KPICard key={`error-${index}`} state="error" />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 ${className}`}>
      {displayData.slice(0, 4).map((kpi) => (
        <KPICard 
          key={kpi.id} 
          data={kpi} 
          state="normal"
        />
      ))}
    </div>
  );
}