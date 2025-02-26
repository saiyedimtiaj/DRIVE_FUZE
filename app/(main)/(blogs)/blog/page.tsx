import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getAllBlogsClient } from "@/services/blog.services";
import { TBlog } from "@/type";
import Image from "next/image";

export default async function BlogPage() {
  const blogs = await getAllBlogsClient();
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white py-12">
        <div className="absolute inset-0">
          <div className="absolute right-0 w-1/2 h-full dots-pattern opacity-20"></div>
          <div
            className="absolute right-0 w-3/4 h-full bg-gradient-to-l from-burgundy/10 to-transparent"
            style={{
              background: "linear-gradient(to left, #FFFAF0, transparent)",
            }}
          ></div>
        </div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary mb-4">Blog</h1>
          <p className="text-lg text-primary/80 max-w-2xl">
            Insights, guides, and news about car subscriptions and the
            automotive industry.
          </p>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs?.data?.map((post: TBlog) => (
            <Link key={post?._id} href={`/blog/${post?._id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <div className="relative aspect-video">
                  <Image
                    src={post?.image}
                    alt={post?.title}
                    className="object-cover w-full h-full"
                    fill
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">
                      {post?.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span>{post?.author}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {new Date(post?.createdAt).toLocaleDateString()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{post?.readTime} read</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2">{post?.title}</h2>
                  <p className="text-primary/80 mb-4">
                    {post?.excerpt?.slice(0, 110)}...
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-burgundy hover:text-burgundy/80"
                  >
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
