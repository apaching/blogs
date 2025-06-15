import BlogClient from "@/components/blog-client";
import { createClient } from "@/utils/supabase/server";

const PAGE_SIZE = 6;

export default async function Home(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const supabase = await createClient();

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const offset = (currentPage - 1) * PAGE_SIZE;

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  const { data: blogData, count } = await supabase
    .from("blogs")
    .select("*", { count: "exact" })
    .eq("user_id", user?.id)
    .order("last_edited", { ascending: false })
    .range(offset, offset + PAGE_SIZE - 1);

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <BlogClient
      userData={userData}
      blogData={blogData || []}
      totalPages={totalPages}
    />
  );
}
