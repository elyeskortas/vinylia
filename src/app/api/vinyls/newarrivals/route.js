import { connectToDB } from "@/lib/mongodb.js";
import Vinyl from "@/models/vinyl.js";
import vinyls from "data/vinyls";

export async function GET() {
  try {
    console.log("API NewArrivals: Récupération des nouveautés...")

    // Filtrer les nouveautés des données statiques
    const staticNewArrivals = vinyls.filter((vinyl) => vinyl.category === "NewArrival")
    let allNewArrivals = [...staticNewArrivals]

    // Essayer d'ajouter les nouveautés de la base de données
    try {
      await connectToDB()
      const dbNewArrivals = await Vinyl.find({ category: "NewArrival" })

      const dbNewArrivalsWithId = dbNewArrivals.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
        img: vinyl.image || vinyl.img, // Compatibilité avec les deux noms de champs
      }))

      allNewArrivals = [...allNewArrivals, ...dbNewArrivalsWithId]
      console.log(`API NewArrivals: ${dbNewArrivals.length} nouveautés de MongoDB ajoutées`)
    } catch (dbError) {
      console.log("API NewArrivals: Erreur MongoDB, utilisation des données statiques uniquement:", dbError.message)
    }

    console.log(`API NewArrivals: Total ${allNewArrivals.length} nouveautés retournées`)
    return Response.json(allNewArrivals)
  } catch (error) {
    console.error("API NewArrivals: Erreur lors de la récupération des nouveautés:", error)
    // Fallback sur les données statiques
    const staticNewArrivals = vinyls.filter((vinyl) => vinyl.category === "NewArrival")
    return Response.json(staticNewArrivals)
  }
}
