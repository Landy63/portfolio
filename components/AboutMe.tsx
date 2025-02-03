"use client"

import Image from "next/image"
import { useIsMobile } from "@/hooks/useIsMobile"

export default function AboutMe({ className = "" }) {
  return (
    <section id="a-propos" className={`${className} ${!useIsMobile() ? "mb-24" : ""}`}>
      <div className="bg-gray-100 dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-70 backdrop-blur-md rounded-lg !rounded-lg shadow-lg p-8 max-w-5xl mx-auto border border-gray-300 dark:border-gray-700">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="w-full md:w-1/4 flex justify-center md:justify-end">
            <div className="relative w-48 h-48">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Photoroom_20241217_140013-6SjI0keufvI7AXr00l3ZpblKvMo6Sp.png"
                alt="Memoji"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-center md:text-left md:w-1/2 text-gray-900 dark:text-gray-100 text-shadow">
            À Propos de Moi
          </h2>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 bg-opacity-90 dark:bg-opacity-90 rounded-lg !rounded-lg shadow-xl p-8 max-w-4xl mx-auto transform hover:scale-105 transition-all duration-300 ease-in-out border border-gray-300 dark:border-gray-700">
          <p className="text-gray-800 dark:text-gray-100 mb-4 leading-relaxed">
          Bonjour, je m'appelle Dylan. Je suis diplômé d’un BTS en développement logiciel et applications, mais j’ai surtout affiné 
          mes compétences en développant des projets concrets, que vous trouverez dans la section “Mes Projets”.
          </p>
          <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
          Je peux passer des heures à coder et optimiser un programme sans m’ennuyer une seconde. J’aime aussi échanger avec d’autres développeurs et apprendre sur différents forums. 
          Toujours avide de découvrir de nouvelles technologies liées au développement logiciel, j'aime consacrer mon temps à créer des solutions pratiques et intuitives.
          </p>
        </div>
      </div>
    </section>
  )
}

