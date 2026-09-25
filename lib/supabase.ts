import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'missing-anon-key';

/** Browser client (admin sessions). */
export const supabase = createClient(url, key);
/** Read-only client for server rendering; never persists a session. */
export const publicClient = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});