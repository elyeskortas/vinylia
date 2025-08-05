import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req) {
  try {
    const { messages } = await req.json()
    console.log("Requête reçue pour le chatbot. Messages:", messages)

    // Vérifiez si la clé API est définie
    if (!process.env.OPENAI_API_KEY) {
      console.error("Erreur: La variable d'environnement OPENAI_API_KEY n'est pas définie.")
      return new Response(JSON.stringify({ error: "Clé API OpenAI manquante." }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      })
    }

    const result = await streamText({
      model: openai("gpt-4o"), // Utilisation du modèle GPT-4o
      messages,
    })
    console.log("Réponse du modèle AI reçue.")
    return result.toResponse()
  } catch (error) {
    console.error("Erreur dans la route API du chat:", error)
    return new Response(JSON.stringify({ error: `Erreur interne du serveur: ${error.message}` }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
