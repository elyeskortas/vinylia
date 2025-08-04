import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req) {
  try {
    const { messages } = await req.json()

    const result = await streamText({
      model: openai("gpt-4o"), // Utilisation du modèle GPT-4o
      messages,
    })

    return result.toResponse()
  } catch (error) {
    console.error("Erreur dans la route API du chat:", error)
    return new Response(JSON.stringify({ error: "Erreur interne du serveur" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }
}
