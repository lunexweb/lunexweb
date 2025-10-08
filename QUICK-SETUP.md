# 🚀 QUICK DATABASE SETUP (2 minutes)

## The Issue
The database tables don't exist yet. I need you to create them manually in Supabase.

## ✅ SOLUTION - Follow These Exact Steps:

### Step 1: Open Supabase SQL Editor
1. **Go to:** https://supabase.com/dashboard
2. **Click your project:** `slkdiwvawagzwmeyldcu`
3. **Click "SQL Editor"** in the left sidebar
4. **Click "New Query"**

### Step 2: Copy This SQL Code
Copy and paste this ENTIRE code block into the SQL Editor:

```sql
-- Create essential tables for CEO Dashboard
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT DEFAULT 'sales',
    phone TEXT,
    avatar_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    service_type TEXT NOT NULL,
    budget_range TEXT,
    timeline TEXT,
    location TEXT,
    website_url TEXT,
    message TEXT,
    lead_score INTEGER DEFAULT 0,
    status TEXT DEFAULT 'new',
    source TEXT NOT NULL,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    assigned_to UUID REFERENCES users(id),
    priority TEXT DEFAULT 'medium',
    estimated_value DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_contacted_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id),
    type TEXT NOT NULL,
    direction TEXT,
    subject TEXT,
    content TEXT,
    duration INTEGER,
    status TEXT DEFAULT 'completed',
    outcome TEXT,
    follow_up_required BOOLEAN DEFAULT false,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS email_campaigns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    subject TEXT NOT NULL,
    content TEXT NOT NULL,
    sent_to_lead_id UUID REFERENCES leads(id),
    sent_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    replied_at TIMESTAMP WITH TIME ZONE,
    bounced BOOLEAN DEFAULT false,
    unsubscribed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id),
    name TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'planning',
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10,2),
    paid_amount DECIMAL(10,2) DEFAULT 0,
    assigned_to UUID REFERENCES users(id),
    progress INTEGER DEFAULT 0,
    milestones JSONB,
    deliverables JSONB,
    client_feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id),
    event_type TEXT NOT NULL,
    event_name TEXT NOT NULL,
    page_url TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    session_id TEXT,
    properties JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO users (email, name, role) VALUES ('admin@lunexweb.com', 'Admin User', 'admin') ON CONFLICT (email) DO NOTHING;

-- Insert default settings
INSERT INTO settings (key, value, description) VALUES 
('dashboard_config', '{"theme": "light", "currency": "ZAR", "timezone": "Africa/Johannesburg"}', 'Dashboard configuration'),
('lead_scoring', '{"hot_threshold": 70, "warm_threshold": 40, "cold_threshold": 0}', 'Lead scoring thresholds') ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (allow all for now)
CREATE POLICY "Allow all for users" ON users FOR ALL USING (true);
CREATE POLICY "Allow all for leads" ON leads FOR ALL USING (true);
CREATE POLICY "Allow all for communications" ON communications FOR ALL USING (true);
CREATE POLICY "Allow all for email_campaigns" ON email_campaigns FOR ALL USING (true);
CREATE POLICY "Allow all for projects" ON projects FOR ALL USING (true);
CREATE POLICY "Allow all for analytics_events" ON analytics_events FOR ALL USING (true);
CREATE POLICY "Allow all for settings" ON settings FOR ALL USING (true);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
```

### Step 3: Execute the SQL
1. **Click "Run"** button in the SQL Editor
2. **Wait for completion** (should take 10-30 seconds)
3. **You should see "Success" message**

### Step 4: Verify Tables Created
1. **Go to "Table Editor"** in the left sidebar
2. **You should now see 7 tables:**
   - ✅ `users`
   - ✅ `leads`
   - ✅ `communications`
   - ✅ `email_campaigns`
   - ✅ `projects`
   - ✅ `analytics_events`
   - ✅ `settings`

### Step 5: Test Your Dashboard
1. **Run your website:** `npm run dev`
2. **Visit:** `http://localhost:5173/dashboard`
3. **Submit a test form** on your website
4. **Watch the dashboard update** in real-time!

## 🎉 That's It!

Once you complete these steps, your CEO Dashboard will be fully functional with:
- ✅ Real-time lead tracking
- ✅ Automatic form submissions to database
- ✅ Live dashboard metrics
- ✅ Lead queue management
- ✅ Revenue tracking
- ✅ Performance analytics

**The whole process takes less than 2 minutes!** 🚀
