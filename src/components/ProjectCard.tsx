import React, { useState } from 'react';
import { Calendar, DollarSign, FileText, Clock, CheckCircle, Eye, Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { EditProjectModal } from './EditProjectModal';
import { AlertModal } from './AlertModal';

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

interface ProjectCardProps {
  project: Project;
  milestones: Milestone[];
  view?: 'card' | 'list';
  onUpdate?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  milestones, 
  view = 'card',
  onUpdate 
}) => {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [projectMilestones, setProjectMilestones] = useState<Milestone[]>(
    milestones.filter(m => m.project_id === project.id)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'New Lead';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'on_hold': return 'Awaiting Payment';
      default: return status;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleMilestone = async (milestoneId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('milestones')
        .update({ completed: !completed })
        .eq('id', milestoneId);

      if (error) throw error;

      setProjectMilestones(prev => 
        prev.map(m => m.id === milestoneId ? { ...m, completed: !completed } : m)
      );

      toast.success(`Milestone ${!completed ? 'completed' : 'reopened'}`);
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast.error('Failed to update milestone');
    }
  };

  const deleteProject = async () => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id);

      if (error) throw error;

      toast.success('Project deleted successfully');
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !projectMilestones.find(m => m.due_date === dueDate)?.completed;
  };

  const overdueMilestones = projectMilestones.filter(m => isOverdue(m.due_date));

  if (view === 'list') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-slate-900">{project.project_name}</h3>
                <Badge className={getStatusColor(project.status)}>
                  {getStatusText(project.status)}
                </Badge>
                {overdueMilestones.length > 0 && (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {overdueMilestones.length} Overdue
                  </Badge>
                )}
              </div>
              <p className="text-slate-600 mb-2">Client: {project.client_name}</p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Started: {formatDate(project.start_date)}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Total: {formatCurrency(project.amount)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Balance: {formatCurrency(project.remaining_balance)}
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {projectMilestones.filter(m => m.completed).length}/{projectMilestones.length} Milestones
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Project Details</DialogTitle>
                  </DialogHeader>
                  <ProjectDetails project={project} milestones={projectMilestones} onToggleMilestone={toggleMilestone} />
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" onClick={() => setIsEditOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsDeleteAlertOpen(true)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900 text-sm leading-tight mb-1">
                {project.project_name}
              </h3>
              <p className="text-xs text-slate-600">{project.client_name}</p>
            </div>
            <Badge className={`${getStatusColor(project.status)} text-xs`}>
              {getStatusText(project.status)}
            </Badge>
          </div>

          {/* Overdue Warning */}
          {overdueMilestones.length > 0 && (
            <div className="flex items-center gap-1 text-red-600 text-xs">
              <AlertCircle className="w-3 h-3" />
              {overdueMilestones.length} overdue milestone{overdueMilestones.length > 1 ? 's' : ''}
            </div>
          )}

          {/* Financial Info */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Total Amount</span>
              <span className="font-semibold text-slate-900">{formatCurrency(project.amount)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Deposit Paid</span>
              <span className="text-green-600">{formatCurrency(project.deposit)}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600">Balance</span>
              <span className="text-orange-600">{formatCurrency(project.remaining_balance)}</span>
            </div>
          </div>

          {/* Milestones Progress */}
          {projectMilestones.length > 0 && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-600">Milestones</span>
                <span className="text-slate-900">
                  {projectMilestones.filter(m => m.completed).length}/{projectMilestones.length}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5">
                <div 
                  className="bg-green-600 h-1.5 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${(projectMilestones.filter(m => m.completed).length / projectMilestones.length) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
          )}

          {/* Start Date */}
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="w-3 h-3" />
            Started {formatDate(project.start_date)}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2">
            <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-xs">
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Project Details</DialogTitle>
                </DialogHeader>
                <ProjectDetails project={project} milestones={projectMilestones} onToggleMilestone={toggleMilestone} />
              </DialogContent>
            </Dialog>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" className="text-xs" onClick={() => setIsEditOpen(true)}>
                <Edit className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsDeleteAlertOpen(true)} className="text-xs">
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      {/* Edit Project Modal */}
      <EditProjectModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        project={project}
        onProjectUpdated={onUpdate}
      />
      
      {/* Delete Confirmation Modal */}
      <AlertModal
        isOpen={isDeleteAlertOpen}
        onClose={() => setIsDeleteAlertOpen(false)}
        onConfirm={deleteProject}
        title="Delete Project"
        message={`Are you sure you want to delete "${project.project_name}"? This action cannot be undone.`}
        type="error"
        confirmText="Delete"
        cancelText="Cancel"
        showCancel={true}
      />
    </Card>
  );
};

const ProjectDetails: React.FC<{
  project: Project;
  milestones: Milestone[];
  onToggleMilestone: (id: string, completed: boolean) => void;
}> = ({ project, milestones }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-900">Project Information</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Project:</span> {project.project_name}</p>
            <p><span className="font-medium">Client:</span> {project.client_name}</p>
            <p><span className="font-medium">Start Date:</span> {formatDate(project.start_date)}</p>
            <p><span className="font-medium">Status:</span> {project.status}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-slate-900">Financial Summary</h4>
          <div className="space-y-1 text-sm">
            <p><span className="font-medium">Total Amount:</span> {formatCurrency(project.amount)}</p>
            <p><span className="font-medium">Deposit Paid:</span> {formatCurrency(project.deposit)}</p>
            <p><span className="font-medium">Remaining Balance:</span> {formatCurrency(project.remaining_balance)}</p>
            <p><span className="font-medium">Progress:</span> {((project.deposit / project.amount) * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Notes */}
      {project.notes && (
        <div>
          <h4 className="font-semibold text-slate-900 mb-2">Notes</h4>
          <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{project.notes}</p>
        </div>
      )}

      {/* Milestones */}
      {milestones.length > 0 && (
        <div>
          <h4 className="font-semibold text-slate-900 mb-3">Milestones</h4>
          <div className="space-y-2">
            {milestones.map(milestone => (
              <div key={milestone.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={() => {}}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <div className="flex-1">
                  <p className={`text-sm font-medium ${milestone.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {milestone.name}
                  </p>
                  <p className="text-xs text-slate-500">Due: {formatDate(milestone.due_date)}</p>
                </div>
                <Badge variant={milestone.completed ? 'default' : 'secondary'}>
                  {milestone.completed ? 'Completed' : 'Pending'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
