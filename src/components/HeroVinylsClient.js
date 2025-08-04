"use client";

import Link from "next/link";
import WishlistButton from "./WishlistButton";

export default function HeroVinylsClient({ vinyls }) {
  return (
    <div className="d-flex overflow-auto gap-4 py-4">
      {vinyls.map((vinyl) => (
        <div
          key={vinyl.id}
          className="card"
          style={{ width: "300px", flexShrink: 0, position: "relative" }}
        >
          <Link href={`/vinyles/${vinyl.id}`} className="text-decoration-none text-dark">
            <div className="card-img-container">
              <img
                src={`/images/${vinyl.image}`}
                alt={vinyl.title}
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text-uppercase">{vinyl.title}</h5>
            </div>
          </Link>
          <WishlistButton vinyl={vinyl} />
        </div>
      ))}
    </div>
  );
}
