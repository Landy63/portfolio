'use client'

import { useState, useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ThemeChangeGif() {
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()
  const [showGif, setShowGif] = useState<'light' | 'dark' | null>(null)
  const [freezeDarkGif, setFreezeDarkGif] = useState(false)
  const isFirstRender = useRef(true)
  const previousTheme = useRef<string | undefined>(undefined)

  // Effet pour gérer le chargement initial
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      previousTheme.current = theme
    }
  }, [theme])

  // Effet pour gérer les changements de thème
  useEffect(() => {
    if (!isFirstRender.current && theme !== previousTheme.current) {
      previousTheme.current = theme
      if (theme === 'light' || theme === 'dark') {
        setShowGif(theme)
        setFreezeDarkGif(false)
        
        const animationTimer = setTimeout(() => {
          if (theme === 'dark') {
            setFreezeDarkGif(true)
            setTimeout(() => {
              setShowGif(null)
              setFreezeDarkGif(false)
            }, 500)
          } else {
            setShowGif(null)
          }
        }, 3000)

        return () => {
          clearTimeout(animationTimer)
        }
      }
    }
  }, [theme])

  if (!showGif) return null

  const gifUrl = showGif === 'light'
    ? 'https://media.giphy.com/media/LpETtMf2z4X555cqvX/giphy.gif'
    : 'https://media.giphy.com/media/EKXKy9xEPxaBlmLbot/giphy.gif'

  return (
    <div className={`fixed z-50 pointer-events-none ${isMobile ? 'right-2 -bottom-6' : 'right-4 -bottom-6'}`}>
      <div 
        className={`${isMobile ? 'w-28 h-28' : 'w-44 h-44'} bg-contain bg-no-repeat bg-center`}
        style={{
          backgroundImage: `url(${gifUrl})`,
          backgroundPosition: freezeDarkGif ? 'center right' : 'center',
        }}
      />
    </div>
  )
}

