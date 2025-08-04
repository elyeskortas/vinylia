import { connectToDB } from "@/lib/mongodb.js"
import User from "@/models/user.js"
import { verifyToken } from "@/lib/auth.js"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return Response.json({ message: "Non authentifié" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return Response.json({ message: "Token invalide" }, { status: 401 })
    }

    await connectToDB()

    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      return Response.json({ message: "Utilisateur non trouvé" }, { status: 404 })
    }

    const userResponse = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      avatar: user.avatar,
      phone: user.phone,
      address: user.address,
    }

    return Response.json(userResponse)
  } catch (error) {
    console.error("Erreur lors de la vérification:", error)
    return Response.json({ message: "Erreur serveur" }, { status: 500 })
  }
}
