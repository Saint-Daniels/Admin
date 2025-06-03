import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Create a warning message for development
if (process.env.NODE_ENV === 'development' && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(`
    ⚠️ Missing Supabase environment variables!
    
    Please create a .env.local file in your project root with:
    
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    
    You can find these values in your Supabase project settings > API
  `);
}

// Create a dummy client if environment variables are missing
const supabase = createClient(
  supabaseUrl || 'https://dummy-url.supabase.co',
  supabaseAnonKey || 'dummy-key'
);

export { supabase }; 