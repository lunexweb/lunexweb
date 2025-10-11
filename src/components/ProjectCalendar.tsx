import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Clock, CheckCircle, AlertCircle, Plus, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddEventModal } from './AddEventModal';

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

interface ProjectCalendarProps {
  projects: Project[];
  milestones: Milestone[];
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'project_start' | 'milestone_due' | 'milestone_completed';
  project?: Project;
  milestone?: Milestone;
  isOverdue?: boolean;
}

export const ProjectCalendar: React.FC<ProjectCalendarProps> = ({ projects, milestones }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  useEffect(() => {
    generateCalendarEvents();
  }, [projects, milestones]);

  const generateCalendarEvents = () => {
    const events: CalendarEvent[] = [];

    // Add project start dates
    projects.forEach(project => {
      events.push({
        id: `project-${project.id}`,
        title: `Start: ${project.project_name}`,
        date: project.start_date,
        type: 'project_start',
        project
      });
    });

    // Add milestones
    milestones.forEach(milestone => {
      const project = projects.find(p => p.id === milestone.project_id);
      events.push({
        id: `milestone-${milestone.id}`,
        title: milestone.name,
        date: milestone.due_date,
        type: milestone.completed ? 'milestone_completed' : 'milestone_due',
        project,
        milestone,
        isOverdue: !milestone.completed && new Date(milestone.due_date) < new Date()
      });
    });

    setCalendarEvents(events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return calendarEvents.filter(event => event.date === dateStr);
  };

  const getEventColor = (event: CalendarEvent) => {
    switch (event.type) {
      case 'project_start':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'milestone_due':
        return event.isOverdue ? 'bg-red-100 text-red-800 border-red-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'milestone_completed':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEventIcon = (event: CalendarEvent) => {
    switch (event.type) {
      case 'project_start':
        return <Calendar className="w-3 h-3" />;
      case 'milestone_due':
        return event.isOverdue ? <AlertCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />;
      case 'milestone_completed':
        return <CheckCircle className="w-3 h-3" />;
      default:
        return <Calendar className="w-3 h-3" />;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return [];
    return getEventsForDate(selectedDate);
  };

  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">Project Calendar</h3>
          <p className="text-slate-600 mt-1">Track project start dates and milestone deadlines</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={viewMode} onValueChange={(value: any) => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setIsAddEventOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {monthName}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                    Today
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Day names header */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-slate-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-2 h-24" />;
                  }

                  const dayEvents = getEventsForDate(day);
                  const today = isToday(day);
                  const selected = isSelected(day);

                  return (
                    <div
                      key={day.getTime()}
                      className={`p-2 h-24 border border-slate-200 cursor-pointer transition-colors hover:bg-slate-50 ${
                        today ? 'bg-blue-50 border-blue-300' : ''
                      } ${selected ? 'bg-green-50 border-green-300' : ''}`}
                      onClick={() => setSelectedDate(day)}
                    >
                      <div className={`text-sm font-medium mb-1 ${
                        today ? 'text-blue-600' : selected ? 'text-green-600' : 'text-slate-900'
                      }`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-1 py-0.5 rounded border flex items-center gap-1 ${getEventColor(event)}`}
                            title={event.title}
                          >
                            {getEventIcon(event)}
                            <span className="truncate">{event.title}</span>
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-500">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Date Events */}
          {selectedDate && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {formatDate(selectedDate)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {getEventsForSelectedDate().length > 0 ? (
                  <div className="space-y-3">
                    {getEventsForSelectedDate().map(event => (
                      <div key={event.id} className="p-3 border rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-full ${getEventColor(event)}`}>
                            {getEventIcon(event)}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900">{event.title}</h4>
                            {event.project && (
                              <p className="text-sm text-slate-600">
                                Client: {event.project.client_name}
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {event.type.replace('_', ' ')}
                              </Badge>
                              {event.isOverdue && (
                                <Badge variant="destructive" className="text-xs">
                                  Overdue
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Event Details</DialogTitle>
                              </DialogHeader>
                              <EventDetails event={event} />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 text-center py-4">No events on this date</p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {calendarEvents
                  .filter(event => new Date(event.date) >= new Date())
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${getEventColor(event)}`}>
                          {getEventIcon(event)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 text-sm">{event.title}</h4>
                          <p className="text-xs text-slate-600">
                            {formatDate(new Date(event.date))}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Overdue Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-red-600">Overdue Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {calendarEvents
                  .filter(event => event.isOverdue)
                  .slice(0, 5)
                  .map(event => (
                    <div key={event.id} className="p-3 border border-red-200 rounded-lg bg-red-50">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900 text-sm">{event.title}</h4>
                          <p className="text-xs text-red-600">
                            Due: {formatDate(new Date(event.date))}
                          </p>
                          {event.project && (
                            <p className="text-xs text-slate-600">
                              {event.project.client_name}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                {calendarEvents.filter(event => event.isOverdue).length === 0 && (
                  <p className="text-slate-500 text-center py-4">No overdue milestones</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Event Modal */}
      <AddEventModal
        isOpen={isAddEventOpen}
        onClose={() => setIsAddEventOpen(false)}
        projects={projects}
        selectedDate={selectedDate || undefined}
        onEventAdded={() => {
          generateCalendarEvents(); // Refresh events
          setIsAddEventOpen(false);
        }}
      />
    </div>
  );
};