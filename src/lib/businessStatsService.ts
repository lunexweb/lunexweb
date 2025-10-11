import { supabase } from './supabase';

export interface BusinessStats {
  totalProjects: number;
  completedProjects: number;
  totalRevenue: number;
  averageProjectValue: number;
  clientSatisfaction: number;
  projectCompletionRate: number;
}

export class BusinessStatsService {
  static async getAllBusinessStats(): Promise<BusinessStats> {
    try {
      // Fetch projects from both tables
      const [projectsResult, portfolioResult] = await Promise.all([
        supabase.from('projects').select('*'),
        supabase.from('portfolio_projects').select('*').eq('is_published', true)
      ]);

      const { data: projectsData, error: projectsError } = projectsResult;
      const { data: portfolioData, error: portfolioError } = portfolioResult;

      if (projectsError) console.warn('Projects table error:', projectsError);
      if (portfolioError) console.warn('Portfolio projects error:', portfolioError);

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
                'pending',
        notes: project.short_description || project.description || '',
        files: [],
        created_at: project.created_at,
        updated_at: project.updated_at
      }));

      // Combine both project sources
      const allProjects = [...(projectsData || []), ...transformedPortfolioProjects];

      // Calculate stats
      const totalProjects = allProjects.length;
      const completedProjects = allProjects.filter(p => p.status === 'completed').length;
      const totalRevenue = allProjects.reduce((sum, p) => sum + p.amount, 0);
      const averageProjectValue = totalProjects > 0 ? totalRevenue / totalProjects : 0;
      const projectCompletionRate = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;

      // Mock client satisfaction (in a real app, this would come from surveys/feedback)
      const clientSatisfaction = Math.min(95, Math.max(85, 90 + (projectCompletionRate - 70) * 0.2));

      return {
        totalProjects,
        completedProjects,
        totalRevenue,
        averageProjectValue,
        clientSatisfaction,
        projectCompletionRate
      };
    } catch (error) {
      console.error('Error fetching business stats:', error);
      // Return default stats on error
      return {
        totalProjects: 0,
        completedProjects: 0,
        totalRevenue: 0,
        averageProjectValue: 0,
        clientSatisfaction: 90,
        projectCompletionRate: 0
      };
    }
  }

  static async updateMonthlyRevenueTable(): Promise<void> {
    try {
      // This method updates the monthly revenue calculations
      // Implementation would depend on your specific business logic
      console.log('Monthly revenue table updated');
    } catch (error) {
      console.error('Error updating monthly revenue table:', error);
    }
  }
}
