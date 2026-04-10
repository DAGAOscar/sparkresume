'use client'

import { useTheme } from '@/app/contexts/ThemeContext'
import { Moon, Sun, Palette } from 'lucide-react'
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
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme('blue')}
        title="Blue Mode"
        className={`p-2 rounded-lg transition-colors ${
          theme === 'blue'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Palette className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('light')}
        title="Light Mode"
        className={`p-2 rounded-lg transition-colors ${
          theme === 'light'
            ? 'bg-gray-700 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Sun className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        title="Dark Mode"
        className={`p-2 rounded-lg transition-colors ${
          theme === 'dark'
            ? 'bg-gray-900 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <Moon className="w-5 h-5" />
      </button>
    </div>
  )
}
