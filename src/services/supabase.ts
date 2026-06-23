import { createClient } from '@supabase/supabase-js'

const supabaseUrl =
'https://egthxrfdzivihfddzhjp.supabase.co'

const supabaseKey =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndGh4cmZkeml2aWhmZGR6aGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDE3MzQsImV4cCI6MjA5NzcxNzczNH0.-wdlSgg5y--7FGtQd4uaTIU-YA28et2P4eurM-MYUAE'

export const supabase =
createClient(
  supabaseUrl,
  supabaseKey
)