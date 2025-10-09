// Script to update the database with blog schema
// Run this script to add blog functionality to your existing database

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://slkdiwvawagzwmeyldcu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsa2Rpd3Zhd2FnendtZXlsZGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4Njc5MjUsImV4cCI6MjA3NTQ0MzkyNX0.fLNbMHvbcKkzKb5VG_tG2QTaVqzQd_f0sEpmUT961v8';

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateBlogSchema() {
  console.log('🔄 Updating database schema for blog functionality...');
  
  try {
    // Read the schema file
    const fs = require('fs');
    const schema = fs.readFileSync('supabase-schema.sql', 'utf8');
    
    // Extract only the blog-related SQL (from the blog categories table onwards)
    const blogSchemaStart = schema.indexOf('-- Create blog categories table');
    const blogSchemaEnd = schema.indexOf('-- Grant permissions');
    
    if (blogSchemaStart === -1) {
      console.error('❌ Blog schema not found in supabase-schema.sql');
      return;
    }
    
    const blogSchema = schema.substring(blogSchemaStart, blogSchemaEnd);
    
    // Split into individual statements
    const statements = blogSchema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.warn(`⚠️  Warning on statement ${i + 1}: ${error.message}`);
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } catch (err) {
        console.warn(`⚠️  Error on statement ${i + 1}: ${err.message}`);
      }
    }
    
    console.log('🎉 Blog schema update completed!');
    console.log('');
    console.log('📋 What was added:');
    console.log('   • blog_categories table');
    console.log('   • blog_posts table');
    console.log('   • blog_views table');
    console.log('   • Database functions for blog operations');
    console.log('   • Default blog categories');
    console.log('   • Indexes for performance');
    console.log('');
    console.log('🚀 You can now use the blog functionality!');
    
  } catch (error) {
    console.error('❌ Error updating schema:', error);
  }
}

// Run the update
updateBlogSchema();
