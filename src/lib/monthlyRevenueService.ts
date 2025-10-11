import { supabase } from './supabase';

export class MonthlyRevenueService {
  static async updateCurrentMonthRevenue(): Promise<void> {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleDateString('en-US', { month: 'long' });
      const currentYear = currentDate.getFullYear();

      // Fetch all projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select('*');

      if (projectsError) throw projectsError;

      // Calculate current month revenue
      const currentMonthProjects = projects?.filter(project => {
        const projectDate = new Date(project.created_at);
        return projectDate.getMonth() === currentDate.getMonth() && 
               projectDate.getFullYear() === currentYear;
      }) || [];

      const totalRevenue = currentMonthProjects.reduce((sum, project) => sum + project.amount, 0);
      const completedProjects = currentMonthProjects.filter(p => p.status === 'completed').length;

      // Check if monthly revenue record exists
      const { data: existingRecord, error: checkError } = await supabase
        .from('monthly_revenue')
        .select('*')
        .eq('month', currentMonth)
        .eq('year', currentYear)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existingRecord) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('monthly_revenue')
          .update({
            total_revenue: totalRevenue,
            total_projects: currentMonthProjects.length,
            completed_projects: completedProjects,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingRecord.id);

        if (updateError) throw updateError;
      } else {
        // Create new record
        const { error: insertError } = await supabase
          .from('monthly_revenue')
          .insert([{
            month: currentMonth,
            year: currentYear,
            total_revenue: totalRevenue,
            total_projects: currentMonthProjects.length,
            completed_projects: completedProjects
          }]);

        if (insertError) throw insertError;
      }

      console.log('Monthly revenue updated successfully');
    } catch (error) {
      console.error('Error updating monthly revenue:', error);
    }
  }

  static async getMonthlyRevenue(month: string, year: number): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('monthly_revenue')
        .select('*')
        .eq('month', month)
        .eq('year', year)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching monthly revenue:', error);
      return null;
    }
  }

  static async getAllMonthlyRevenue(): Promise<any[]> {
    try {
      const { data, error } = await supabase
        .from('monthly_revenue')
        .select('*')
        .order('year', { ascending: true })
        .order('month', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching all monthly revenue:', error);
      return [];
    }
  }
}
