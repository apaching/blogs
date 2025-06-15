"use client";

import { useEffect } from "react";
import Pagination from "./pagination";
import { RootState } from "@/store/store";
import { Blog, User } from "@/types/types";
import { Card } from "@/components/blog-card";
import { login } from "@/store/slice/authSlice";
import { setBlogs } from "@/store/slice/blogSlice";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  userData: User;
  blogData: Blog[];
  totalPages: number;
};

export default function BlogClient({ userData, blogData, totalPages }: Props) {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const { blogs } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(login(userData));
  }, [dispatch, userData]);

  useEffect(() => {
    dispatch(
      setBlogs({
        blogs: blogData,
      }),
    );
  }, [dispatch, blogData]);

  return (
    <div className="flex flex-col">
      <div className="mt-6 flex flex-col justify-center px-6 md:px-8 lg:mt-10 lg:px-86">
        <h1 className="text-4xl font-bold text-foreground">
          Hello <span className="text-primary">{user?.full_name}</span>,
        </h1>
        <p className="text-lg text-balance text-muted-foreground">
          Here are your blog posts:
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-3 lg:px-86">
        {blogs.length === 0 ? (
          <p className="text-muted-foreground">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <Card
              key={blog.id}
              author={user?.full_name ?? "Unknown"}
              blogData={blog}
            />
          ))
        )}
      </div>
      <div className="mb-10 flex justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
