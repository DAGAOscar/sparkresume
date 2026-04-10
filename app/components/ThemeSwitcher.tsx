'use client'

import { useTheme } from '@/app/contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="flex items-center gap-2 h-10" />
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
      <button
        onClick={() => setTheme('light')}
        title="Light Mode"
        className={`p-2 rounded-md transition-colors ${
          theme === 'light'
            ? 'bg-white text-amber-500 shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        className={`p-2 rounded-md transition-colors ${
          theme === 'dark'
            ? 'bg-slate-700 text-blue-400 shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  )
}
