"use client";

import { useState } from "react";
import { Blog } from "@/types/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { updateBlog } from "@/actions/actions";

interface Props {
  blog: Blog;
}

export default function EditClient({ blog }: Props) {
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: blog.title,
    description: blog.description,
    content: blog.content,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.content) {
      alert("Please fill in needed fields.");
      return;
    }

    try {
      setIsEditing(true);

      await updateBlog({
        id: blog.id,
        title: formData.title,
        description: formData.description,
        content: formData.content,
      });

      router.replace(`/blog/${blog.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <div className="flex w-full flex-col p-6 md:p-12 lg:px-134 lg:py-12">
      <div className="flex flex-col gap-8 rounded-lg border-2 border-primary/10 bg-card p-6">
        <h1 className="text-2xl font-bold text-card-foreground">
          Edit Blog Post
        </h1>
        <form className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-card-foreground">
              Title
            </span>
            <input
              id="title"
              type="text"
              placeholder="Enter blog title"
              className="rounded border border-primary/20 bg-card p-2 text-card-foreground focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-card-foreground">
              Description
            </span>
            <textarea
              id="description"
              placeholder="Write a brief descripton"
              className="min-h-24 rounded border border-primary/20 bg-card p-2 text-card-foreground focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-card-foreground">
              Content
            </span>
            <textarea
              id="content"
              placeholder="Write your blog content here..."
              className="min-h-24 rounded border border-primary/20 bg-card p-2 text-card-foreground focus:border-primary focus:ring-primary focus:outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
              rows={15}
              required
              value={formData.content}
              onChange={handleChange}
            />
          </label>
        </form>
        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            disabled={isEditing}
            className="mt-4 flex items-center justify-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-card-foreground transition-colors duration-200 hover:bg-primary/80 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isEditing ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin text-card-foreground"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>

          <button
            onClick={() => router.back()}
            className="mt-4 rounded bg-white px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors duration-200 hover:bg-white/80"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
