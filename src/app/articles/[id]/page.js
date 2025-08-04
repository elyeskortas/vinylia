// app/articles/[id]/page.js
import articles from "../../../../data/articles";

export async function generateStaticParams() {
  return articles.map((article) => ({ id: article.id }));
}

export default function ArticlePage({ params }) {
  const article = articles.find((a) => a.id === params.id);

  if (!article) return <p>Article introuvable</p>;

  return (
    <main className="container py-5">
      <h1 className="mb-3">{article.title}</h1>
      <img
        src={`/images/${article.image}`}
        alt={article.title}
        style={{ maxWidth: "600px", width: "100%", objectFit: "cover" }}
        className="mb-4"
      />
      <p>{article.content}</p>
    </main>
  );
}
