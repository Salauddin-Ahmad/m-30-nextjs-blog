import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { Clock, Eye, MessageSquare, Calendar, Star } from "lucide-react";


// export const revalidate = 60; // Revalidate the page every 60 seconds
// export const dynamicParams = false;
// export const dynamic = "force-static";
// export const fetchCache = "force-no-store";
// export const runtime = "edge";
// export const preferredRegion = "auto";
export const metadata = {
  title: "Blog Post",
  description: "Read our latest blog post",
};

export async function generateStaticParams() {
  const { data } = await blogService.getBlogPost();
  return data?.data
    ?.map((blog: BlogPost) => ({ id: blog.id }))
    .splice(0, 3);
}

export default async function Blogpage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: blog } = await blogService.getBlogById(id);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Estimate reading time (average 200 words per minute)
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header Section */}
        <header className="mb-12 space-y-6">
          {/* Featured Badge */}
          {blog.isFeatured && (
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Star className="h-5 w-5 fill-current" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Featured Article
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            {blog.title}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">{formattedDate}</span>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">
                {readingTime} min read
              </span>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
              <Eye className="h-4 w-4" />
              <span className="text-sm font-medium">{blog.views} views</span>
            </div>

            <div className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-full">
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm font-medium">
                {blog._count?.comments ?? 0} comments
              </span>
            </div>
          </div>
        </header>

        {/* Decorative Separator */}
        <div className="relative mb-12">
          <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-card border border-border/50 rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-lg leading-relaxed text-foreground/90 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left first-letter:leading-none first-letter:mt-1">
              {blog.content}
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="space-y-8">
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-4 py-2 text-sm font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Info Card */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    Join the discussion
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {blog._count?.comments ?? 0} comment
                    {blog._count?.comments !== 1 ? "s" : ""} so far
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
}
