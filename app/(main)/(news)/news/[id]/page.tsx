import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSingleNews } from "@/services/news.services";
import Image from "next/image";

export default async function NewsArticle({
  params,
}: {
  params: { id: string };
}) {
  const article = await getSingleNews(params.id as string);

  if (!article?.data) {
    return <div>Article not found</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/news"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to News
        </Link>

        <article className="max-w-3xl mx-auto">
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={article?.data?.image}
              alt={article?.data?.title}
              className="object-cover w-full h-full"
              fill
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                {article?.data?.category}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="md:text-4xl text-xl font-bold mb-4">
              {article?.data?.title}
            </h1>
            <div className="text-sm text-muted-foreground">
              {new Date(article?.data?.createdAt).toLocaleDateString()}
            </div>
          </div>
          <div>
            <p>{article?.data?.excerpt}</p>
          </div>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article?.data?.content }}
          />
        </article>
      </div>
    </div>
  );
}
