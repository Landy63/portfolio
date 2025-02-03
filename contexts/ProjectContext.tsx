"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { Project } from "@/types"
import { supabase } from "@/lib/supabase"

interface Message {
  id: string
  sujet: string
  email: string
  message: string
  date: string
  isRead: boolean
  isPinned: boolean
  isDeleted: boolean
}

interface ProjectContextType {
  projects: Project[]
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  cv: string | null
  updateCV: (file: File) => Promise<void>
  deleteCV: () => Promise<void>
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  addMessage: (message: Omit<Message, "id" | "isRead" | "isPinned" | "isDeleted">) => void
  updateMessage: (id: string, updates: Partial<Message>) => void
  deleteMessage: (id: string) => void
  restoreMessage: (id: string) => void
  emptyTrash: () => void
  isCVLoading: boolean
  downloadCV: () => Promise<void>
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "password-generator",
      title: "Générateur de mot de passe",
      description:
        "Générateur de mot de passe permettant de créer des mots de passe sécurisés avec différentes options de personnalisation.",
      thumbnail: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Miniature-42S24tNkDfDb2kZYw2qc5umsUCOToY.png",
      presentationImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Images%20de%20pr%C3%A9sentation_1-tWA9epfQzRb8qsAcKEvyAzRIlcdzD3.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Images%20de%20pr%C3%A9sentation-2-QuGfARzNVLYOnR5LTfOMknbrs7CpaY.png",
      ],
      demoUrl: "https://vallees-cerveau.github.io/Password-generator/",
      githubUrl: "https://github.com/vallees-cerveau/Password-generator",
      languages: ["HTML", "CSS", "JavaScript"],
    },
  ])
  const [cv, setCV] = useState<string | null>(null)
  const [isCVLoading, setIsCVLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects")
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects))
    }
    const storedMessages = localStorage.getItem("messages")
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages))
    }

    // Check if CV exists and get its URL
    const checkCVExists = async () => {
      setIsCVLoading(true)
      try {
        const { data, error } = await supabase.storage.from("cv").list("", { limit: 1, search: "cv.pdf" })

        if (error) {
          throw error
        }

        if (data && data.length > 0) {
          const { data: urlData } = supabase.storage.from("cv").getPublicUrl("cv.pdf")
          setCV(urlData.publicUrl)
        } else {
          setCV(null)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du CV:", error)
        setCV(null)
      } finally {
        setIsCVLoading(false)
      }
    }

    checkCVExists()
  }, [])

  const addProject = (project: Project) => {
    const newProjects = [...projects, { ...project, id: Date.now().toString() }]
    setProjects(newProjects)
    localStorage.setItem("projects", JSON.stringify(newProjects))
  }

  const updateProject = (updatedProject: Project) => {
    const newProjects = projects.map((p) => (p.id === updatedProject.id ? updatedProject : p))
    setProjects(newProjects)
    localStorage.setItem("projects", JSON.stringify(newProjects))
  }

  const deleteProject = (id: string) => {
    const newProjects = projects.filter((p) => p.id !== id)
    setProjects(newProjects)
    localStorage.setItem("projects", JSON.stringify(newProjects))
  }

  const updateCV = async (file: File) => {
    setIsCVLoading(true)
    try {
      const { error } = await supabase.storage.from("cv").upload("cv.pdf", file, { upsert: true })

      if (error) throw error

      const { data: urlData } = supabase.storage.from("cv").getPublicUrl("cv.pdf")
      setCV(urlData.publicUrl)
    } catch (error) {
      console.error("Erreur lors de l'upload du CV:", error)
    } finally {
      setIsCVLoading(false)
    }
  }

  const deleteCV = async () => {
    try {
      const { error } = await supabase.storage.from("cv").remove(["cv.pdf"])
      if (error) throw error
      setCV(null)
    } catch (error) {
      console.error("Erreur lors de la suppression du CV:", error)
    }
  }

  const downloadCV = async () => {
    try {
      const { data, error } = await supabase.storage.from("cv").download("cv.pdf")

      if (error) {
        throw error
      }

      // Créer un URL pour le blob et le télécharger
      const blob = new Blob([data], { type: "application/pdf" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = "cv.pdf"
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Erreur lors du téléchargement du CV:", error)
    }
  }

  const addMessage = (message: Omit<Message, "id" | "isRead" | "isPinned" | "isDeleted">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      isRead: false,
      isPinned: false,
      isDeleted: false,
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    localStorage.setItem("messages", JSON.stringify(newMessages))
  }

  const updateMessage = (id: string, updates: Partial<Message>) => {
    const newMessages = messages.map((msg) => (msg.id === id ? { ...msg, ...updates } : msg))
    setMessages(newMessages)
    localStorage.setItem("messages", JSON.stringify(newMessages))
  }

  const deleteMessage = (id: string) => {
    const newMessages = messages.map((msg) => (msg.id === id ? { ...msg, isDeleted: true } : msg))
    setMessages(newMessages)
    localStorage.setItem("messages", JSON.stringify(newMessages))
  }

  const restoreMessage = (id: string) => {
    const newMessages = messages.map((msg) => (msg.id === id ? { ...msg, isDeleted: false } : msg))
    setMessages(newMessages)
    localStorage.setItem("messages", JSON.stringify(newMessages))
  }

  const emptyTrash = () => {
    const newMessages = messages.filter((msg) => !msg.isDeleted)
    setMessages(newMessages)
    localStorage.setItem("messages", JSON.stringify(newMessages))
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        cv,
        updateCV,
        deleteCV,
        messages,
        setMessages,
        addMessage,
        updateMessage,
        deleteMessage,
        restoreMessage,
        emptyTrash,
        isCVLoading,
        downloadCV,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}

