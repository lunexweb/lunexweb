#!/usr/bin/env node

/**
 * Debug script to check existing projects in Supabase
 * This will help identify why projects aren't showing in the dashboard
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugProjects() {
  console.log('🔍 Debugging project data in Supabase...\n');

  try {
    // 1. Check if 'projects' table exists and has data
    console.log('1️⃣ Checking "projects" table...');
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(5);

    if (projectsError) {
      console.log('   ❌ Error accessing "projects" table:', projectsError.message);
      console.log('   💡 This table might not exist yet.');
    } else {
      console.log(`   ✅ "projects" table exists with ${projectsData?.length || 0} records`);
      if (projectsData && projectsData.length > 0) {
        console.log('   📋 Sample project:', JSON.stringify(projectsData[0], null, 2));
      }
    }

    // 2. Check for other possible project-related tables
    console.log('\n2️⃣ Checking for other project-related tables...');
    
    const possibleTables = [
      'portfolio_projects',
      'project',
      'client_projects',
      'deals',
      'jobs',
      'contracts'
    ];

    for (const tableName of possibleTables) {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (!error && data) {
        console.log(`   ✅ Found table "${tableName}" with data`);
        console.log(`   📋 Sample record:`, JSON.stringify(data[0], null, 2));
      }
    }

    // 3. Check all tables in the database
    console.log('\n3️⃣ Listing all available tables...');
    const { data: tablesData, error: tablesError } = await supabase
      .rpc('get_all_tables');

    if (tablesError) {
      console.log('   ⚠️  Cannot list all tables (permission issue), but that\'s okay');
    } else {
      console.log('   📋 Available tables:', tablesData);
    }

    // 4. Check if we need to create the projects table
    console.log('\n4️⃣ Recommendations...');
    
    if (projectsError) {
      console.log('   🔧 ACTION NEEDED:');
      console.log('   1. Run: node setup-project-management.js');
      console.log('   2. This will create the required "projects" table');
      console.log('   3. Or manually create the table using the schema in project-management-schema.sql');
    } else if (!projectsData || projectsData.length === 0) {
      console.log('   🔧 ACTION NEEDED:');
      console.log('   1. The "projects" table exists but is empty');
      console.log('   2. Add some test projects using the dashboard');
      console.log('   3. Or run the setup script to add sample data');
    } else {
      console.log('   ✅ Everything looks good!');
      console.log('   💡 If projects still don\'t show, check browser console for errors');
    }

  } catch (error) {
    console.error('❌ Error during debugging:', error);
  }
}

// Run the debug
debugProjects();

/**
 * Debug script to check existing projects in Supabase
 * This will help identify why projects aren't showing in the dashboard
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function debugProjects() {
  console.log('🔍 Debugging project data in Supabase...\n');

  try {
    // 1. Check if 'projects' table exists and has data
    console.log('1️⃣ Checking "projects" table...');
    const { data: projectsData, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .limit(5);

    if (projectsError) {
      console.log('   ❌ Error accessing "projects" table:', projectsError.message);
      console.log('   💡 This table might not exist yet.');
    } else {
      console.log(`   ✅ "projects" table exists with ${projectsData?.length || 0} records`);
      if (projectsData && projectsData.length > 0) {
        console.log('   📋 Sample project:', JSON.stringify(projectsData[0], null, 2));
      }
    }

    // 2. Check for other possible project-related tables
    console.log('\n2️⃣ Checking for other project-related tables...');
    
    const possibleTables = [
      'portfolio_projects',
      'project',
      'client_projects',
      'deals',
      'jobs',
      'contracts'
    ];

    for (const tableName of possibleTables) {
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .limit(1);

      if (!error && data) {
        console.log(`   ✅ Found table "${tableName}" with data`);
        console.log(`   📋 Sample record:`, JSON.stringify(data[0], null, 2));
      }
    }

    // 3. Check all tables in the database
    console.log('\n3️⃣ Listing all available tables...');
    const { data: tablesData, error: tablesError } = await supabase
      .rpc('get_all_tables');

    if (tablesError) {
      console.log('   ⚠️  Cannot list all tables (permission issue), but that\'s okay');
    } else {
      console.log('   📋 Available tables:', tablesData);
    }

    // 4. Check if we need to create the projects table
    console.log('\n4️⃣ Recommendations...');
    
    if (projectsError) {
      console.log('   🔧 ACTION NEEDED:');
      console.log('   1. Run: node setup-project-management.js');
      console.log('   2. This will create the required "projects" table');
      console.log('   3. Or manually create the table using the schema in project-management-schema.sql');
    } else if (!projectsData || projectsData.length === 0) {
      console.log('   🔧 ACTION NEEDED:');
      console.log('   1. The "projects" table exists but is empty');
      console.log('   2. Add some test projects using the dashboard');
      console.log('   3. Or run the setup script to add sample data');
    } else {
      console.log('   ✅ Everything looks good!');
      console.log('   💡 If projects still don\'t show, check browser console for errors');
    }

  } catch (error) {
    console.error('❌ Error during debugging:', error);
  }
}

// Run the debug
debugProjects();