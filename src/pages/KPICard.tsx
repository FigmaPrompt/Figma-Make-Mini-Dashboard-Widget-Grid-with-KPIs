import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { TrendingUp, TrendingDown, AlertCircle, DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

export interface KPIData {
  id: string;
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon?: string;
  chartData?: Array<{ value: number }>;
}

interface KPICardProps {
  data?: KPIData;
  state?: 'normal' | 'loading' | 'error';
  className?: string;
}

const iconMap = {
  'dollar-sign': DollarSign,
  'users': Users,
  'shopping-cart': ShoppingCart,
  'activity': Activity,
};

export function KPICard({ data, state = 'normal', className }: KPICardProps) {
  if (state === 'loading') {
    return (
      <Card className={`relative overflow-hidden ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5 rounded" />
          </div>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20 mb-2" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="mt-4 h-16">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === 'error') {
    return (
      <Card className={`relative overflow-hidden border-destructive/20 ${className}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-destructive-foreground">Error</CardTitle>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground/70">Failed to load data</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const IconComponent = data.icon ? iconMap[data.icon as keyof typeof iconMap] : null;
  const isPositiveChange = data.change?.type === 'increase';
  const TrendIcon = isPositiveChange ? TrendingUp : TrendingDown;

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 hover:shadow-md ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground">{data.title}</CardTitle>
          {IconComponent && (
            <IconComponent className="h-5 w-5 text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl tracking-tight">{data.value}</div>
          
          {data.change && (
            <div className="flex items-center gap-2 text-sm">
              <TrendIcon 
                className={`h-4 w-4 ${
                  isPositiveChange ? 'text-green-600' : 'text-red-600'
                }`} 
              />
              <span 
                className={`${
                  isPositiveChange ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {isPositiveChange ? '+' : ''}{data.change.value}%
              </span>
              <span className="text-muted-foreground">from last period</span>
            </div>
          )}

          {data.chartData && data.chartData.length > 0 && (
            <div className="h-16 mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.chartData}>
                  <defs>
                    <linearGradient id={`gradient-${data.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop 
                        offset="5%" 
                        stopColor={isPositiveChange ? '#16a34a' : '#dc2626'} 
                        stopOpacity={0.3}
                      />
                      <stop 
                        offset="95%" 
                        stopColor={isPositiveChange ? '#16a34a' : '#dc2626'} 
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={isPositiveChange ? '#16a34a' : '#dc2626'}
                    strokeWidth={2}
                    fill={`url(#gradient-${data.id})`}
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}