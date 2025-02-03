'use client'

import React, { useState, useEffect } from 'react'
import { useIsMobile } from '@/hooks/useIsMobile'

const WELCOME_TEXT_MOBILE = ["Bienvenue sur", "mon portfolio"];
const WELCOME_TEXT_DESKTOP = "Bienvenue sur mon portfolio";

export default function TypewriterEffect() {
  const [text, setText] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    const fullText = isMobile ? WELCOME_TEXT_MOBILE.join('\n') : WELCOME_TEXT_DESKTOP;
    let index = 0;

    const intervalId = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [isMobile]);

  return (
    <div className={`w-full ${isMobile ? 'max-w-4xl' : 'max-w-fit'} mx-auto px-4 py-8`}>
      <pre className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center font-mono bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-lg shadow-lg ${isMobile ? 'whitespace-pre-wrap' : 'whitespace-nowrap'} mx-auto border border-gray-300 dark:border-gray-700`}>
        <code className="text-gray-800 dark:text-gray-200 block leading-tight sm:leading-normal">
          {text}
          <span className="animate-blink">|</span>
        </code>
      </pre>
    </div>
  )
}

