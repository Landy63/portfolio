import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  
  // Ici, vous pouvez ajouter la logique pour sauvegarder le message dans une base de données
  // Pour cet exemple, nous allons simplement simuler une sauvegarde réussie

  // Simuler un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Retourner une réponse de succès
  return NextResponse.json({ success: true })
}

