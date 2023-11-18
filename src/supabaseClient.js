import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwxkxociiffwkjaneqwe.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3eGt4b2NpaWZmd2tqYW5lcXdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzMTQ0NTMsImV4cCI6MjAxNTg5MDQ1M30.AhwSoQQySXwHoRNUtiJpG0cKn1rBGp6Q4OHGCDGpjwc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);