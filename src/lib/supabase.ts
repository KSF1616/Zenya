import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://pppqvqqyfassuqrgesdm.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImM0YTRhMWI0LWE3NTUtNDU1Mi1iYWE5LTYzZjRmOWFhMzA2ZSJ9.eyJwcm9qZWN0SWQiOiJwcHBxdnFxeWZhc3N1cXJnZXNkbSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzcyMDc3NjEyLCJleHAiOjIwODc0Mzc2MTIsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.S28pfiqPxra7R90AGMxecVhfUOSRrGyVizPzuXz309Q';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };