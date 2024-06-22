import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('환경 변수 파일이 없거나 필요한 URL 및 Key가 존재하지 않음.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
