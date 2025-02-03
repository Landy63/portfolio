"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Briefcase, User, Mail, Linkedin, Github, Sun, Moon, Home, Menu, X, ArrowLeft } from "lucide-react"
import { useTheme } from "next-themes"
import { useRouter, usePathname } from "next/navigation"
import { useIsMobile } from "@/hooks/useIsMobile"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isProjectPage = pathname.startsWith("/projets/")
  const isMobile = useIsMobile()

  const visibleSections = useIntersectionObserver(["accueil", "projets", "a-propos", "contact"])

  const mostVisibleSection = useMemo(() => {
    if (visibleSections.length === 0) return null
    return visibleSections.reduce((prev, current) => (current.ratio > prev.ratio ? current : prev)).id
  }, [visibleSections])

  useEffect(() => setMounted(true), [])

  const navItems = [
    { href: "accueil", Icon: Home, label: "Accueil" },
    { href: "projets", Icon: Briefcase, label: "Projets" },
    { href: "a-propos", Icon: User, label: "À Propos" },
    { href: "contact", Icon: Mail, label: "Contact" },
  ]

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (pathname === "/") {
        const section = document.getElementById(sectionId)
        if (!section) return

        const navbarHeight = document.querySelector("header")?.offsetHeight || 0
        const extraOffset = 10
        const sectionTop = section.offsetTop - (isMobile ? 0 : navbarHeight) - extraOffset

        window.scrollTo({
          top: sectionTop,
          behavior: "smooth",
        })
      } else {
        localStorage.setItem("scrollTo", sectionId)
        router.push("/")
      }
      setIsBurgerOpen(false)
    },
    [pathname, router, isMobile],
  )

  useEffect(() => {
    if (pathname === "/") {
      const targetSection = localStorage.getItem("scrollTo")
      if (targetSection) {
        setTimeout(() => {
          scrollToSection(targetSection)
          localStorage.removeItem("scrollTo")
        }, 100)
      }
    }
  }, [pathname, scrollToSection])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen)
  }

  return (
    <header className={`fixed left-0 right-0 z-40 ${isMobile ? "bottom-0" : "top-6"}`}>
      {/* Mobile floating navbar */}
      <nav
        className={`md:hidden mx-auto bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md shadow-lg px-4 py-2 rounded-t-lg ${isBurgerOpen ? "rounded-tr-none" : ""} transition-all duration-300 border border-gray-300 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between">
          {navItems.map(({ href, Icon }) => (
            <motion.button
              key={href}
              onClick={() => scrollToSection(href)}
              className={`p-2 ${
                isProjectPage && href === "projets"
                  ? "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                  : "text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400"
              } transition-colors duration-300 ${
                mostVisibleSection === href ? "text-blue-900 dark:text-blue-400" : ""
              }`}
              animate={{
                fontWeight: mostVisibleSection === href || (isProjectPage && href === "projets") ? 700 : 400,
                color:
                  mostVisibleSection === href || (isProjectPage && href === "projets")
                    ? theme === "dark"
                      ? "#60A5FA"
                      : "#2563EB"
                    : theme === "dark"
                      ? "#F3F4F6"
                      : "#111827",
              }}
              transition={{ duration: 0.3 }}
            >
              {isProjectPage && href === "projets" ? <ArrowLeft size={24} /> : <Icon size={24} />}
            </motion.button>
          ))}
          <button
            onClick={toggleBurgerMenu}
            className="p-2 text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300 z-50"
            aria-label="Toggle menu"
          >
            {isBurgerOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile burger menu */}
      <div
        className={`md:hidden fixed right-0 bottom-[3.5rem] w-[4.5rem] bg-white dark:bg-gray-800 bg-opacity-100 dark:bg-opacity-100 shadow-lg transform transition-all duration-300 ease-in-out ${
          isBurgerOpen
            ? "h-[12rem] rounded-tl-lg border-t border-l border-r border-gray-300 dark:border-gray-700"
            : "h-0"
        } overflow-hidden`}
      >
        <div className={`flex flex-col justify-start h-full pt-4 px-5 ${isBurgerOpen ? "" : "rounded-tr-lg"}`}>
          <div className="flex flex-col items-center space-y-8 mb-4">
            <a
              href="https://linkedin.com/in/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <Linkedin size={31} />
            </a>
            <a
              href="https://github.com/johndoe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300"
            >
              <Github size={31} />
            </a>
            <button
              onClick={toggleTheme}
              className="text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {mounted && (theme === "dark" ? <Sun size={31} className="text-yellow-400" /> : <Moon size={31} />)}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop navbar */}
      <nav className="hidden md:block mx-auto max-w-5xl px-4">
        <div className="bg-white dark:bg-gray-800 transition-all duration-300 ease-in-out rounded-full px-6 py-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] border border-gray-300 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => scrollToSection("accueil")}
              className={`text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300 flex items-center ${
                mostVisibleSection === "accueil" ? "font-bold text-blue-600 dark:text-blue-400" : ""
              }`}
              animate={{
                fontWeight: mostVisibleSection === "accueil" ? 700 : 400,
                color:
                  mostVisibleSection === "accueil"
                    ? theme === "dark"
                      ? "#60A5FA"
                      : "#2563EB"
                    : theme === "dark"
                      ? "#F3F4F6"
                      : "#111827",
              }}
              transition={{ duration: 0.3 }}
            >
              <Home size={28} className="mr-2" />
              <span className="text-lg">Accueil</span>
            </motion.button>
            <div className="flex items-center justify-center flex-1">
              {isProjectPage ? (
                <motion.button
                  onClick={() => scrollToSection("projets")}
                  className="mx-6 text-lg text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-300 flex items-center font-semibold"
                  animate={{
                    fontWeight: 700,
                    color: theme === "dark" ? "#60A5FA" : "#2563EB",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowLeft size={24} className="mr-2" />
                  Retour aux projets
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => scrollToSection("projets")}
                  className={`mx-6 text-lg transition-colors duration-300 ${
                    isProjectPage || mostVisibleSection === "projets"
                      ? "font-bold text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400"
                  }`}
                  animate={{
                    fontWeight: isProjectPage || mostVisibleSection === "projets" ? 700 : 400,
                    color:
                      isProjectPage || mostVisibleSection === "projets"
                        ? theme === "dark"
                          ? "#60A5FA"
                          : "#2563EB"
                        : theme === "dark"
                          ? "#F3F4F6"
                          : "#111827",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Projets
                </motion.button>
              )}
              {navItems.slice(2).map(({ href, label }) => (
                <motion.button
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className={`mx-6 text-lg transition-colors duration-300 ${
                    mostVisibleSection === href
                      ? "font-bold text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400"
                  }`}
                  animate={{
                    fontWeight: mostVisibleSection === href ? 700 : 400,
                    color:
                      mostVisibleSection === href
                        ? theme === "dark"
                          ? "#60A5FA"
                          : "#2563EB"
                        : theme === "dark"
                          ? "#F3F4F6"
                          : "#111827",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {label}
                </motion.button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com/in/johndoe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="https://github.com/Landy63"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <Github size={28} />
              </a>
              <button
                onClick={toggleTheme}
                className="text-gray-900 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400 transition-colors duration-300"
                aria-label="Toggle dark mode"
              >
                {mounted && (theme === "dark" ? <Sun size={28} className="text-yellow-400" /> : <Moon size={28} />)}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

