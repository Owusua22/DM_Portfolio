// lib/supabase.ts — DEPRECATED in static build
// This file is kept to avoid broken imports but no longer talks to any backend.
// Portfolio data now comes from @/lib/portfolioMock (100% static, no env vars).
// If you need to re-enable live data, restore the original createClient logic.

export const supabase: any = {
  from: () => ({
    select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
    insert: () => Promise.resolve({ error: null }),
    update: () => ({ eq: () => Promise.resolve({ error: null }) }),
    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
  }),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: { path: '' }, error: { message: 'Static build — uploads disabled' } }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
      remove: () => Promise.resolve({ error: null }),
    }),
  },
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: { session: null }, error: { message: 'Auth disabled in static build' } }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
};
