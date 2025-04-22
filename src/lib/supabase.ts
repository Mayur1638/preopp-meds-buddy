
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://iytzebfkblspwfplyqrl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5dHplYmZrYmxzcHdmcGx5cXJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMjA3ODcsImV4cCI6MjA2MDg5Njc4N30._r0-rohttXMx1KUnCTmGZQctyxV6ZtPk2P2PFdOA-6s';

export const supabase = createClient(supabaseUrl, supabaseKey);
