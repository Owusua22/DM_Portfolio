'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(!isLoginPage)

  useEffect(() => {
    if (isLoginPage) return

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login')
      } else {
        setUser(session.user)
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          document.cookie = 'sb-access-token=; path=/; max-age=0'
          document.cookie = 'sb-refresh-token=; path=/; max-age=0'
          router.replace('/admin/login')
        } else {
          const maxAge = session.expires_in ?? 3600
          document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax`
          document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax`
          setUser(session.user)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router, isLoginPage])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    document.cookie = 'sb-access-token=; path=/; max-age=0'
    document.cookie = 'sb-refresh-token=; path=/; max-age=0'
    router.replace('/admin/login')
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Portfolio Admin</span>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-xs text-gray-500">{user.email}</span>
            )}
            <button
              onClick={handleLogout}
              className="text-sm text-gray-500 hover:text-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
