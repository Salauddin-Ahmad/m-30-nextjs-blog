import { env } from "@/env";

const API_URL = env.API_URL;

export const blogService = {
  getBlogPost: async function () {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const posts = await res.json();
      return { data: posts, error: null };
    } catch (error) {
      console.error("Error blog posts:", error);
      return { data: null, error: { message: "Failed to create blog posts" } };
    }
  },
};
