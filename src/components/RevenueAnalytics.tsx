import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, BarChart3, PieChart, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { BusinessStatsService } from '@/lib/businessStatsService';
import { toast } from 'sonner';

interface Project {
  id: string;
  client_name: string;
  project_name: string;
  amount: number;
  deposit: number;
  remaining_balance: number;
  start_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  notes?: string;
  files?: any[];
  created_at: string;
  updated_at: string;
}

interface MonthlyRevenue {
  id: string;
  month: string;
  year: number;
  total_revenue: number;
  total_projects: number;
  completed_projects: number;
  created_at: string;
  updated_at: string;
}

interface RevenueAnalyticsProps {
  projects: Project[];
}

export const RevenueAnalytics: React.FC<RevenueAnalyticsProps> = ({ projects }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6months');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  useEffect(() => {
    fetchMonthlyRevenue();
    // Update monthly revenue table with real calculations
    BusinessStatsService.updateMonthlyRevenueTable();
  }, [timeRange]);

  const fetchMonthlyRevenue = async () => {
    try {
      setLoading(true);
      
      let startDate = new Date();
      switch (timeRange) {
        case '3months':
          startDate.setMonth(startDate.getMonth() - 3);
          break;
        case '6months':
          startDate.setMonth(startDate.getMonth() - 6);
          break;
        case '12months':
          startDate.setFullYear(startDate.getFullYear() - 1);
          break;
        case 'all':
          startDate = new Date('2020-01-01');
          break;
      }

      const { data, error } = await supabase
        .from('monthly_revenue')
        .select('*')
        .gte('created_at', startDate.toISOString())
        .order('year', { ascending: true })
        .order('month', { ascending: true });

      if (error) throw error;
      setMonthlyRevenue(data || []);
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      toast.error('Failed to load revenue data');
    } finally {
      setLoading(false);
    }
  };

  // Calculate current month revenue
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const currentMonthRevenue = monthlyRevenue.find(
    r => r.month === new Date().toLocaleDateString('en-US', { month: 'long' }) && 
         r.year === new Date().getFullYear()
  );

  // Calculate previous month for comparison
  const previousMonth = new Date();
  previousMonth.setMonth(previousMonth.getMonth() - 1);
  const previousMonthRevenue = monthlyRevenue.find(
    r => r.month === previousMonth.toLocaleDateString('en-US', { month: 'long' }) && 
         r.year === previousMonth.getFullYear()
  );

  // Calculate growth percentage
  const calculateGrowth = () => {
    if (!currentMonthRevenue || !previousMonthRevenue) return 0;
    return ((currentMonthRevenue.total_revenue - previousMonthRevenue.total_revenue) / previousMonthRevenue.total_revenue) * 100;
  };

  const growthPercentage = calculateGrowth();
  const isGrowth = growthPercentage >= 0;

  // Calculate stats
  const totalRevenue = projects.reduce((sum, p) => sum + p.amount, 0);
  const totalDeposits = projects.reduce((sum, p) => sum + p.deposit, 0);
  const totalBalance = projects.reduce((sum, p) => sum + p.remaining_balance, 0);
  const averageDealSize = projects.length > 0 ? totalRevenue / projects.length : 0;
  const completedRevenue = projects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

  // Revenue by status
  const revenueByStatus = {
    pending: projects.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    in_progress: projects.filter(p => p.status === 'in_progress').reduce((sum, p) => sum + p.amount, 0),
    completed: projects.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    on_hold: projects.filter(p => p.status === 'on_hold').reduce((sum, p) => sum + p.amount, 0)
  };

  const exportToCSV = () => {
    const csvData = [
      ['Month', 'Year', 'Total Revenue', 'Total Projects', 'Completed Projects'],
      ...monthlyRevenue.map(r => [r.month, r.year.toString(), r.total_revenue.toString(), r.total_projects.toString(), r.completed_projects.toString()])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `revenue-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Revenue data exported successfully');
  };

  // Simple chart data preparation
  const chartData = monthlyRevenue.map(r => ({
    month: r.month.substring(0, 3), // Short month name
    revenue: r.total_revenue,
    projects: r.total_projects
  }));

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Revenue Analytics</h3>
          <p className="text-slate-600 mt-1">Track your revenue performance and growth</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="12months">Last 12 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Revenue This Month</p>
                <p className="text-2xl font-bold text-slate-900">
                  R{currentMonthRevenue?.total_revenue.toLocaleString('en-ZA') || '0'}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  {isGrowth ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm ${isGrowth ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(growthPercentage).toFixed(1)}% vs last month
                  </span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Revenue</p>
                <p className="text-2xl font-bold text-slate-900">R{totalRevenue.toLocaleString('en-ZA')}</p>
                <p className="text-sm text-slate-500 mt-1">All projects</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Collected Deposits</p>
                <p className="text-2xl font-bold text-green-600">R{totalDeposits.toLocaleString('en-ZA')}</p>
                <p className="text-sm text-slate-500 mt-1">
                  {((totalDeposits / totalRevenue) * 100).toFixed(1)}% of total
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Balance</p>
                <p className="text-2xl font-bold text-orange-600">R{totalBalance.toLocaleString('en-ZA')}</p>
                <p className="text-sm text-slate-500 mt-1">Outstanding payments</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Revenue by Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Chart Type Toggle */}
              <div className="flex items-center gap-2">
                <Button
                  variant={chartType === 'bar' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('bar')}
                >
                  Bar
                </Button>
                <Button
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}
                >
                  Line
                </Button>
              </div>

              {/* Simple Chart Visualization */}
              <div className="h-64 flex items-end justify-between gap-2 p-4 bg-slate-50 rounded-lg">
                {chartData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center gap-2 flex-1">
                    <div className="relative w-full">
                      <div
                        className={`w-full transition-all duration-500 ${
                          chartType === 'bar' ? 'rounded-t-md' : 'rounded-full'
                        } ${
                          index === chartData.length - 1 ? 'bg-green-600' : 'bg-slate-300'
                        }`}
                        style={{
                          height: `${(data.revenue / maxRevenue) * 200}px`,
                          minHeight: '4px'
                        }}
                      />
                      {chartType === 'line' && index < chartData.length - 1 && (
                        <div
                          className="absolute top-0 right-0 w-4 h-4 bg-green-600 rounded-full transform translate-x-2 -translate-y-2"
                          style={{
                            transform: `translate(${chartData[index + 1] ? '100%' : '0'}, -50%)`
                          }}
                        />
                      )}
                    </div>
                    <div className="text-xs text-slate-600 text-center">
                      <div className="font-medium">{data.month}</div>
                      <div className="text-slate-500">R{(data.revenue / 1000).toFixed(0)}k</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue by Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Revenue by Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(revenueByStatus).map(([status, amount]) => {
                const percentage = totalRevenue > 0 ? (amount / totalRevenue) * 100 : 0;
                const statusColors = {
                  pending: 'bg-blue-500',
                  in_progress: 'bg-yellow-500',
                  completed: 'bg-green-500',
                  on_hold: 'bg-orange-500'
                };
                const statusLabels = {
                  pending: 'New Lead',
                  in_progress: 'In Progress',
                  completed: 'Completed',
                  on_hold: 'Awaiting Payment'
                };

                return (
                  <div key={status} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-slate-700">
                        {statusLabels[status as keyof typeof statusLabels]}
                      </span>
                      <span className="text-sm text-slate-600">
                        R{amount.toLocaleString('en-ZA')} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${statusColors[status as keyof typeof statusColors]}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Average Deal Size</p>
              <p className="text-2xl font-bold text-slate-900">R{averageDealSize.toLocaleString('en-ZA')}</p>
              <p className="text-xs text-slate-500 mt-1">Per project</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Completion Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {projects.length > 0 ? ((completedRevenue / totalRevenue) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-slate-500 mt-1">Revenue completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-slate-600">Collection Rate</p>
              <p className="text-2xl font-bold text-blue-600">
                {totalRevenue > 0 ? ((totalDeposits / totalRevenue) * 100).toFixed(1) : 0}%
              </p>
              <p className="text-xs text-slate-500 mt-1">Deposits collected</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};