import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, Search, Filter, Bell, Calendar, Download, Eye, Edit, Trash2, FileText, DollarSign, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { MonthlyRevenueService } from '@/lib/monthlyRevenueService';
import { AddProjectModal } from './AddProjectModal';
import { ProjectCard } from './ProjectCard';
import { RevenueAnalytics } from './RevenueAnalytics';
import { ProjectCalendar } from './ProjectCalendar';
import { NotificationsDropdown } from './NotificationsDropdown';
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

interface Milestone {
  id: string;
  project_id: string;
  name: string;
  due_date: string;
  completed: boolean;
  notes?: string;
}

interface Notification {
  id: string;
  project_id?: string;
  milestone_id?: string;
  message: string;
  type: 'milestone' | 'payment' | 'deadline' | 'reminder';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  scheduled_for?: string;
  created_at: string;
}

const statusColumns = {
  'new_lead': {
    title: 'New Lead',
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700',
    items: []
  },
  'in_progress': {
    title: 'In Progress',
    color: 'bg-yellow-50 border-yellow-200',
    textColor: 'text-yellow-700',
    items: []
  },
  'awaiting_payment': {
    title: 'Awaiting Payment',
    color: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-700',
    items: []
  },
  'completed': {
    title: 'Completed',
    color: 'bg-green-50 border-green-200',
    textColor: 'text-green-700',
    items: []
  }
};

