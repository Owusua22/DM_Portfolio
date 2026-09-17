'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function isRelativePath(path: string | null) {
  return typeof path === 'string' && path.startsWith('/') && !path.startsWith('//')
}

function LoginFormInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawRedirect = searchParams.get('redirect')
  const redirectTo: string = isRelativePath(rawRedirect) ? rawRedirect! : '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)

  useEffect(() => {
    let mounted = true

    const setCookiesFromSession = (session: any) => {
      if (!session) return
      const maxAge = session.expires_in ?? 3600
      document.cookie = `sb-access-token=${session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax`
      document.cookie = `sb-refresh-token=${session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax`
    }

    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error || !session) {
          setCheckingSession(false)
          return
        }
        setCookiesFromSession(session)
        if (mounted && window.location.pathname !== redirectTo) {
          router.replace(redirectTo)
        }
      } catch {
        setCheckingSession(false)
      }
    }

    // Listen for auth state changes (e.g. already logged in another tab)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setCookiesFromSession(session)
      }
      if (mounted && session && window.location.pathname !== redirectTo) {
        router.replace(redirectTo)
      }
    })

    checkSession()

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [router, redirectTo])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (authError) {
        setError(
          authError.message.includes('Invalid login')
            ? 'Invalid email or password.'
            : authError.message
        )
        return
      }

      if (data.session) {
        const maxAge = data.session.expires_in ?? 3600
        document.cookie = `sb-access-token=${data.session.access_token}; path=/; max-age=${maxAge}; SameSite=Lax`
        document.cookie = `sb-refresh-token=${data.session.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax`
      }

      router.replace(redirectTo)
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Checking session…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="mb-6 text-center">
            <h1 className="text-xl font-bold text-gray-900">Portfolio Admin</h1>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to manage your portfolio
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-500">Loading…</p>
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  )
}

export default LoginForm