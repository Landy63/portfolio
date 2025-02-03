"use client"

import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

interface TypewriterEffectProps {
  text: string
  speed: number
}

export default function TypewriterEffect({ text, speed }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const isMobile = useIsMobile()

  useEffect(() => {
    let index = 0
    setDisplayText("")

    const intervalId = setInterval(() => {
      setDisplayText((prev) => {
        if (index < text.length) {
          index++
          return text.slice(0, index)
        } else {
          clearInterval(intervalId)
          return prev
        }
      })
    }, speed)

    return () => clearInterval(intervalId)
  }, [text, speed])

  return (
    <div className={`w-full ${isMobile ? "max-w-4xl" : "max-w-fit"} mx-auto px-4 py-8`}>
      <pre
        className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-mono bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg shadow-lg ${
          isMobile ? "whitespace-pre-wrap" : "whitespace-nowrap"
        } mx-auto border border-gray-300 dark:border-gray-700`}
      >
        <code className="text-gray-800 dark:text-gray-200 block leading-tight sm:leading-normal">
          {displayText}
          <span className="animate-blink">|</span>
        </code>
      </pre>
    </div>
  )
}

