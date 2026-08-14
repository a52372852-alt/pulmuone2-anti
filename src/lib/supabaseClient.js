import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wfxhvvyailsparnvvncz.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_j_FJERljgeJfjITI7rZ0fw_0aK4v6eC';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
