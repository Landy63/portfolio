import Header from '@/components/Header'
import AboutMe from '@/components/AboutMe'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <AboutMe />
      </main>
    </div>
  )
}

