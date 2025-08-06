import mongoose from "mongoose"

let isConnected = false

export async function connectToDB() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Augmenter le timeout de sélection du serveur à 30 secondes
      socketTimeoutMS: 45000, // Augmenter le timeout des sockets à 45 secondes
    })
    isConnected = true
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
