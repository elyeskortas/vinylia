import { cookies } from "next/headers"

export async function POST() {
  try {
    const cookieStore = await cookies()

    // Supprimer le cookie d'authentification
    cookieStore.delete("auth-token")

    return Response.json({ message: "Déconnexion réussie" }, { status: 200 })
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error)
    return Response.json({ message: "Erreur serveur lors de la déconnexion" }, { status: 500 })
  }
}
