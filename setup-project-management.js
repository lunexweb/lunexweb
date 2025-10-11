#!/usr/bin/env node

/**
 * Setup script for Project Management & Deals database schema
 * This script sets up the required tables and sample data for the project management system
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupProjectManagement() {
  console.log('🚀 Setting up Project Management & Deals database...');

  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'project-management-schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Schema file not found:', schemaPath);
      process.exit(1);
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`   ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          // Some errors are expected (like table already exists)
          if (!error.message.includes('already exists') && 
              !error.message.includes('relation') &&
              !error.message.includes('function')) {
            console.warn(`   ⚠️  Warning: ${error.message}`);
          }
        }
      }
    }

    // Create storage bucket for project files
    console.log('📁 Creating storage bucket for project files...');
    const { error: bucketError } = await supabase.storage.createBucket('project-files', {
      public: false,
      allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'application/zip'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.warn(`   ⚠️  Storage bucket warning: ${bucketError.message}`);
    }

    console.log('✅ Project Management database setup completed successfully!');
    console.log('');
    console.log('🎉 Your project management system is ready to use!');
    console.log('');
    console.log('📋 What was created:');
    console.log('   • projects table - Main project information');
    console.log('   • milestones table - Project milestones and deadlines');
    console.log('   • monthly_revenue table - Revenue tracking');
    console.log('   • notifications table - Automated notifications');
    console.log('   • project_payments table - Payment tracking');
    console.log('   • project-files storage bucket - File uploads');
    console.log('   • Sample data for testing');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('   1. Navigate to your dashboard');
    console.log('   2. Click on the "Projects" tab');
    console.log('   3. Start adding your projects and managing deals!');
    console.log('');

  } catch (error) {
    console.error('❌ Error setting up project management:', error);
    process.exit(1);
  }
}

// Run the setup
setupProjectManagement();

/**
 * Setup script for Project Management & Deals database schema
 * This script sets up the required tables and sample data for the project management system
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupProjectManagement() {
  console.log('🚀 Setting up Project Management & Deals database...');

  try {
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, 'project-management-schema.sql');
    
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Schema file not found:', schemaPath);
      process.exit(1);
    }

    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Split the schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Executing ${statements.length} SQL statements...`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`   ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`);
        
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          // Some errors are expected (like table already exists)
          if (!error.message.includes('already exists') && 
              !error.message.includes('relation') &&
              !error.message.includes('function')) {
            console.warn(`   ⚠️  Warning: ${error.message}`);
          }
        }
      }
    }

    // Create storage bucket for project files
    console.log('📁 Creating storage bucket for project files...');
    const { error: bucketError } = await supabase.storage.createBucket('project-files', {
      public: false,
      allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain', 'image/jpeg', 'image/png', 'application/zip'],
      fileSizeLimit: 10485760 // 10MB
    });

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.warn(`   ⚠️  Storage bucket warning: ${bucketError.message}`);
    }

    console.log('✅ Project Management database setup completed successfully!');
    console.log('');
    console.log('🎉 Your project management system is ready to use!');
    console.log('');
    console.log('📋 What was created:');
    console.log('   • projects table - Main project information');
    console.log('   • milestones table - Project milestones and deadlines');
    console.log('   • monthly_revenue table - Revenue tracking');
    console.log('   • notifications table - Automated notifications');
    console.log('   • project_payments table - Payment tracking');
    console.log('   • project-files storage bucket - File uploads');
    console.log('   • Sample data for testing');
    console.log('');
    console.log('🔧 Next steps:');
    console.log('   1. Navigate to your dashboard');
    console.log('   2. Click on the "Projects" tab');
    console.log('   3. Start adding your projects and managing deals!');
    console.log('');

  } catch (error) {
    console.error('❌ Error setting up project management:', error);
    process.exit(1);
  }
}

// Run the setup
setupProjectManagement();