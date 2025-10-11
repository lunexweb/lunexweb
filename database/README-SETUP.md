# Database Setup Instructions

## Quick Fix for 404 Errors

Your application is getting 404 errors because the required database tables don't exist yet. Follow these steps to fix it:

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `slkdiwvawagzwmeyldcu`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the Setup Script**
   - Copy the entire contents of `database/setup-missing-tables.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute

4. **Verify Success**
   - You should see: "All missing tables created successfully!"
   - Check the "Table Editor" to see your new tables

### Option 2: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Link to your project
supabase link --project-ref slkdiwvawagzwmeyldcu

# Run the SQL file
supabase db push --file database/setup-missing-tables.sql
```

### What This Script Creates

The script creates all the missing tables your application needs:

- ✅ `page_views` - For tracking page visits
- ✅ `leads` - For contact form submissions
- ✅ `analytics_events` - For general analytics
- ✅ `lead_analytics` - For lead tracking
- ✅ `contact_tracking` - For contact method tracking
- ✅ `service_analytics` - For service tracking
- ✅ `user_journey` - For user behavior tracking
- ✅ `portfolio_analytics` - For portfolio tracking
- ✅ `blog_analytics` - For blog tracking

### After Running the Script

1. **Test Your Application**
   - Your contact forms should now work
   - Analytics tracking should work
   - No more 404 errors

2. **Verify in Supabase Dashboard**
   - Go to "Table Editor"
   - You should see all the new tables listed

3. **Test a Contact Form**
   - Try submitting a contact form
   - Check the `leads` table for new entries

### Troubleshooting

If you still get errors:

1. **Check RLS Policies**
   - Make sure Row Level Security is enabled
   - Verify the policies allow anonymous inserts

2. **Check Environment Variables**
   - Ensure your Vercel environment variables are correct
   - Redeploy your Vercel app after adding env vars

3. **Check Console Logs**
   - Look for specific error messages
   - Check network tab for failed requests

### Next Steps

After fixing the database:

1. **Deploy to Vercel**
   - Push your code to GitHub
   - Vercel will automatically redeploy

2. **Test Everything**
   - Contact forms
   - Analytics tracking
   - Portfolio views
   - Blog functionality

Your application should now work perfectly! 🎉
