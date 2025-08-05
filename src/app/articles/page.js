import Link from "next/link"
import articles from "@/data/articles"

export default function ArticlesPage() {
  return (
    <main className="container py-5">
      <h1 className="mb-4">Nos Articles</h1>
      <div className="row">
        {articles.map((article) => (
          <div className="col-md-4 mb-4" key={article.id}>
            <div className="card h-100">
              <img
                src={`/images/${article.image}`}
                className="card-img-top"
                alt={article.title}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <Link href={`/articles/${article.id}`} className="btn btn-primary mt-2">
                  Lire l&apos;article
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
