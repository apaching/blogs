import Link from "next/link";
import { Blog } from "@/types/types";
import { UserRound } from "lucide-react";

interface Props {
  author: string;
  blogData: Blog;
}

export function Card({ author, blogData }: Props) {
  return (
    <div className="flex h-full flex-col justify-between space-y-4 rounded-lg border-2 border-primary/10 bg-card p-6">
      <div className="flex flex-col gap-1">
        <h2 className="line-clamp-2 text-xl font-bold text-card-foreground">
          {blogData.title}
        </h2>
        <div className="flex items-center gap-1 text-muted-foreground">
          <UserRound className="h-4 w-4" />
          <p className="text-sm">{author}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm">{blogData.description}</p>
      <div className="mt-auto pt-2">
        <Link href={`/blog/${blogData.id}`}>
          <button className="cursor-pointer rounded bg-primary px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-primary/80">
            <p className="text-sm font-semibold text-primary-foreground">
              Read More
            </p>
          </button>
        </Link>
      </div>
    </div>
  );
}
