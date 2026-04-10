'use client'

import { useAuth } from '@/app/hooks/useAuth'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface PremiumButtonProps {
  text?: string
  className?: string
}

export default function PremiumButton({ 
  text = 'Upgrade Now', 
  className = 'w-full py-3 bg-black text-white font-bold rounded-lg hover:opacity-90' 
}: PremiumButtonProps) {
  const { isLoggedIn, loading } = useAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // While loading or not mounted, show the button
  if (!mounted || loading) {
    return (
      <Link 
        href="/signup" 
        className={className}
      >
        {text}
      </Link>
    )
  }

  // If logged in, go to upgrade page
  if (isLoggedIn) {
    return (
      <Link 
        href="/upgrade" 
        className={className}
      >
        {text}
      </Link>
    )
  }

  // If not logged in, go to signup page
  return (
    <Link 
      href="/signup" 
      className={className}
    >
      {text}
    </Link>
  )
}
