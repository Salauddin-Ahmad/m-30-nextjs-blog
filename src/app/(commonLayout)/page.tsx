import BlogCard from "@/components/modules/homepage/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.type";

export default async function Home() {
  const { data } = await blogService.getBlogPost(
    {
      // isFeatured: , /boolean
      search: "", //search by title
    },
    {
      cache: "no-store",
    },
  );
  return (
    <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto px-4">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard post={post} key={post.id}></BlogCard>
      ))}
    </div>
  );
}
