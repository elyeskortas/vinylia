"use client"
import { useWishlist } from "@/context/wishlist-context"
import Link from "next/link"

export default function VinylListClient({ vinyls, categories }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist()

  return (
    <div className="container py-5">
      <h2 className="mb-4">Nos vinyles</h2>
      {categories.map((cat) => (
        <div key={cat} className="mb-5">
          <h4 className="mb-3">{cat}</h4>
          <div className="d-flex gap-4 overflow-auto">
            {vinyls
              .filter((v) => v.category === cat)
              .map((vinyl) => {
                // Utilisez _id de MongoDB ou id des données statiques
                const vinylId = vinyl._id?.toString() || vinyl.id
                const inWishlist = wishlist.some((item) => item.id === vinylId)

                return (
                  <div
                    key={`${cat}-${vinylId}`}
                    className="card h-100"
                    style={{ minWidth: "260px", position: "relative" }}
                  >
                    <Link href={`/vinyles/${vinylId}`} className="text-decoration-none text-dark">
                      <img
                        src={`/images/${vinyl.image}`}
                        className="card-img-top"
                        alt={vinyl.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{vinyl.title}</h5>
                        <p className="card-text">${vinyl.price.toFixed(2)}</p>
                      </div>
                    </Link>
                    <button
                      onClick={() =>
                        inWishlist ? removeFromWishlist(vinylId) : addToWishlist({ ...vinyl, id: vinylId })
                      }
                      className={`btn btn-sm ${inWishlist ? "btn-danger" : "btn-outline-primary"}`}
                      style={{ position: "absolute", top: "10px", right: "10px" }}
                      aria-label={inWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
                    >
                      {inWishlist ? "♥" : "♡"}
                    </button>
                  </div>
                )
              })}
          </div>
          <div className="text-end mt-2">
            <Link href="#" className="btn btn-outline-secondary">
              Voir plus
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
