'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'blue' | 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('blue')
  const [mounted, setMounted] = useState(false)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme('blue')
    }
    setMounted(true)
  }, [])

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement
    
    // Remove all theme classes
    html.classList.remove('theme-blue', 'theme-light', 'theme-dark')
    
    // Add new theme class
    html.classList.add(`theme-${newTheme}`)
    
    // Save to localStorage
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
  if (undefined === context) {
    // Return a default value during SSR
    return {
      theme: 'blue' as const,
      setTheme: () => {},
    }
  }
  return context
}
