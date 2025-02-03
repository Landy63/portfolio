'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function LightModeGif() {
  const { theme } = useTheme()
  const isMobile = useIsMobile()
  const [showGif, setShowGif] = useState(false)

  useEffect(() => {
    if (theme === 'light') {
      setShowGif(true)
      const timer = setTimeout(() => setShowGif(false), 3000) // Le GIF disparaît après 3 secondes
      return () => clearTimeout(timer)
    }
  }, [theme])

  if (!showGif) return null

  return (
    <div className={`fixed z-50 pointer-events-none ${isMobile ? 'right-0 -bottom-3' : 'right-8 top-20'}`}>
      <div 
        className={`${isMobile ? 'w-28 h-28' : 'w-44 h-44'} bg-contain bg-no-repeat bg-center`}
        style={{backgroundImage: 'url(https://media.giphy.com/media/LpETtMf2z4X555cqvX/giphy.gif)'}}
      />
    </div>
  )
}

