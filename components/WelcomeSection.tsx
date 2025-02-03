"use client"

import TypewriterEffect from "./TypewriterEffect"
import Image from "next/image"
import { FileDown, Loader2 } from "lucide-react"
import TechLogo from "./TechLogo"
import { useProjects } from "@/contexts/ProjectContext"
import { useEffect, useState } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function WelcomeSection({ className = "" }) {
  const { projects, cv, isCVLoading, downloadCV } = useProjects()
  const [playAnimation, setPlayAnimation] = useState(true)
  const isMobile = useIsMobile()

  const handleDownloadCV = async () => {
    await downloadCV()
  }

  useEffect(() => {
    setPlayAnimation(true)
  }, [])

  const portfolioTechnologies = ["Next.js", "TypeScript", "Tailwind CSS"]
  const projectTechnologies = projects.flatMap((project) => project.languages || [])

  return (
    <section id="accueil" className={`pt-2 md:pt-8 ${className} ${!isMobile ? "mb-24" : ""}`}>
      <div className="container mx-auto px-4 pt-2">
        <div className="flex justify-center items-center mt-4 md:mt-8 mb-8">
          <TypewriterEffect key={Date.now()} text="Bienvenue sur mon portfolio" speed={100} />
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6 mt-8 max-w-4xl mx-auto border border-gray-300 dark:border-gray-700">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photoroom_20241217_135849-ueteW8zWerLstjdDo5oOU7buH1GTOE.png"
                  alt="Memoji"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-gray-700 dark:text-gray-100 text-center">
                  Technologies utilisées
                </h2>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300">Portfolio</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {portfolioTechnologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center bg-white dark:bg-gray-700 rounded-full px-3 py-1 shadow-sm"
                      >
                        <TechLogo name={tech} className="h-5 w-5 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-600 dark:text-gray-300">Projets</h3>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {projectTechnologies.map((tech) => (
                      <div
                        key={tech}
                        className="flex items-center bg-white dark:bg-gray-700 rounded-full px-3 py-1 shadow-sm"
                      >
                        <TechLogo name={tech} className="h-5 w-5 mr-1" />
                        <span className="text-sm text-gray-700 dark:text-gray-200">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleDownloadCV}
                  className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    isCVLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isCVLoading}
                >
                  {isCVLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileDown className="mr-2" size={20} />
                  )}
                  {isCVLoading ? "Chargement..." : "Télécharger mon CV"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