export const ProjectManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterClient, setFilterClient] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('board');

  // Fetch projects and related data
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch projects from both tables
      const [projectsResult, portfolioResult] = await Promise.all([
        supabase.from('projects').select('*').order('created_at', { ascending: false }),
        supabase.from('portfolio_projects').select('*').eq('is_published', true).order('created_at', { ascending: false })
      ]);

      const { data: projectsData, error: projectsError } = projectsResult;
      const { data: portfolioData, error: portfolioError } = portfolioResult;

      if (projectsError) console.warn('Projects table error:', projectsError);
      if (portfolioError) console.warn('Portfolio projects error:', portfolioError);

      // Fetch milestones
      const { data: milestonesData, error: milestonesError } = await supabase
        .from('milestones')
        .select('*')
        .order('due_date', { ascending: true });

      if (milestonesError) throw milestonesError;

      // Fetch notifications
      const { data: notificationsData, error: notificationsError } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });

      if (notificationsError) throw notificationsError;

      // Transform portfolio projects to match the Project interface
      const transformedPortfolioProjects = (portfolioData || []).map(project => ({
        id: project.id,
        client_name: project.client_name || 'Unknown Client',
        project_name: project.title || 'Untitled Project',
        amount: project.estimated_value || 100000,
        deposit: project.estimated_value ? Math.round(project.estimated_value * 0.3) : 30000,
        remaining_balance: project.estimated_value ? Math.round(project.estimated_value * 0.7) : 70000,
        start_date: project.project_start_date || project.created_at?.split('T')[0] || new Date().toISOString().split('T')[0],
        status: project.completion_date ? 'completed' : 
                project.project_start_date ? 'in_progress' : 
                'pending', // Use database-compatible status values
        notes: project.short_description || project.description || '',
        files: [],
        created_at: project.created_at,
        updated_at: project.updated_at
      }));

      // Combine both project sources
      const allProjects = [...(projectsData || []), ...transformedPortfolioProjects];

      console.log('Projects loaded:', {
        projectsTable: projectsData?.length || 0,
        portfolioProjects: portfolioData?.length || 0,
        totalProjects: allProjects.length,
        projectStatuses: allProjects.reduce((acc, p) => {
          acc[p.status] = (acc[p.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>)
      });

      setProjects(allProjects);
      setMilestones(milestonesData || []);
      setNotifications(notificationsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Organize projects by status for Kanban board
  const organizeProjectsByStatus = () => {
    const organized = { ...statusColumns };
    
    // Clear all items first
    Object.keys(organized).forEach(key => {
      organized[key].items = [];
    });
    
    projects.forEach(project => {
      // Map database statuses to Kanban column keys
      let columnKey: string;
      switch (project.status) {
        case 'pending':
          columnKey = 'new_lead';
          break;
        case 'in_progress':
          columnKey = 'in_progress';
          break;
        case 'on_hold':
          columnKey = 'awaiting_payment';
          break;
        case 'completed':
          columnKey = 'completed';
          break;
        default:
          columnKey = 'new_lead'; // Default fallback
      }
      
      if (organized[columnKey]) {
        organized[columnKey].items.push(project);
      }
    });
    
    // Debug logging
    const columnCounts = Object.entries(organized).reduce((acc, [key, column]) => {
      acc[key] = column.items.length;
      return acc;
    }, {} as Record<string, number>);
    
    console.log('Kanban column distribution:', columnCounts);
    
    return organized;
  };

  // Handle drag and drop
  const handleDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    console.log('Drag end:', { destination, source, draggableId });

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Map Kanban columns to database status values
    const statusMapping: { [key: string]: string } = {
      'new_lead': 'pending',
      'in_progress': 'in_progress', 
      'awaiting_payment': 'on_hold',
      'completed': 'completed'
    };

    const newStatus = statusMapping[destination.droppableId] || 'pending';

    console.log('Updating project status:', { draggableId, from: source.droppableId, to: destination.droppableId, newStatus });

    try {
      // Update in database
      const { error } = await supabase
        .from('projects')
        .update({ status: newStatus })
        .eq('id', draggableId);

      if (error) throw error;

      console.log('Database update successful');

      // Update local state immediately (optimistic update)
      setProjects(prev => prev.map(project => 
        project.id === draggableId ? { ...project, status: newStatus } : project
      ));

      toast.success('Project status updated');
      
      // Update monthly revenue calculations when project status changes
      MonthlyRevenueService.updateCurrentMonthRevenue();
    } catch (error) {
      console.error('Error updating project status:', error);
      toast.error('Failed to update project status');
      
      // Revert the optimistic update on error
      fetchData();
    }
  };

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.project_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    const matchesClient = filterClient === 'all' || project.client_name === filterClient;
    
    return matchesSearch && matchesStatus && matchesClient;
  });

  // Get unique clients for filter
  const uniqueClients = Array.from(new Set(projects.map(p => p.client_name)));

  // Calculate stats
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const pendingPayments = projects.filter(p => p.status === 'on_hold').length;
  const averageDealSize = projects.length > 0 ? 
    projects.reduce((sum, p) => sum + p.amount, 0) / projects.length : 0;

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
          <h2 className="text-3xl font-bold text-slate-900">Project Management & Deals</h2>
          <p className="text-slate-600 mt-1">Manage your projects, track progress, and monitor revenue</p>
        </div>
        <div className="flex items-center gap-2">
          <NotificationsDropdown 
            notifications={notifications} 
            onMarkAsRead={(id) => {
              setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
            }}
            onMarkAllAsRead={() => {
              setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            }}
          />
          <Button onClick={() => setIsAddModalOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Projects</p>
                <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedProjects}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending Payments</p>
                <p className="text-2xl font-bold text-orange-600">{pendingPayments}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg Deal Size</p>
                <p className="text-2xl font-bold text-slate-900">R{averageDealSize.toLocaleString('en-ZA')}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="board">Kanban Board</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">Project List</TabsTrigger>
        </TabsList>

        <TabsContent value="board" className="space-y-6">
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search projects or clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">New Lead</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="on_hold">Awaiting Payment</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterClient} onValueChange={setFilterClient}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by client" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Clients</SelectItem>
                {uniqueClients.map(client => (
                  <SelectItem key={client} value={client}>{client}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Kanban Board */}
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {Object.entries(organizeProjectsByStatus()).map(([columnId, column]) => (
                <div key={columnId} className="space-y-4">
                  <div className={`p-4 rounded-lg border-2 ${column.color}`}>
                    <h3 className={`font-semibold ${column.textColor}`}>
                      {column.title}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {column.items.length}
                    </Badge>
                  </div>
                  
                  <Droppable droppableId={columnId}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`min-h-[400px] p-4 rounded-lg border-2 border-dashed transition-colors ${
                          snapshot.isDraggingOver ? 'border-green-300 bg-green-50' : 'border-slate-200'
                        }`}
                      >
                        {column.items
                          .filter(project => filteredProjects.includes(project))
                          .map((project, index) => (
                            <Draggable key={project.id} draggableId={project.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`mb-4 ${snapshot.isDragging ? 'rotate-2 scale-105' : ''}`}
                                >
                                  <ProjectCard project={project} milestones={milestones} onUpdate={fetchData} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </TabsContent>

        <TabsContent value="analytics">
          <RevenueAnalytics projects={projects} />
        </TabsContent>

        <TabsContent value="calendar">
          <ProjectCalendar projects={projects} milestones={milestones} />
        </TabsContent>

        <TabsContent value="list">
          <div className="space-y-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} milestones={milestones} view="list" onUpdate={fetchData} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProjectAdded={fetchData}
      />
    </div>
  );
};