import type { PrismaClient } from '@prisma/client';
import type { SupabaseClient } from '@supabase/supabase-js';

declare global {
  var prisma: PrismaClient;
  var supabase: SupabaseClient
}
