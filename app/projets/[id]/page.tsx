"use client"

import { useProjects } from "@/contexts/ProjectContext"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/Header"
import Modal from "@/components/Modal"
import TechLogo from "@/components/TechLogo"
import { Github } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function ProjectPage() {
  const { projects } = useProjects()
  const params = useParams()
  const project = projects.find((p) => p.id === params.id)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!project) {
    return <div className="text-gray-900 dark:text-gray-100">Projet non trouvé</div>
  }

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleReturnToProjects = async () => {
    await router.push("/")
    sessionStorage.setItem("scrollTo", "projets")
  }

  const allImages = [project.thumbnail, ...project.presentationImages].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-4 sm:py-8 pt-5 sm:pt-28">
        <div className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md rounded-lg shadow-lg p-4 sm:p-6 mb-8 border border-gray-300 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 sm:mb-0">{project.title}</h1>
            {project.languages && project.languages.length > 0 && (
              <div className="flex flex-wrap gap-2 sm:justify-end">
                {project.languages.map((lang) => (
                  <div
                    key={lang}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1.5 text-sm md:text-base"
                  >
                    <TechLogo name={lang} className="h-6 w-6 mr-2" />
                    <span className="font-medium">{lang}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-8 mb-6">
            <div className="md:w-1/2">
              {project.thumbnail && (
                <img
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full rounded-lg shadow-md cursor-pointer border border-gray-300 dark:border-gray-700"
                  onClick={() => openModal(0)}
                />
              )}
            </div>
            <div className="md:w-1/2 flex-grow">
              <p className="text-lg mb-4 whitespace-pre-wrap break-words overflow-hidden">{project.description}</p>
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <Link
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full inline-block transition-all duration-300 transform hover:scale-105"
                  >
                    Ouvrir le projet
                  </Link>
                )}
                {project.githubUrl && (
                  <Link
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 dark:bg-gray-600 hover:bg-gray-900 dark:hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full inline-flex items-center transition-all duration-300 transform hover:scale-105"
                  >
                    <Github className="mr-2" size={20} />
                    GitHub
                  </Link>
                )}
              </div>
            </div>
          </div>
          {project.presentationImages && project.presentationImages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Images de présentation</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.presentationImages.map(
                  (img, index) =>
                    img && (
                      <motion.img
                        key={index}
                        src={img}
                        alt={`Présentation ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg shadow-md cursor-pointer border border-gray-300 dark:border-gray-700"
                        onClick={() => openModal(index + 1)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 10 }}
                      />
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={closeModal} images={allImages} initialIndex={selectedImageIndex} />
    </div>
  )
}

