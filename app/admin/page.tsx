"use client"

import { useState, useEffect } from "react"
import { useProjects } from "@/contexts/ProjectContext"
import type { Project } from "@/types"
import { Plus, Edit, Trash, X } from "lucide-react"
import TechLogo from "@/components/TechLogo"
import CVManager from "@/components/CVManager"
import MessageManager from "@/components/MessageManager"
import { signIn, signOut, getSession } from "@/lib/auth"

export default function AdminPage() {
  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    deleteCV,
    messages,
    setMessages,
    deleteMessage,
    emptyTrash,
  } = useProjects()
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    type: "project" | "cv" | "message"
    id?: string
  } | null>(null)
  const [showTrash, setShowTrash] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkSession()
  }, [])

  const checkSession = async () => {
    const session = await getSession()
    setIsAuthenticated(!!session)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await signIn(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      setError("Identifiants invalides")
    }
  }

  const handleLogout = async () => {
    await signOut()
    setIsAuthenticated(false)
  }

  const handleDeleteClick = (type: "project" | "cv" | "message", id?: string) => {
    setDeleteConfirmation({ type, id })
  }

  const confirmDelete = () => {
    if (deleteConfirmation) {
      if (deleteConfirmation.type === "project" && deleteConfirmation.id) {
        deleteProject(deleteConfirmation.id)
      } else if (deleteConfirmation.type === "cv") {
        deleteCV()
      } else if (deleteConfirmation.type === "message") {
        if (deleteConfirmation.id === "emptyTrash") {
          emptyTrash()
        } else if (deleteConfirmation.id) {
          deleteMessage(deleteConfirmation.id)
        }
      }
      setDeleteConfirmation(null)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md p-8 rounded-lg shadow-md mx-4 sm:mx-0"
        >
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Connexion</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg mb-4 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-3 py-2 border rounded-lg mb-4 text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Entrer
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md p-1 rounded-lg shadow-md">
            Tableau de Bord Admin
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
          >
            Déconnexion
          </button>
        </div>

        <MessageManager
          onDeleteClick={(id) => handleDeleteClick("message", id)}
          onEmptyTrash={() => handleDeleteClick("message", "emptyTrash")}
          className="mb-8"
        />

        <CVManager onDeleteClick={() => handleDeleteClick("cv")} />

        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center backdrop-blur-md"
          >
            <Plus className="mr-2" /> Ajouter un Nouveau Projet
          </button>
        </div>
        {(showForm || editingProject) && (
          <div className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-6 mb-8">
            <ProjectForm
              onSubmit={(project) => {
                if (editingProject) {
                  updateProject(project)
                } else {
                  addProject(project)
                }
                setShowForm(false)
                setEditingProject(null)
              }}
              onCancel={() => {
                setShowForm(false)
                setEditingProject(null)
              }}
              initialProject={editingProject}
            />
          </div>
        )}
        {!showForm && !editingProject && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-4"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-100">{project.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{project.description}</p>
                {project.thumbnail && (
                  <img
                    src={project.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setEditingProject(project)}
                    className="bg-yellow-600 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                  >
                    <Edit className="mr-2" size={16} /> Modifier
                  </button>
                  <button
                    onClick={() => handleDeleteClick("project", project.id!)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
                  >
                    <Trash className="mr-2" size={16} /> Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteConfirmation && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl mx-4 max-w-sm w-full">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">Confirmer la suppression</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                {deleteConfirmation.type === "project" && "Êtes-vous sûr de vouloir supprimer ce projet ?"}
                {deleteConfirmation.type === "cv" && "Êtes-vous sûr de vouloir supprimer ce CV ?"}
                {deleteConfirmation.type === "message" &&
                  deleteConfirmation.id === "emptyTrash" &&
                  "Êtes-vous sûr de vouloir vider la corbeille ? Cette action est irréversible."}
                {deleteConfirmation.type === "message" &&
                  deleteConfirmation.id !== "emptyTrash" &&
                  (showTrash
                    ? "Êtes-vous sûr de vouloir supprimer définitivement ce message de la corbeille ?"
                    : "Êtes-vous sûr de vouloir déplacer ce message dans la corbeille ?")}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setDeleteConfirmation(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function ProjectForm({
  onSubmit,
  onCancel,
  initialProject,
}: { onSubmit: (project: Project) => void; onCancel: () => void; initialProject?: Project | null }) {
  const [title, setTitle] = useState(initialProject?.title || "")
  const [description, setDescription] = useState(initialProject?.description || "")
  const [thumbnail, setThumbnail] = useState<string | null>(initialProject?.thumbnail || null)
  const [presentationImages, setPresentationImages] = useState<string[]>(initialProject?.presentationImages || [])
  const [demoUrl, setDemoUrl] = useState(initialProject?.demoUrl || "")
  const [githubUrl, setGithubUrl] = useState(initialProject?.githubUrl || "")
  const [languages, setLanguages] = useState<string[]>(initialProject?.languages || [])

  const availableLanguages = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Node.js",
    "Python",
    "Java",
    "PHP",
    "Ruby",
    "Go",
    "C++",
    "C",
    "C#",
    "Rust",
    "R",
    "SQL",
    "Tailwind CSS",
    "Angular",
    "Next.js",
  ]

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string | null>> | React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (event) => {
            const result = event.target?.result
            if (result && typeof result === "string") {
              if (setter === setPresentationImages) {
                setPresentationImages((prev) => [...prev, result])
              } else {
                setter(result)
              }
            }
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  const handleRemoveImage = (index: number) => {
    setPresentationImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      id: initialProject?.id || Date.now().toString(),
      title,
      description,
      thumbnail,
      presentationImages,
      demoUrl,
      githubUrl,
      languages,
    })
  }

  const handleLanguageToggle = (lang: string) => {
    setLanguages((prev) => (prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Titre
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
          rows={4}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Miniature</label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setThumbnail)}
            className="hidden"
            id="thumbnail-upload"
          />
          <label
            htmlFor="thumbnail-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block"
          >
            {thumbnail ? "Changer la miniature" : "Choisir une miniature"}
          </label>
          {thumbnail && <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Image sélectionnée</span>}
        </div>
        {thumbnail && (
          <img
            src={thumbnail || "/placeholder.svg"}
            alt="Thumbnail"
            className="mt-2 max-w-full h-48 object-cover rounded"
          />
        )}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Images de présentation</label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, setPresentationImages)}
            className="hidden"
            id="presentation-images-upload"
            multiple
          />
          <label
            htmlFor="presentation-images-upload"
            className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block"
          >
            Ajouter des images
          </label>
          {presentationImages.length > 0 && (
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {presentationImages.length} image(s) sélectionnée(s)
            </span>
          )}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {presentationImages.map((img, index) => (
            <div key={index} className="relative">
              <img
                src={img || "/placeholder.svg"}
                alt={`Presentation ${index + 1}`}
                className="w-24 h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="demoUrl" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          URL de Démonstration
        </label>
        <input
          type="url"
          id="demoUrl"
          value={demoUrl}
          onChange={(e) => setDemoUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="githubUrl" className="block text-gray-700 dark:text-gray-300 font-bold mb-2">
          URL GitHub
        </label>
        <input
          type="url"
          id="githubUrl"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Technologies utilisées</label>
        <div className="flex flex-wrap gap-2">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => handleLanguageToggle(lang)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                languages.includes(lang)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              <TechLogo name={lang} className="h-5 w-5" />
              {lang}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Annuler
        </button>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full">
          {initialProject ? "Mettre à Jour le Projet" : "Ajouter le Projet"}
        </button>
      </div>
    </form>
  )
}

