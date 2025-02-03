'use client'

import { useProjects } from '@/contexts/ProjectContext'
import ProjectCard from '@/components/ProjectCard'
import { useIsMobile } from '@/hooks/useIsMobile'

export default function ProjectSection({ className = '' }) {
  const { projects } = useProjects()

  return (
    <section id="projets" className={`${className} ${!useIsMobile() ? 'mb-24' : ''}`}>
      <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-8 border border-gray-300 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100 text-shadow">Mes Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

