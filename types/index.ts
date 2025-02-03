export interface Project {
  id: string
  title: string
  description: string
  thumbnail: string | null
  presentationImages: string[]
  demoUrl: string
  githubUrl: string
  languages: string[]
}

