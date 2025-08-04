import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function hashPassword(password) {
  const salt = await bcryptjs.genSalt(12)
  return await bcryptjs.hash(password, salt)
}

export async function verifyPassword(password, hashedPassword) {
  return await bcryptjs.compare(password, hashedPassword)
}

export function generateToken(userId) {
  return jwt.sign({ userId, iat: Date.now() }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export function validateEmail(email) {
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}

export function validatePassword(password) {
  return password && password.length >= 6
}
