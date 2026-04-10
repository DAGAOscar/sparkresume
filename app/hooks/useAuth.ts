'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/app/lib/supabase'
import type { User } from '@supabase/supabase-js'

export function useAuth() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session: authSession } } = await supabase.auth.getSession()
        setIsLoggedIn(!!authSession)
        setUser(authSession?.user || null)
        setSession(authSession)
      } catch (error) {
        console.error('Auth check error:', error)
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, authSession) => {
      setIsLoggedIn(!!authSession)
      setUser(authSession?.user || null)
      setSession(authSession)
    })

    return () => subscription?.unsubscribe()
  }, [])

  const getAccessToken = async () => {
    const { data: { session: authSession } } = await supabase.auth.getSession()
    return authSession?.access_token || null
  }

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return { isLoggedIn, user, loading, logout, getAccessToken, session }
}
