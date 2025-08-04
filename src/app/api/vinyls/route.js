import { connectToDB } from "@/lib/mongodb.js"
import Vinyl from "@/models/vinyl.js"
import vinyls from "@/data/vinyls.js" // <-- Chemin corrigé ici

export async function GET() {
  try {
    console.log("API: Récupération des vinyles...")

    // Commencer avec les données statiques
    let allVinyls = [...vinyls]
    console.log(`API: ${vinyls.length} vinyles statiques chargés`)

    // Essayer d'ajouter les vinyles de la base de données
    try {
      await connectToDB()
      const dbVinyls = await Vinyl.find({})

      const dbVinylsWithId = dbVinyls.map((vinyl) => ({
        ...vinyl.toObject(),
        id: vinyl._id.toString(),
      }))

      allVinyls = [...allVinyls, ...dbVinylsWithId]
      console.log(`API: ${dbVinyls.length} vinyles de MongoDB ajoutés`)
    } catch (dbError) {
      console.log("API: Erreur MongoDB, utilisation des données statiques uniquement:", dbError.message)
    }

    console.log(`API: Total ${allVinyls.length} vinyles retournés`)
    return Response.json(allVinyls)
  } catch (error) {
    console.error("API: Erreur lors de la récupération des vinyles:", error)
    // En cas d'erreur, retourner au moins les données statiques
    return Response.json(vinyls)
  }
}

export async function POST(request) {
  try {
    await connectToDB()
    const body = await request.json()

    const newVinyl = new Vinyl(body)
    await newVinyl.save()

    return Response.json(
      {
        ...newVinyl.toObject(),
        id: newVinyl._id.toString(),
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API: Erreur lors de la création du vinyle:", error)
    return Response.json({ error: "Erreur lors de la création du vinyle" }, { status: 500 })
  }
}
