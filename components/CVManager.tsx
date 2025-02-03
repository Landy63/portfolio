"use client"

import { useState } from "react"
import { useProjects } from "@/contexts/ProjectContext"
import { FileUp, Trash2 } from "lucide-react"

export default function CVManager({ onDeleteClick }: { onDeleteClick: () => void }) {
  const { cv, updateCV } = useProjects()
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      try {
        await updateCV(file)
      } catch (error) {
        console.error("Error uploading CV:", error)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-50 backdrop-blur-md rounded-lg shadow-md p-6 mb-8 pt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Gestion du CV</h2>
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
        <div>
          {cv ? (
            <p className="text-green-600 dark:text-green-400">CV actuel : cv.pdf</p>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Aucun CV uploadé</p>
          )}
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
          <label className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full inline-flex items-center justify-center w-full sm:w-auto">
            <FileUp className="mr-2" size={20} />
            <span className="text-sm sm:text-base">{cv ? "Remplacer le CV" : "Uploader un CV"}</span>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" disabled={isUploading} />
          </label>
          {cv && (
            <button
              onClick={onDeleteClick}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full inline-flex items-center justify-center w-full sm:w-auto"
              disabled={isUploading}
            >
              <Trash2 className="mr-2" size={20} />
              <span className="text-sm sm:text-base">Supprimer le CV</span>
            </button>
          )}
        </div>
      </div>
      {isUploading && <p className="mt-2 text-blue-600 dark:text-blue-400">Uploading...</p>}
    </div>
  )
}

