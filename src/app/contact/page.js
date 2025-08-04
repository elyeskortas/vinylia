export const metadata = {
  title: 'Nous contacter - Vinylia',
};

export default function Contact() {
  return (
    <main className="container py-5">
      <h1 className="mb-4 text-uppercase">Contactez-nous</h1>
      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nom</label>
          <input type="text" className="form-control" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="col-12">
          <label className="form-label">Message</label>
          <textarea className="form-control" rows="5"></textarea>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-dark">Envoyer</button>
        </div>
      </form>
    </main>
  );
}
