import { env } from "@/env";

const API_URL = env.API_URL;


interface GetBlogParams {
  isFeatured?: boolean;
  search: string;
}
interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}
export const blogService = {
  getBlogPost: async function (params?: GetBlogParams, options?: ServiceOptions) {
    try {
      const url = new URL(`${API_URL}/posts`);
      // url.searchParams.append("key", "value");
      
      if (params){
        
        Object.entries(params).forEach(([key, value]) => {
          if(value !== undefined && value !== null && value !== ""){
            url.searchParams.append(key,value)
          }
        })
      }
      const config: RequestInit = {

      }

      if(options?.cache) {
        config.cache = options.cache
      }
      if(options?.revalidate){
        config.next = {revalidate: options.revalidate}
      }
      console.log(url.toString());
      
      
      const res = await fetch(url.toString(), config); //{next: {revalidate: 10}
      const posts = await res.json();
      return { data: posts, error: null };
    } catch (error) {
      console.error("Error blog posts:", error);
      return { data: null, error: { message: "Failed to create blog posts" } };
    }
  },
};
