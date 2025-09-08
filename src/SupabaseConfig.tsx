import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://niihlyofonxtmzgzanpv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5paWhseW9mb254dG16Z3phbnB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjM4NjAsImV4cCI6MjA2MjI5OTg2MH0.GWWHIBQBDpNOvQiWZD_pRDDfOLG2u0DTV7JDcXlKndc'
);
