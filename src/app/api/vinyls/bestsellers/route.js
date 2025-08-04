import { connectToDB } from "@/lib/mongodb.js";
import Vinyl from "@/models/vinyl.js";
import vinyls from "data/vinyls";

export async function GET() {
  try {
    console.log("API Bestsellers: Récupération des bestsellers...")

    // Filtrer les bestsellers des données statiques
    const staticBestsellers = vinyls.filter((vinyl) => vinyl.category === "BestSellers")
    let allBestsellers = [...staticBestsellers]

    // Essayer d'ajouter les bestsellers de la base de données
    try {
      await connectToDB()
      const dbBestsellers = await Vinyl.find({ category: "BestSellers" })

      const dbBestsellersWithId = dbBestsellers.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
      }))

      allBestsellers = [...allBestsellers, ...dbBestsellersWithId]
    } catch (dbError) {
      console.log("API Bestsellers: Erreur MongoDB:", dbError.message)
    }

    console.log(`API Bestsellers: ${allBestsellers.length} bestsellers retournés`)
    return Response.json(allBestsellers)
  } catch (error) {
    console.error("API Bestsellers: Erreur:", error)
    // Fallback sur les données statiques
    const staticBestsellers = vinyls.filter((vinyl) => vinyl.category === "BestSellers")
    return Response.json(staticBestsellers)
  }
}
