import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with actual Supabase project credentials
// Get these from: https://supabase.com/dashboard/project/_/settings/api
const supabaseUrl = 'https://pjerwcppfugqmoykcetv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBqZXJ3Y3BwZnVncW1veWtjZXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NzYyMzgsImV4cCI6MjA3MDI1MjIzOH0.wBiN_cUTAZHIiyb-utuyyaS61bG-8NgPChXsi_C7xlU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
