"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { useIsMobile } from "@/hooks/useIsMobile"
import { useProjects } from "@/contexts/ProjectContext"

export default function ContactForm({ className = "" }) {
  const [sujet, setSujet] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)
  const { addMessage } = useProjects()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sujet, email, message }),
      })

      if (response.ok) {
        addMessage({ sujet, email, message, date: new Date().toISOString() })
        setSubmitStatus("success")
        setSujet("")
        setEmail("")
        setMessage("")
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={`${className} ${!useIsMobile() ? "mb-24" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 backdrop-blur-md rounded-lg !rounded-lg shadow-lg p-8 border border-gray-300 dark:border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100 text-shadow">
          Me Contacter
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 rounded-lg !rounded-lg shadow-xl p-8 max-w-3xl mx-auto transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-300 dark:border-gray-700"
        >
          {["sujet", "email", "message"].map((field) => (
            <div key={field} className="mb-6">
              <label htmlFor={field} className="block text-gray-800 dark:text-gray-100 font-bold mb-2 text-shadow">
                {field === "sujet" ? "Objet" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {field === "message" ? (
                <textarea
                  id={field}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-600 bg-opacity-100 dark:bg-opacity-100 transition-all duration-300 text-gray-800 dark:text-white"
                  rows={4}
                  required
                />
              ) : (
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  value={field === "sujet" ? sujet : email}
                  onChange={(e) => (field === "sujet" ? setSujet(e.target.value) : setEmail(e.target.value))}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-600 bg-opacity-100 dark:bg-opacity-100 transition-all duration-300 text-gray-800 dark:text-white"
                  required
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full w-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="animate-spin mr-2">&#9696;</span> : <Send className="mr-2" size={18} />}
            {isSubmitting ? "Envoi en cours..." : "Envoyer le Message"}
          </button>
          {submitStatus === "success" && (
            <p className="mt-4 text-green-600 dark:text-green-400 text-center">Message envoyé avec succès!</p>
          )}
          {submitStatus === "error" && (
            <p className="mt-4 text-red-600 dark:text-red-400 text-center">
              Une erreur est survenue. Veuillez réessayer.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

