"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useSpring } from "framer-motion"
import { useSwipeable } from "react-swipeable"

const paginationStyles = `
  .paginate {
    position: relative;
    margin: 10px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    transform: translate3d(0, 0, 0);
    -webkit-filter: drop-shadow(0 2px 0px rgba(0, 0, 0, 0.2));
  }
  .paginate i {
    position: absolute;
    top: 40%;
    left: 0;
    width: 30px;
    height: 3px;
    border-radius: 2.5px;
    background: #fff;
    transition: all 0.15s ease;
  }
  .paginate.left i {
    transform-origin: 0% 50%;
  }
  .paginate.left i:first-child {
    transform: translate(0, -1px) rotate(40deg);
  }
  .paginate.left i:last-child {
    transform: translate(0, 1px) rotate(-40deg);
  }
  .paginate.left:hover i:first-child {
    transform: translate(0, -1px) rotate(30deg);
  }
  .paginate.left:hover i:last-child {
    transform: translate(0, 1px) rotate(-30deg);
  }
  .paginate.left:active i:first-child {
    transform: translate(1px, -1px) rotate(25deg);
  }
  .paginate.left:active i:last-child {
    transform: translate(1px, 1px) rotate(-25deg);
  }
  .paginate.right i {
    transform-origin: 100% 50%;
  }
  .paginate.right i:first-child {
    transform: translate(0, 1px) rotate(40deg);
  }
  .paginate.right i:last-child {
    transform: translate(0, -1px) rotate(-40deg);
  }
  .paginate.right:hover i:first-child {
    transform: translate(0, 1px) rotate(30deg);
  }
  .paginate.right:hover i:last-child {
    transform: translate(0, -1px) rotate(-30deg);
  }
  .paginate.right:active i:first-child {
    transform: translate(1px, 1px) rotate(25deg);
  }
  .paginate.right:active i:last-child {
    transform: translate(1px, -1px) rotate(-25deg);
  }
  .paginate[data-state="disabled"] {
    opacity: 0.3;
    cursor: default;
  }
  .paginate[data-state="disabled"] i:first-child,
  .paginate[data-state="disabled"] i:last-child,
  .paginate[data-state="disabled"]:hover i:first-child,
  .paginate[data-state="disabled"]:hover i:last-child {
    transform: translate(0, 0) rotate(0deg);
  }
  .close-button {
    position: relative;
    margin: 10px;
    width: 50px;
    height: 50px;
    cursor: pointer;
    transform: translate3d(0, 0, 0);
    -webkit-filter: drop-shadow(0 2px 0px rgba(0, 0, 0, 0.2));
  }
  .close-button::before,
  .close-button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 30px;
    height: 3px;
    background: #fff;
    border-radius: 2.5px;
    transform-origin: center;
  }
  .close-button::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .close-button::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  images: string[]
  initialIndex: number
}

export default function Modal({ isOpen, onClose, images, initialIndex }: ModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const constraintsRef = useRef(null)
  const [y, setY] = useState(0)
  const springY = useSpring(y)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    onSwipedUp: (eventData) => {
      if (eventData.velocity > 0.3) {
        onClose()
      } else {
        setY(0)
      }
    },
    onSwipedDown: (eventData) => {
      if (eventData.velocity > 0.3) {
        onClose()
      } else {
        setY(0)
      }
    },
    onSwiping: (eventData) => {
      setY(eventData.deltaY)
    },
    trackMouse: true,
    trackTouch: true,
    delta: 10,
    swipeDuration: 500,
  })

  useEffect(() => {
    // Inject the CSS styles
    const styleElement = document.createElement("style")
    styleElement.textContent = paginationStyles
    document.head.appendChild(styleElement)

    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          {...swipeHandlers}
          style={{
            y: springY,
            touchAction: "none",
          }}
          className="fixed inset-0 z-50 flex flex-col bg-black bg-opacity-90 overflow-hidden"
        >
          <div className="flex-grow flex items-center justify-center overflow-hidden">
            <div className="relative max-w-full max-h-full">
              <motion.img
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1}`}
                className="max-w-full max-h-[calc(100vh-200px)] w-auto h-auto object-contain"
                animate={{
                  opacity: 1,
                  scale: 1 - Math.abs(springY.get()) * 0.003,
                }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="flex-shrink-0 bg-black bg-opacity-75 backdrop-blur-md">
            <div className="w-full max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
              <div className="flex-1"></div>
              <div className="flex items-center justify-center">
                <button className="paginate left" onClick={prevImage} data-state={currentIndex === 0 ? "disabled" : ""}>
                  <i></i>
                  <i></i>
                </button>
                <span className="mx-4 text-white text-sm">
                  {currentIndex + 1} / {images.length}
                </span>
                <button
                  className="paginate right"
                  onClick={nextImage}
                  data-state={currentIndex === images.length - 1 ? "disabled" : ""}
                >
                  <i></i>
                  <i></i>
                </button>
              </div>
              <div className="flex-1 flex justify-end items-center">
                <button className="close-button" onClick={onClose} aria-label="Fermer" />
              </div>
            </div>
            <div className="w-full max-w-7xl mx-auto px-4 py-2 overflow-x-auto">
              <div className="flex justify-center space-x-4 h-16">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-transform duration-200 hover:brightness-110 flex items-center justify-center w-24 h-full ${
                      index === currentIndex ? "ring-4 ring-blue-500" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover object-center"
                    />
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-200 ${
                        index === currentIndex ? "opacity-0" : "opacity-100"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

