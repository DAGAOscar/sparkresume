'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'sunset' | 'abyss'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('sunset')
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme('sunset')
    }
    setMounted(true)
  }, [])

  // Apply theme to document using data-theme attribute
  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement
    html.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    applyTheme(newTheme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    // Fallback for SSR - should not happen if ThemeProvider is used correctly
    return {
      theme: 'sunset' as const,
      setTheme: () => {},
    }
  }
  return context
}
