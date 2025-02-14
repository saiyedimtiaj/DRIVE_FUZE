import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSingleBlog } from "@/services/blog.services";
import Image from "next/image";

export default async function BlogPost({ params }: { params: { id: string } }) {
  const post = await getSingleBlog(params?.id as string);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={post?.data?.image}
              alt={post?.data?.title}
              className="object-cover w-full h-full"
              fill
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                {post?.data?.category}
              </span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post?.data?.title}</h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span>{post?.data?.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post?.data?.date).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>{post?.data?.readTime}</span>
            </div>
          </div>
          <div>
            <p>{post?.data?.excerpt}</p>
          </div>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post?.data?.content }}
          />
        </article>
      </div>
    </div>
  );
}
