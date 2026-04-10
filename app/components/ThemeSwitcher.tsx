'use client'

import { useTheme } from '@/app/contexts/ThemeContext'
import { Sunset, Building2 } from 'lucide-react'
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
    <div className="flex items-center gap-2 bg-base-200 rounded-lg p-1">
      <button
        onClick={() => setTheme('sunset')}
        title="Sunset Theme"
        className={`p-2 rounded-md transition-colors ${
          theme === 'sunset'
            ? 'bg-base-100 text-primary shadow-md'
            : 'text-base-content/60 hover:text-base-content'
        }`}
      >
        <Sunset className="w-5 h-5" />
      </button>
      <button
        onClick={() => setTheme('abyss')}
        title="Abyss Theme"
        className={`p-2 rounded-md transition-colors ${
          theme === 'abyss'
            ? 'bg-base-100 text-primary shadow-md'
            : 'text-base-content/60 hover:text-base-content'
        }`}
      >
        <Building2 className="w-5 h-5" />
      </button>
    </div>
  )
}
