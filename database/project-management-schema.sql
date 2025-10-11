-- Project Management & Deals Database Schema
-- Supabase SQL for advanced project management dashboard

-- 1. Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    deposit NUMERIC(10,2) NOT NULL DEFAULT 0,
    remaining_balance NUMERIC(10,2) NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'on_hold')),
    notes TEXT,
    files JSONB DEFAULT '[]'::jsonb, -- Store file URLs/metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Milestones table
CREATE TABLE IF NOT EXISTS milestones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Monthly revenue tracking
CREATE TABLE IF NOT EXISTS monthly_revenue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL, -- Format: "January", "February", etc.
    year INTEGER NOT NULL,
    total_revenue NUMERIC(10,2) DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    completed_projects INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(month, year)
);

-- 4. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('milestone', 'payment', 'deadline', 'reminder')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    read BOOLEAN DEFAULT FALSE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Project payments tracking
CREATE TABLE IF NOT EXISTS project_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_type TEXT DEFAULT 'deposit' CHECK (payment_type IN ('deposit', 'milestone', 'final', 'refund')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date);
CREATE INDEX IF NOT EXISTS idx_projects_client_name ON projects(client_name);
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_due_date ON milestones(due_date);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_payments_project_id ON project_payments(project_id);

-- Functions for automatic calculations
CREATE OR REPLACE FUNCTION update_project_remaining_balance()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate remaining balance when project amount or deposit changes
    NEW.remaining_balance = NEW.amount - NEW.deposit;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate remaining balance
CREATE TRIGGER trigger_update_remaining_balance
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_project_remaining_balance();

-- Function to create milestone reminders
CREATE OR REPLACE FUNCTION create_milestone_reminders()
RETURNS TRIGGER AS $$
BEGIN
    -- Create notification 2 days before milestone due date
    INSERT INTO notifications (project_id, milestone_id, message, type, priority, scheduled_for)
    VALUES (
        NEW.project_id,
        NEW.id,
        'Milestone "' || NEW.name || '" is due in 2 days',
        'milestone',
        'medium',
        NEW.due_date - INTERVAL '2 days'
    );
    
    -- Create urgent notification on due date
    INSERT INTO notifications (project_id, milestone_id, message, type, priority, scheduled_for)
    VALUES (
        NEW.project_id,
        NEW.id,
        'Milestone "' || NEW.name || '" is due today!',
        'deadline',
        'high',
        NEW.due_date
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for milestone reminders
CREATE TRIGGER trigger_milestone_reminders
    AFTER INSERT ON milestones
    FOR EACH ROW
    EXECUTE FUNCTION create_milestone_reminders();

-- Function to update monthly revenue
CREATE OR REPLACE FUNCTION update_monthly_revenue()
RETURNS TRIGGER AS $$
DECLARE
    project_month TEXT;
    project_year INTEGER;
BEGIN
    -- Extract month and year from project start date
    project_month := to_char(NEW.start_date, 'Month');
    project_year := extract(year from NEW.start_date);
    
    -- Update or insert monthly revenue record
    INSERT INTO monthly_revenue (month, year, total_revenue, total_projects)
    VALUES (project_month, project_year, NEW.amount, 1)
    ON CONFLICT (month, year)
    DO UPDATE SET
        total_revenue = monthly_revenue.total_revenue + NEW.amount,
        total_projects = monthly_revenue.total_projects + 1,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update monthly revenue
CREATE TRIGGER trigger_update_monthly_revenue
    AFTER INSERT ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_monthly_revenue();

-- Row Level Security (RLS) policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_payments ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage their own data
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view all milestones" ON milestones FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert milestones" ON milestones FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update milestones" ON milestones FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete milestones" ON milestones FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view revenue data" ON monthly_revenue FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can manage revenue data" ON monthly_revenue FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view notifications" ON notifications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update notifications" ON notifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete notifications" ON notifications FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage payments" ON project_payments FOR ALL USING (auth.role() = 'authenticated');

-- Sample data for testing (amounts in South African Rand)
INSERT INTO projects (client_name, project_name, amount, deposit, start_date, status, notes) VALUES
('Acme Corp', 'Website Redesign', 250000.00, 85000.00, '2024-01-15', 'in_progress', 'Complete website overhaul with modern design'),
('TechStart Inc', 'E-commerce Platform', 420000.00, 170000.00, '2024-01-20', 'pending', 'Building custom e-commerce solution'),
('Local Restaurant', 'Menu Website', 85000.00, 42500.00, '2024-01-10', 'completed', 'Simple menu website with online ordering'),
('Consulting Firm', 'Brand Identity', 135000.00, 68000.00, '2024-01-25', 'in_progress', 'Logo design and brand guidelines');

-- Sample milestones
INSERT INTO milestones (project_id, name, due_date, completed) VALUES
((SELECT id FROM projects WHERE project_name = 'Website Redesign'), 'Initial Design Mockups', '2024-02-01', true),
((SELECT id FROM projects WHERE project_name = 'Website Redesign'), 'Development Phase', '2024-02-15', false),
((SELECT id FROM projects WHERE project_name = 'Website Redesign'), 'Testing & Launch', '2024-03-01', false),
((SELECT id FROM projects WHERE project_name = 'E-commerce Platform'), 'Database Setup', '2024-02-05', false),
((SELECT id FROM projects WHERE project_name = 'E-commerce Platform'), 'Payment Integration', '2024-02-20', false);

-- Sample monthly revenue data (amounts in South African Rand)
INSERT INTO monthly_revenue (month, year, total_revenue, total_projects, completed_projects) VALUES
('January', 2024, 890000.00, 4, 1),
('December', 2023, 760000.00, 3, 2),
('November', 2023, 640000.00, 5, 3);


-- 1. Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    client_name TEXT NOT NULL,
    project_name TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL DEFAULT 0,
    deposit NUMERIC(10,2) NOT NULL DEFAULT 0,
    remaining_balance NUMERIC(10,2) NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'on_hold')),
    notes TEXT,
    files JSONB DEFAULT '[]'::jsonb, -- Store file URLs/metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Milestones table
