'use client'

import { useProjects } from '@/contexts/ProjectContext'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'

export default function ProjectPage() {
  const { projects } = useProjects()
  const params = useParams()
  const project = projects.find(p => p.id === params.id)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
        <div className="flex flex-col md:flex-row gap-8 mb-4">
          <div className="md:w-1/2">
            <img src={project.image} alt={project.title} className="w-full rounded-lg shadow-md" />
          </div>
          <div className="md:w-1/2">
            <p className="text-lg mb-4 whitespace-pre-wrap break-words overflow-hidden">{project.description}</p>
            <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block">
              Ouvrir
            </Link>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Code Snippet</h2>
          <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
            <code>{project.codeSnippet}</code>
          </pre>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Back to Projects
          </Link>
        </div>
      </main>
    </div>
  )
}

