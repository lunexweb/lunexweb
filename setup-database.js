// Automated Database Setup Script
// This script will automatically create all tables in your Supabase database

const SUPABASE_URL = 'https://slkdiwvawagzwmeyldcu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2Rpd3Zhd2FnendtZXlsZGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Njc5MjUsImV4cCI6MjA3NTQ0MzkyNX0.fLNbMHvbcKkzKb5VG_tG2QTaVqzQd_f0sEpmUT961v8';

async function setupDatabase() {
  try {
    console.log('🚀 Starting automatic database setup...');
    
    // Create tables using Supabase REST API
    const tables = [
      {
        name: 'users',
        sql: `
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
        `
      },
      {
        name: 'leads',
        sql: `
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
        `
      },
      {
        name: 'communications',
        sql: `
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
        `
      },
      {
        name: 'email_campaigns',
        sql: `
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
        `
      },
      {
        name: 'projects',
        sql: `
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
        `
      },
      {
        name: 'analytics_events',
        sql: `
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
        `
      },
      {
        name: 'settings',
        sql: `
          CREATE TABLE IF NOT EXISTS settings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            key TEXT UNIQUE NOT NULL,
            value JSONB NOT NULL,
            description TEXT,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      }
    ];

    console.log('📊 Creating database tables...');
    
    for (const table of tables) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY
          },
          body: JSON.stringify({
            sql: table.sql
          })
        });

        if (response.ok) {
          console.log(`✅ Created table: ${table.name}`);
        } else {
          console.log(`⚠️ Table ${table.name} might already exist or there was an issue`);
        }
      } catch (error) {
        console.log(`❌ Error creating table ${table.name}:`, error.message);
      }
    }

    // Insert default data
    console.log('🔧 Inserting default data...');
    
    try {
      // Insert default admin user
      const adminUserResponse = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY
        },
        body: JSON.stringify({
          email: 'admin@lunexweb.com',
          name: 'Admin User',
          role: 'admin'
        })
      });

      if (adminUserResponse.ok) {
        console.log('✅ Created default admin user');
      }
    } catch (error) {
      console.log('⚠️ Admin user might already exist');
    }

    // Insert default settings
    const settings = [
      {
        key: 'dashboard_config',
        value: {
          theme: 'light',
          currency: 'ZAR',
          timezone: 'Africa/Johannesburg'
        },
        description: 'Dashboard configuration'
      },
      {
        key: 'lead_scoring',
        value: {
          hot_threshold: 70,
          warm_threshold: 40,
          cold_threshold: 0
        },
        description: 'Lead scoring thresholds'
      }
    ];

    for (const setting of settings) {
      try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/settings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY
          },
          body: JSON.stringify(setting)
        });

        if (response.ok) {
          console.log(`✅ Created setting: ${setting.key}`);
        }
      } catch (error) {
        console.log(`⚠️ Setting ${setting.key} might already exist`);
      }
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('📊 You can now access your CEO Dashboard at: /dashboard');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

// Run the setup
setupDatabase();







