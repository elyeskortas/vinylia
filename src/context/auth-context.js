"use client"
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else if (response.status === 401) {
        // 401 est normal quand l'utilisateur n'est pas connecté
        // Ne pas logger cette erreur
        setUser(null)
      } else {
        // Autres erreurs (500, etc.)
        console.error("Erreur lors de la vérification de l'authentification:", response.status)
      }
    } catch (error) {
      // Erreur réseau ou autre
      console.error("Erreur réseau lors de la vérification de l'authentification:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        return { success: true, message: "Connexion réussie" }
      } else {
        return { success: false, message: data.message || "Erreur de connexion" }
      }
    } catch (error) {
      console.error("Erreur de connexion:", error)
      return { success: false, message: "Erreur de connexion" }
    }
  }

  const register = async (userData) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        return { success: true, message: "Inscription réussie" }
      } else {
        return { success: false, message: data.message || "Erreur d'inscription" }
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error)
      return { success: false, message: "Erreur d'inscription" }
    }
  }

  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        setUser(null)
        return { success: true, message: "Déconnexion réussie" }
      } else {
        // Même si la déconnexion côté serveur échoue, on déconnecte côté client
        setUser(null)
        return { success: true, message: "Déconnexion effectuée" }
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
      // Déconnecter quand même côté client
      setUser(null)
      return { success: true, message: "Déconnexion effectuée" }
    }
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

  const refreshAuth = () => {
    checkAuth()
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateUser,
    refreshAuth,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider")
  }
  return context
}
