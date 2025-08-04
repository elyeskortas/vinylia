"use client";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, total, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [error, setError] = useState("");
  const [isPaying, setIsPaying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const cardRegex = /^[0-9]{16}$/;
    if (!cardRegex.test(card)) {
      setError("Numéro de carte invalide. Entrez 16 chiffres.");
      return;
    }

    setIsPaying(true);
    setTimeout(() => {
      clearCart();
      router.push("/confirmation");
    }, 2000);
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Paiement sécurisé</h1>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-12">
          <label className="form-label">Nom du titulaire</label>
          <input
            type="text"
            className="form-control"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-12">
          <label className="form-label">Numéro de carte</label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            required
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />
        </div>

        {error && <div className="text-danger">{error}</div>}

        <div className="col-12">
          <button type="submit" className="btn btn-primary" disabled={isPaying}>
            {isPaying ? "Paiement en cours..." : `Payer ${total.toFixed(2)} €`}
          </button>
        </div>
      </form>
    </div>
  );
}
