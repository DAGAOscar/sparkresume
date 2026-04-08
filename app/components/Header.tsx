'use client'
import { Menu, X, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/app/lib/supabase'

export default function Header() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(true)

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setIsLoggedIn(!!session)
        if (session?.user?.email) {
          setUserEmail(session.user.email)
        }
      } catch (error) {
        console.error('Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsLoggedIn(!!session)
      if (session?.user?.email) {
        setUserEmail(session.user.email)
      }
    })

    return () => subscription?.unsubscribe()
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      setIsLoggedIn(false)
      setUserEmail('')
      setIsOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-sm sm:text-lg md:text-xl font-bold px-1 sm:px-2">
          ✨ <span className="hidden sm:inline">Spark</span><span className="text-primary">Resume</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex gap-2 md:gap-4">
        <Link href="/templates" className="btn btn-ghost btn-xs md:btn-sm">
          Templates
        </Link>
        {isLoggedIn ? (
          <>
            <Link href="/builder" className="btn btn-primary btn-xs md:btn-sm">
              Build CV
            </Link>
            <Link href="/dashboard" className="btn btn-ghost btn-xs md:btn-sm">
              Dashboard
            </Link>
            <Link href="/settings" className="btn btn-ghost btn-xs md:btn-sm">
              Settings
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-xs md:btn-sm">
              <LogOut className="w-3 md:w-4" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost btn-xs md:btn-sm">
              Login
            </Link>
            <Link href="/signup" className="btn btn-primary btn-xs md:btn-sm">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden">
        <button
          onClick={toggleMenu}
          className="btn btn-ghost btn-circle btn-sm"
        >
          {isOpen ? <X className="w-5" /> : <Menu className="w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-base-100 shadow-md sm:hidden">
          <div className="flex flex-col gap-2 p-3">
            <Link href="/templates" className="btn btn-ghost btn-sm w-full">
              Templates
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/builder" className="btn btn-primary btn-sm w-full">
                  Build CV
                </Link>
                <Link href="/dashboard" className="btn btn-ghost btn-sm w-full">
                  Dashboard
                </Link>
                <Link href="/settings" className="btn btn-ghost btn-sm w-full">
                  Settings
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm w-full">
                  <LogOut className="w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="btn btn-ghost btn-sm w-full">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm w-full">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