CREATE TABLE IF NOT EXISTS milestones (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    due_date DATE NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Monthly revenue tracking
CREATE TABLE IF NOT EXISTS monthly_revenue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    month TEXT NOT NULL, -- Format: "January", "February", etc.
    year INTEGER NOT NULL,
    total_revenue NUMERIC(10,2) DEFAULT 0,
    total_projects INTEGER DEFAULT 0,
    completed_projects INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(month, year)
);

-- 4. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES milestones(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('milestone', 'payment', 'deadline', 'reminder')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    read BOOLEAN DEFAULT FALSE,
    scheduled_for TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Project payments tracking
CREATE TABLE IF NOT EXISTS project_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_type TEXT DEFAULT 'deposit' CHECK (payment_type IN ('deposit', 'milestone', 'final', 'refund')),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_start_date ON projects(start_date);
CREATE INDEX IF NOT EXISTS idx_projects_client_name ON projects(client_name);
CREATE INDEX IF NOT EXISTS idx_milestones_project_id ON milestones(project_id);
CREATE INDEX IF NOT EXISTS idx_milestones_due_date ON milestones(due_date);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);
CREATE INDEX IF NOT EXISTS idx_payments_project_id ON project_payments(project_id);

-- Functions for automatic calculations
CREATE OR REPLACE FUNCTION update_project_remaining_balance()
RETURNS TRIGGER AS $$
BEGIN
    -- Calculate remaining balance when project amount or deposit changes
    NEW.remaining_balance = NEW.amount - NEW.deposit;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate remaining balance
CREATE TRIGGER trigger_update_remaining_balance
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_project_remaining_balance();

