import React, { useState } from 'react';
import { Calendar, Clock, Plus, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
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

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  selectedDate?: Date;
  onEventAdded: () => void;
}

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  projects,
  selectedDate,
  onEventAdded
}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: selectedDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
    time: '09:00',
    type: 'milestone',
    project_id: '',
    description: '',
    priority: 'medium'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.type === 'milestone' && formData.project_id) {
        // Add milestone to project
        const { error } = await supabase
          .from('milestones')
          .insert([{
            project_id: formData.project_id,
            name: formData.title,
            due_date: formData.date,
            completed: false,
            notes: formData.description
          }]);

        if (error) throw error;
      } else {
        // Create a general notification/event
        const { error } = await supabase
          .from('notifications')
          .insert([{
            project_id: formData.project_id || null,
            message: formData.title,
            type: 'reminder',
            priority: formData.priority,
            scheduled_for: new Date(`${formData.date}T${formData.time}`).toISOString()
          }]);

        if (error) throw error;
      }

      toast.success('Event added successfully!');
      onEventAdded();
      onClose();
      
      // Reset form
      setFormData({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        type: 'milestone',
        project_id: '',
        description: '',
        priority: 'medium'
      });
    } catch (error) {
      console.error('Error adding event:', error);
      toast.error('Failed to add event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Plus className="w-4 h-4" />
            Add Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Label htmlFor="title" className="text-sm">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter event title"
              className="h-9"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="type" className="text-sm">Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milestone">Milestone</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="deadline">Deadline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="priority" className="text-sm">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.type === 'milestone' && (
            <div>
              <Label htmlFor="project" className="text-sm">Project</Label>
              <Select value={formData.project_id} onValueChange={(value) => handleInputChange('project_id', value)}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map(project => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.project_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="date" className="text-sm">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="h-9"
                required
              />
            </div>
            <div>
              <Label htmlFor="time" className="text-sm">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="h-9"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-sm">Notes (optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Add notes..."
              rows={2}
              className="text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} size="sm" className="bg-green-600 hover:bg-green-700">
              {loading ? 'Adding...' : 'Add Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};