import { notFound } from "next/navigation";
import EditClient from "@/components/edit-client";
import { createClient } from "@/utils/supabase/server";

export default async function Edit({
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

  return <EditClient blog={blog} />;
}
