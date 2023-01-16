import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

// export const supabase = createClient(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
export const supabase = createClient("https://ypavusrgtlpaduqpswbf.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlwYXZ1c3JndGxwYWR1cXBzd2JmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM3MzQzNDUsImV4cCI6MTk4OTMxMDM0NX0.vkcQf-jZNLd6DJk8UEciZOF8SCaA6kaKcOgSP06Z8c8")
