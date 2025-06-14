export interface User {
  id: string;
  full_name: string;
}

export interface Blog {
  id: string;
  user_id: string;
  title: string;
  description: string;
  content: string;
}

export type NewBlog = Omit<Blog, "id">;
export type UpdateBlog = Omit<Blog, "user_id">;
