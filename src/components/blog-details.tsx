"use client";

import Link from "next/link";
import { Blog } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserRound, Trash2, SquarePen } from "lucide-react";
import { deleteBlog } from "@/actions/actions";

interface Props {
  blog: Blog;
}

export default function BlogDetails({ blog }: Props) {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  const handleDelete = async () => {
    try {
      await deleteBlog(blog.id);

      router.replace("/blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="m-6 flex flex-col md:m-12 lg:mx-134 lg:my-12">
      <button
        onClick={() => router.back()}
        className="mb-6 flex max-w-36 items-center justify-between rounded px-3 py-2 hover:bg-card"
      >
        <ArrowLeft className="h-4 w-4" />
        <p className="text-sm font-semibold">Back to Home</p>
      </button>
      <div className="flex flex-col gap-8 rounded-lg border-2 border-primary/10 bg-card p-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-2xl font-bold text-card-foreground">
              {blog.title}
            </h1>
            {user?.id === blog.user_id ? (
              <div className="flex gap-1">
                <Link href={`/edit/${blog.id}`}>
                  <button className="flex h-9 w-9 items-center justify-center rounded hover:bg-muted">
                    <SquarePen className="h-5 w-5 text-muted-foreground" />
                  </button>
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex h-9 w-9 items-center justify-center rounded hover:bg-muted"
                >
                  <Trash2 className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <UserRound className="h-4 w-4" />
            <p className="text-sm">{user?.full_name}</p>
          </div>
        </div>
        <div className="whitespace-pre-wrap">{blog.content}</div>
      </div>
    </div>
  );
}
