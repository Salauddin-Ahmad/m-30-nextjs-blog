import BlogCard from "@/components/modules/homepage/BlogCard";
import { Button } from "@/components/ui/button";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.type";
import { use } from "react";

export default async function Home() {
  const { data } = await blogService.getBlogPost();

  console.log(data.result);
  return (
    <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto px-4">
      {data?.result?.data?.map((post: BlogPost) => (
        <BlogCard post={post} key={post.id}></BlogCard>
      ))}
    </div>
  );
}
