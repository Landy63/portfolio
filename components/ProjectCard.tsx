'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Project } from '@/types'
import TechLogo from '@/components/TechLogo'

export default function ProjectCard({ project }: { project: Project }) {
  const router = useRouter()

  const handleImageClick = () => {
    router.push(`/projets/${project.id}`)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 relative group border border-gray-300 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={project.thumbnail || '/placeholder.svg?height=192&width=256'}
          alt={project.title} 
          fill
          objectFit="cover" 
          className="transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          onClick={handleImageClick}
        />
      </div>
      <div className="p-4 relative z-10">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300">{project.title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {project.languages && project.languages.map((lang) => (
              <TechLogo key={lang} name={lang} className="h-6 w-6" />
            ))}
          </div>
          <Link href={`/projets/${project.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full inline-block transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105">
            Voir le Projet
          </Link>
        </div>
      </div>
    </div>
  )
}

