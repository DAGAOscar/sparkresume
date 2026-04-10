'use client'

import { useEffect } from 'react'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // On mount, set the theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const preferssDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    const initialTheme = savedTheme || (preferssDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  return <>{children}</>
}
