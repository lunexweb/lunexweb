import React, { useState } from 'react';
import { Calendar, DollarSign, FileText, Plus, X, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import { MonthlyRevenueService } from '@/lib/monthlyRevenueService';
import { toast } from 'sonner';

interface Milestone {
  id: string;
  name: string;
  due_date: string;
  completed: boolean;
}

interface ProjectData {
  client_name: string;
  project_name: string;
  amount: number;
  deposit: number;
  start_date: string;
  status: 'pending' | 'in_progress' | 'completed' | 'on_hold';
  notes: string;
  milestones: Omit<Milestone, 'id'>[];
  files: File[];
}

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectAdded: () => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onProjectAdded
}) => {
  const [formData, setFormData] = useState<ProjectData>({
    client_name: '',
    project_name: '',
    amount: 0,
    deposit: 0,
    start_date: new Date().toISOString().split('T')[0],
    status: 'pending',
    notes: '',
    milestones: [],
    files: []
  });

  const [loading, setLoading] = useState(false);
  const [newMilestone, setNewMilestone] = useState({ name: '', due_date: '' });

  const handleInputChange = (field: keyof ProjectData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-calculate remaining balance when amount or deposit changes
    if (field === 'amount' || field === 'deposit') {
      const amount = field === 'amount' ? value : formData.amount;
      const deposit = field === 'deposit' ? value : formData.deposit;
      // Remaining balance will be calculated in the database trigger
    }
  };

  const addMilestone = () => {
    if (newMilestone.name.trim() && newMilestone.due_date) {
      setFormData(prev => ({
        ...prev,
        milestones: [
          ...prev.milestones,
          {
            name: newMilestone.name.trim(),
            due_date: newMilestone.due_date,
            completed: false
          }
        ]
      }));
      setNewMilestone({ name: '', due_date: '' });
    }
  };

  const removeMilestone = (index: number) => {
    setFormData(prev => ({
      ...prev,
      milestones: prev.milestones.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const uploadFiles = async (projectId: string, files: File[]) => {
    const uploadedFiles = [];
    
    for (const file of files) {
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${projectId}/${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('project-files')
          .upload(fileName, file);

        if (error) throw error;

        uploadedFiles.push({
          name: file.name,
          url: data.path,
          size: file.size,
          type: file.type
        });
      } catch (error) {
        console.error('Error uploading file:', error);
        toast.error(`Failed to upload ${file.name}`);
      }
    }

    return uploadedFiles;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert([{
          client_name: formData.client_name,
          project_name: formData.project_name,
          amount: formData.amount,
          deposit: formData.deposit,
          start_date: formData.start_date,
          status: formData.status,
          notes: formData.notes,
          files: [] // Will be updated after file upload
        }])
        .select()
        .single();

      if (projectError) throw projectError;

      // Upload files if any
      let uploadedFiles: any[] = [];
      if (formData.files.length > 0) {
        uploadedFiles = await uploadFiles(projectData.id, formData.files);
        
        // Update project with file URLs
        const { error: updateError } = await supabase
          .from('projects')
          .update({ files: uploadedFiles })
          .eq('id', projectData.id);

        if (updateError) throw updateError;
      }

      // Insert milestones if any
      if (formData.milestones.length > 0) {
        const milestonesData = formData.milestones.map(milestone => ({
          project_id: projectData.id,
          name: milestone.name,
          due_date: milestone.due_date,
          completed: false
        }));

        const { error: milestonesError } = await supabase
          .from('milestones')
          .insert(milestonesData);

        if (milestonesError) throw milestonesError;
      }

      toast.success('Project created successfully!');
      
      // Update monthly revenue calculations when new project is created
      MonthlyRevenueService.updateCurrentMonthRevenue();
      
      onProjectAdded();
      onClose();
      
      // Reset form
      setFormData({
        client_name: '',
        project_name: '',
        amount: 0,
        deposit: 0,
        start_date: new Date().toISOString().split('T')[0],
        status: 'pending',
        notes: '',
        milestones: [],
        files: []
      });

    } catch (error) {
      console.error('Error creating project:', error);
      toast.error('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const remainingBalance = formData.amount - formData.deposit;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Add New Project</DialogTitle>
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
                    value={formData.client_name}
                    onChange={(e) => handleInputChange('client_name', e.target.value)}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project_name">Project Name *</Label>
                  <Input
                    id="project_name"
                    value={formData.project_name}
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
                      value={formData.amount}
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
                      value={formData.deposit}
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
                      value={formData.start_date}
                      onChange={(e) => handleInputChange('start_date', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
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
                  value={formData.notes}
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
                <Plus className="w-4 h-4 mr-2" />
                Add Milestone
              </Button>

              {/* Milestones List */}
              {formData.milestones.length > 0 && (
                <div className="space-y-2">
                  <Label>Added Milestones</Label>
                  <div className="space-y-2">
                    {formData.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-900">{milestone.name}</p>
                          <p className="text-sm text-slate-500">
                            Due: {new Date(milestone.due_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeMilestone(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* File Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                File Attachments
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="files">Upload Files</Label>
                <Input
                  id="files"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.zip"
                />
                <p className="text-xs text-slate-500">
                  Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG, ZIP
                </p>
              </div>

              {/* Files List */}
              {formData.files.length > 0 && (
                <div className="space-y-2">
                  <Label>Selected Files</Label>
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-slate-500" />
                          <div>
                            <p className="font-medium text-slate-900">{file.name}</p>
                            <p className="text-sm text-slate-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeFile(index)}
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
              {loading ? 'Creating...' : 'Create Project'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};