import React, { useState } from 'react';
import { DashboardGrid } from './DashboardGrid';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Moon, Sun, RefreshCw, Zap, AlertTriangle } from 'lucide-react';

export function DashboardDemo() {
  const [isDark, setIsDark] = useState(false);
  const [state, setState] = useState<'normal' | 'loading' | 'error'>('normal');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const simulateLoading = () => {
    setState('loading');
    setTimeout(() => setState('normal'), 2000);
  };

  const simulateError = () => {
    setState('error');
    setTimeout(() => setState('normal'), 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your key performance indicators in real-time
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              Live Data
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {isDark ? 'Light' : 'Dark'}
            </Button>
          </div>
        </div>

        {/* Demo Controls */}
        <Card>
          <CardHeader>
            <CardTitle>Demo Controls</CardTitle>
            <CardDescription>
              Test different states of the dashboard widgets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={state === 'normal' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setState('normal')}
              >
                Normal State
              </Button>
              <Button
                variant={state === 'loading' ? 'default' : 'outline'}
                size="sm"
                onClick={simulateLoading}
                className="gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Loading State
              </Button>
              <Button
                variant={state === 'error' ? 'destructive' : 'outline'}
                size="sm"
                onClick={simulateError}
                className="gap-1"
              >
                <AlertTriangle className="h-3 w-3" />
                Error State
              </Button>
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Main Dashboard Grid */}
        <div>
          <h2 className="mb-6">Key Performance Indicators</h2>
          <DashboardGrid 
            loading={state === 'loading'}
            error={state === 'error'}
          />
        </div>

        {/* Responsive Grid Examples */}
        <div className="space-y-6">
          <h2>Responsive Layouts</h2>
          
          <Card>
            <CardHeader>
              <CardTitle>2-Card Layout</CardTitle>
              <CardDescription>Perfect for mobile and tablet views</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DashboardGrid className="grid grid-cols-1 gap-4" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3-Card Layout</CardTitle>
              <CardDescription>Optimized for tablet landscape</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DashboardGrid className="grid grid-cols-1 gap-4" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground text-sm pt-8 border-t">
          <p>Dashboard widgets with semantic tokens for light/dark mode support</p>
        </div>
      </div>
    </div>
  );
}