-- Function to create milestone reminders
CREATE OR REPLACE FUNCTION create_milestone_reminders()
RETURNS TRIGGER AS $$
BEGIN
    -- Create notification 2 days before milestone due date
    INSERT INTO notifications (project_id, milestone_id, message, type, priority, scheduled_for)
    VALUES (
        NEW.project_id,
        NEW.id,
        'Milestone "' || NEW.name || '" is due in 2 days',
        'milestone',
        'medium',
        NEW.due_date - INTERVAL '2 days'
    );
    
    -- Create urgent notification on due date
    INSERT INTO notifications (project_id, milestone_id, message, type, priority, scheduled_for)
    VALUES (
        NEW.project_id,
        NEW.id,
        'Milestone "' || NEW.name || '" is due today!',
        'deadline',
        'high',
        NEW.due_date
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for milestone reminders
CREATE TRIGGER trigger_milestone_reminders
    AFTER INSERT ON milestones
    FOR EACH ROW
    EXECUTE FUNCTION create_milestone_reminders();

-- Function to update monthly revenue
CREATE OR REPLACE FUNCTION update_monthly_revenue()
RETURNS TRIGGER AS $$
DECLARE
    project_month TEXT;
    project_year INTEGER;
BEGIN
    -- Extract month and year from project start date
    project_month := to_char(NEW.start_date, 'Month');
    project_year := extract(year from NEW.start_date);
    
    -- Update or insert monthly revenue record
    INSERT INTO monthly_revenue (month, year, total_revenue, total_projects)
    VALUES (project_month, project_year, NEW.amount, 1)
    ON CONFLICT (month, year)
    DO UPDATE SET
        total_revenue = monthly_revenue.total_revenue + NEW.amount,
        total_projects = monthly_revenue.total_projects + 1,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update monthly revenue
CREATE TRIGGER trigger_update_monthly_revenue
    AFTER INSERT ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_monthly_revenue();

-- Row Level Security (RLS) policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE monthly_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_payments ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage their own data
CREATE POLICY "Users can view all projects" ON projects FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view all milestones" ON milestones FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can insert milestones" ON milestones FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update milestones" ON milestones FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete milestones" ON milestones FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view revenue data" ON monthly_revenue FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can manage revenue data" ON monthly_revenue FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Users can view notifications" ON notifications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update notifications" ON notifications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Users can delete notifications" ON notifications FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can manage payments" ON project_payments FOR ALL USING (auth.role() = 'authenticated');

-- Sample data for testing (amounts in South African Rand)
INSERT INTO projects (client_name, project_name, amount, deposit, start_date, status, notes) VALUES
('Acme Corp', 'Website Redesign', 250000.00, 85000.00, '2024-01-15', 'in_progress', 'Complete website overhaul with modern design'),
('TechStart Inc', 'E-commerce Platform', 420000.00, 170000.00, '2024-01-20', 'pending', 'Building custom e-commerce solution'),
('Local Restaurant', 'Menu Website', 85000.00, 42500.00, '2024-01-10', 'completed', 'Simple menu website with online ordering'),
('Consulting Firm', 'Brand Identity', 135000.00, 68000.00, '2024-01-25', 'in_progress', 'Logo design and brand guidelines');

-- Sample milestones
INSERT INTO milestones (project_id, name, due_date, completed) VALUES
((SELECT id FROM projects WHERE project_name = 'Website Redesign'), 'Initial Design Mockups', '2024-02-01', true),
((SELECT id FROM projects WHERE project_name = 'Website Redesign'), 'Development Phase', '2024-02-15', false),
((SELECT id FROM projects WHERE project_name = 'Website Redesign'), 'Testing & Launch', '2024-03-01', false),
((SELECT id FROM projects WHERE project_name = 'E-commerce Platform'), 'Database Setup', '2024-02-05', false),
((SELECT id FROM projects WHERE project_name = 'E-commerce Platform'), 'Payment Integration', '2024-02-20', false);

-- Sample monthly revenue data (amounts in South African Rand)
INSERT INTO monthly_revenue (month, year, total_revenue, total_projects, completed_projects) VALUES
('January', 2024, 890000.00, 4, 1),
('December', 2023, 760000.00, 3, 2),
('November', 2023, 640000.00, 5, 3);