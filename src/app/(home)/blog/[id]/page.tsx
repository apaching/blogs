import { notFound } from "next/navigation";
import BlogDetails from "@/components/blog-details";
import { createClient } from "@/utils/supabase/server";

export default async function Blog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (!blog) return notFound();

  return <BlogDetails blog={blog} />;
}
