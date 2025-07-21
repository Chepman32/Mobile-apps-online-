import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
