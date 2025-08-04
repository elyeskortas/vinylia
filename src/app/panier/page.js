"use client";
import { useCart } from "@/context/cart-context";

export default function PanierPage() {
  const { cartItems, total, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) return <main className="container py-5"><h2>Ton panier est vide</h2></main>;

  return (
    <main className="container py-5">
      <h2 className="mb-4">Mon Panier</h2>
      <button className="btn btn-danger mb-3" onClick={clearCart}>Vider le panier</button>
      <table className="table">
        <thead>
          <tr><th>Produit</th><th>Quantité</th><th>Prix</th><th>Total</th><th></th></tr>
        </thead>
        <tbody>
          {cartItems.map((i) => (
            <tr key={i.id}>
              <td>{i.title}</td>
              <td>{i.quantity}</td>
              <td>${i.price.toFixed(2)}</td>
              <td>${(i.price * i.quantity).toFixed(2)}</td>
              <td><button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(i.id)}>Supprimer</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total : ${total.toFixed(2)}</h3>
      <button className="btn btn-success">Passer à la commande</button>
    </main>
  );
}
