import Link from 'next/link'
import { Linkedin, Github, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 backdrop-blur-md">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 pb-20 md:pb-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              © {new Date().getFullYear()} John Doe. Tous droits réservés.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-xs mt-1">
              Développé avec Next.js et Tailwind CSS
            </p>
          </div>
          <nav className="flex space-x-4">
            <Link href="/mentions-legales" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
              Politique de confidentialité
            </Link>
          </nav>
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-300">
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="mailto:john.doe@example.com" className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
              <Mail size={24} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

