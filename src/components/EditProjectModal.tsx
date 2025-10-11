import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, FileText, X, Upload, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { MonthlyRevenueService } from '@/lib/monthlyRevenueService';
import { toast } from 'sonner';
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
  name: string;
  due_date: string;
  completed: boolean;
}

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onProjectUpdated: () => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  onClose,
  project,
  onProjectUpdated
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({});
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ name: '', due_date: '' });
  const [isDeleteMilestoneAlertOpen, setIsDeleteMilestoneAlertOpen] = useState(false);
  const [milestoneToDelete, setMilestoneToDelete] = useState<string | null>(null);

  // Initialize form data when project changes
  useEffect(() => {
    if (project) {
      setFormData({
        client_name: project.client_name,
        project_name: project.project_name,
        amount: project.amount,
        deposit: project.deposit,
        start_date: project.start_date,
        status: project.status,
        notes: project.notes || ''
      });
    }
  }, [project]);

  // Fetch milestones when project changes
  useEffect(() => {
    if (project?.id) {
      fetchMilestones();
    }
  }, [project?.id]);

  const fetchMilestones = async () => {
    if (!project?.id) return;

    try {
      const { data, error } = await supabase
        .from('milestones')
        .select('*')
        .eq('project_id', project.id)
        .order('due_date', { ascending: true });

      if (error) throw error;
      setMilestones(data || []);
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  const handleInputChange = (field: keyof Project, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addMilestone = async () => {
    if (!project?.id || !newMilestone.name.trim() || !newMilestone.due_date) return;

    try {
      const { error } = await supabase
        .from('milestones')
        .insert([{
          project_id: project.id,
          name: newMilestone.name.trim(),
          due_date: newMilestone.due_date,
          completed: false
        }]);

      if (error) throw error;

      setNewMilestone({ name: '', due_date: '' });
      fetchMilestones();
      toast.success('Milestone added successfully');
    } catch (error) {
      console.error('Error adding milestone:', error);
      toast.error('Failed to add milestone');
    }
  };

  const toggleMilestone = async (milestoneId: string, completed: boolean) => {
    try {
      const { error } = await supabase
        .from('milestones')
        .update({ completed: !completed })
        .eq('id', milestoneId);

      if (error) throw error;

      setMilestones(prev => 
        prev.map(m => m.id === milestoneId ? { ...m, completed: !completed } : m)
      );
      toast.success(`Milestone ${!completed ? 'completed' : 'reopened'}`);
    } catch (error) {
      console.error('Error updating milestone:', error);
      toast.error('Failed to update milestone');
    }
  };

  const deleteMilestone = async (milestoneId: string) => {
    setMilestoneToDelete(milestoneId);
    setIsDeleteMilestoneAlertOpen(true);
  };

  const confirmDeleteMilestone = async () => {
    if (!milestoneToDelete) return;

    try {
      const { error } = await supabase
        .from('milestones')
        .delete()
        .eq('id', milestoneToDelete);

      if (error) throw error;

      setMilestones(prev => prev.filter(m => m.id !== milestoneToDelete));
      toast.success('Milestone deleted');
      setMilestoneToDelete(null);
    } catch (error) {
      console.error('Error deleting milestone:', error);
      toast.error('Failed to delete milestone');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project?.id) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('projects')
        .update({
          client_name: formData.client_name,
          project_name: formData.project_name,
          amount: formData.amount,
          deposit: formData.deposit,
          start_date: formData.start_date,
          status: formData.status,
          notes: formData.notes
        })
        .eq('id', project.id);

      if (error) throw error;

      toast.success('Project updated successfully!');
      
      // Update monthly revenue calculations when project is updated
      MonthlyRevenueService.updateCurrentMonthRevenue();
      
      onProjectUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
      toast.error('Failed to update project');
    } finally {
      setLoading(false);
    }
  };

  const remainingBalance = (formData.amount || 0) - (formData.deposit || 0);

  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client_name">Client Name *</Label>
                  <Input
                    id="client_name"
                    value={formData.client_name || ''}
                    onChange={(e) => handleInputChange('client_name', e.target.value)}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name *</Label>
                  <Input
                    id="project_name"
                    value={formData.project_name || ''}
                    onChange={(e) => handleInputChange('project_name', e.target.value)}
                    placeholder="Enter project name"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Total Amount *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      value={formData.amount || 0}
                      onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deposit">Deposit Paid</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="deposit"
                      type="number"
                      step="0.01"
                      value={formData.deposit || 0}
                      onChange={(e) => handleInputChange('deposit', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Remaining Balance</Label>
                  <div className="flex items-center h-10 px-3 bg-slate-50 border border-slate-200 rounded-md">
                    <span className="text-slate-600 font-medium">
                      R{remainingBalance.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_date">Start Date *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date || ''}
                      onChange={(e) => handleInputChange('start_date', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status || 'pending'} 
                    onValueChange={(value) => handleInputChange('status', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">New Lead</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="on_hold">Awaiting Payment</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Add any additional notes about this project..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Project Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="milestone_name">Milestone Name</Label>
                  <Input
                    id="milestone_name"
                    value={newMilestone.name}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Design Phase, Development, Testing"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="milestone_date">Due Date</Label>
                  <Input
                    id="milestone_date"
                    type="date"
                    value={newMilestone.due_date}
                    onChange={(e) => setNewMilestone(prev => ({ ...prev, due_date: e.target.value }))}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={addMilestone}
                disabled={!newMilestone.name.trim() || !newMilestone.due_date}
              >
                Add Milestone
              </Button>

              {/* Milestones List */}
              {milestones.length > 0 && (
                <div className="space-y-2">
                  <Label>Project Milestones</Label>
                  <div className="space-y-2">
                    {milestones.map((milestone) => (
                      <div key={milestone.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={milestone.completed}
                            onChange={() => toggleMilestone(milestone.id, milestone.completed)}
                            className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                          />
                          <div>
                            <p className={`font-medium ${milestone.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {milestone.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              Due: {new Date(milestone.due_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => deleteMilestone(milestone.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
        
        {/* Delete Milestone Confirmation Modal */}
        <AlertModal
          isOpen={isDeleteMilestoneAlertOpen}
          onClose={() => {
            setIsDeleteMilestoneAlertOpen(false);
            setMilestoneToDelete(null);
          }}
          onConfirm={confirmDeleteMilestone}
          title="Delete Milestone"
          message="Are you sure you want to delete this milestone? This action cannot be undone."
          type="error"
          confirmText="Delete"
          cancelText="Cancel"
          showCancel={true}
        />
      </DialogContent>
    </Dialog>
  );
};