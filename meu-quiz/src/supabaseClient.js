import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://sfgpfcirjqwtevtcoowz.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_hmRvBtG7F3wT89mfoFXR1Q_0xnu2J_W';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);