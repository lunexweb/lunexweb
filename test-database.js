// Test database connection and create tables
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slkdiwvawagzwmeyldcu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2Rpd3Zhd2FnendtZXlsZGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Njc5MjUsImV4cCI6MjA3NTQ0MzkyNX0.fLNbMHvbcKkzKb5VG_tG2QTaVqzQd_f0sEpmUT961v8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test connection by trying to insert a test lead
    const testLead = {
      name: 'Test Lead',
      email: 'test@example.com',
      service_type: 'testing',
      source: 'automated_test'
    };
    
    console.log('📝 Inserting test lead...');
    const { data, error } = await supabase
      .from('leads')
      .insert([testLead])
      .select();
    
    if (error) {
      console.log('❌ Error:', error.message);
      
      if (error.message.includes('relation "leads" does not exist')) {
        console.log('🚨 The "leads" table does not exist yet!');
        console.log('📋 You need to run the SQL schema in Supabase SQL Editor first.');
        console.log('');
        console.log('🔧 Steps to fix:');
        console.log('1. Go to https://supabase.com/dashboard');
        console.log('2. Select your project: slkdiwvawagzwmeyldcu');
        console.log('3. Click "SQL Editor" in the left sidebar');
        console.log('4. Click "New Query"');
        console.log('5. Copy the content from "supabase-schema.sql" file');
        console.log('6. Paste and click "Run"');
        console.log('7. Come back and run this script again');
      }
    } else {
      console.log('✅ Database connection successful!');
      console.log('✅ Test lead created:', data[0].id);
      
      // Clean up test lead
      await supabase
        .from('leads')
        .delete()
        .eq('email', 'test@example.com');
      
      console.log('🧹 Test lead cleaned up');
      console.log('🎉 Your database is ready!');
      console.log('📊 Visit /dashboard to see your CEO Dashboard');
    }
    
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

testDatabase();
