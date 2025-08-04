import { connectToDB } from "@/lib/mongodb.js"
import User from "@/models/user.js"
import { hashPassword, generateToken, validateEmail, validatePassword } from "@/lib/auth.js"
import { cookies } from "next/headers"

export async function POST(request) {
  try {
    const { firstName, lastName, email, password, confirmPassword } = await request.json()

    // Validation des données
    if (!firstName || !lastName || !email || !password) {
      return Response.json({ message: "Tous les champs sont requis" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return Response.json({ message: "Email invalide" }, { status: 400 })
    }

    if (!validatePassword(password)) {
      return Response.json({ message: "Le mot de passe doit contenir au moins 6 caractères" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return Response.json({ message: "Les mots de passe ne correspondent pas" }, { status: 400 })
    }

    await connectToDB()

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ message: "Un compte avec cet email existe déjà" }, { status: 400 })
    }

    // Hasher le mot de passe
    const hashedPassword = await hashPassword(password)

    // Créer l'utilisateur
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    })

    await user.save()

    // Générer le token
    const token = generateToken(user._id)

    // Définir le cookie
    const cookieStore = await cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    })

    // Retourner les données utilisateur (sans le mot de passe)
    const userResponse = {
      id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    }

    return Response.json(
      {
        message: "Inscription réussie",
        user: userResponse,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error)
    return Response.json({ message: "Erreur serveur lors de l'inscription" }, { status: 500 })
  }
}
