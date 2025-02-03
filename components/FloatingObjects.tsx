'use client'

import { useTheme } from 'next-themes'
import { motion, useMotionValue } from 'framer-motion'
import { useState, useEffect, useCallback, useRef } from 'react'
import { Code, Database, Cpu, Wifi, Cloud, Server, Monitor, Smartphone, Laptop, HardDrive, Keyboard, Mouse, Printer, Router, Bluetooth, Rss } from 'lucide-react'

const icons = [Code, Database, Cpu, Wifi, Cloud, Server, Monitor, Smartphone, Laptop, HardDrive, Keyboard, Mouse, Printer, Router, Bluetooth, Rss]

const shapes = ['circle', 'square', 'triangle']

const FloatingObject = ({ Icon, shape, size, color, x, y }) => {
  let shapeElement = null

  switch (shape) {
    case 'circle':
      shapeElement = <div className={`rounded-full ${color} w-${size} h-${size}`} />
      break
    case 'square':
      shapeElement = <div className={`${color} w-${size} h-${size}`} />
      break
    case 'triangle':
      shapeElement = (
        <div className={`w-0 h-0 border-l-[${size}px] border-l-transparent border-b-[${size}px] ${color} border-r-[${size}px] border-r-transparent`} />
      )
      break
    default:
      shapeElement = <Icon size={size} className={color} />
  }

  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{ x, y }}
    >
      {shapeElement}
    </motion.div>
  )
}

export default function FloatingObjects() {
  const { theme } = useTheme()
  const [objects, setObjects] = useState([])
  const cursorRef = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const touchStartRef = useRef({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  // Create motion values for x and y coordinates
  const xMotionValues = useRef(Array(175).fill(null).map(() => useMotionValue(0)))
  const yMotionValues = useRef(Array(175).fill(null).map(() => useMotionValue(0)))

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const objectsCount = Math.floor(isMobile ? 70 : 175);
    const newObjects = [...Array(objectsCount)].map((_, index) => ({
      id: index,
      isIcon: Math.random() > 0.3,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.floor(Math.random() * 30 + 20),
      color: theme === 'dark' ? 'text-white' : 'text-black',
      opacity: Math.random() * 0.2 + 0.1,
      x: xMotionValues.current[index],
      y: yMotionValues.current[index],
      vx: 0,
      vy: 0,
    }))

    newObjects.forEach((obj, index) => {
      xMotionValues.current[index].set(Math.random() * window.innerWidth)
      yMotionValues.current[index].set(Math.random() * window.innerHeight)
    })

    setObjects(newObjects)
  }, [theme, isMobile])

  const updateObjectPositions = useCallback(() => {
    objects.forEach((obj, index) => {
      obj.vx += (Math.random() - 0.5) * 0.2
      obj.vy += (Math.random() - 0.5) * 0.2

      let x = xMotionValues.current[index].get()
      let y = yMotionValues.current[index].get()

      x += obj.vx
      y += obj.vy

      if (x < 0 || x > window.innerWidth) obj.vx *= -1
      if (y < 0 || y > window.innerHeight) obj.vy *= -1

      const dx = x - cursorRef.current.x
      const dy = y - cursorRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 100

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 2
        obj.vx += (dx / distance) * force
        obj.vy += (dy / distance) * force
      }

      const maxSpeed = 8
      const speed = Math.sqrt(obj.vx * obj.vx + obj.vy * obj.vy)
      if (speed > maxSpeed) {
        obj.vx = (obj.vx / speed) * maxSpeed
        obj.vy = (obj.vy / speed) * maxSpeed
      }

      obj.vx *= 0.98
      obj.vy *= 0.98

      xMotionValues.current[index].set(x)
      yMotionValues.current[index].set(y)
    })
  }, [objects])

  useEffect(() => {
    let animationFrameId

    const animate = () => {
      updateObjectPositions()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [updateObjectPositions])

  const handleImpact = useCallback((event: MouseEvent | TouchEvent) => {
    const impactX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const impactY = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    setObjects(prevObjects => prevObjects.map(obj => {
      const x = xMotionValues.current[obj.id].get();
      const y = yMotionValues.current[obj.id].get();
      const dx = x - impactX;
      const dy = y - impactY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 200; // Rayon d'impact

      if (distance < maxDistance) {
        const force = (1 - distance / maxDistance) * 20; // Force de l'impact
        const angle = Math.atan2(dy, dx);
        return {
          ...obj,
          vx: obj.vx + Math.cos(angle) * force,
          vy: obj.vy + Math.sin(angle) * force
        };
      }
      return obj;
    }));
  }, []);

  useEffect(() => {
    const handleWindowEvents = (event: MouseEvent | TouchEvent) => {
      if (event.type === 'mousemove') {
        cursorRef.current = { x: (event as MouseEvent).clientX, y: (event as MouseEvent).clientY };
      } else if (event.type === 'click' || event.type === 'touchstart') {
        handleImpact(event);
      }
    };

    window.addEventListener('mousemove', handleWindowEvents);
    window.addEventListener('click', handleWindowEvents);
    window.addEventListener('touchstart', handleWindowEvents);

    return () => {
      window.removeEventListener('mousemove', handleWindowEvents);
      window.removeEventListener('click', handleWindowEvents);
      window.removeEventListener('touchstart', handleWindowEvents);
    };
  }, [handleImpact]);

  return (
    <>
      <div 
        className="fixed inset-0 overflow-hidden pointer-events-none"
      >
        {objects.map((obj) => (
          <FloatingObject
            key={obj.id}
            Icon={obj.Icon}
            shape={obj.isIcon ? null : obj.shape}
            size={obj.size}
            color={`${obj.color} opacity-${Math.floor(obj.opacity * 100)}`}
            x={obj.x}
            y={obj.y}
          />
        ))}
      </div>
    </>
  )
}

