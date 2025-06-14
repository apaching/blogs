"use client";

import { signOut } from "@/lib/auth";
import { PenTool } from "lucide-react";
import { useRouter } from "next/navigation";

export function NavBar() {
  const router = useRouter();

  const handleLogout = () => {
    signOut();

    router.replace("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-primary px-6 py-4 md:px-12 lg:px-86">
      <div className="flex items-center gap-2 text-primary-foreground">
        <PenTool className="h-6 w-6" />
        <h1 className="text-xl font-bold">Blogs</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          className="cursor-pointer rounded px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-card/30"
          onClick={() => router.push("/create-blog")}
        >
          <p className="font-semibold text-primary-foreground">Create</p>
        </div>
        <div
          className="cursor-pointer rounded bg-card px-3 py-1 transition-colors duration-200 ease-in-out hover:bg-card/80"
          onClick={handleLogout}
        >
          <p className="font-semibold text-card-foreground">Logout</p>
        </div>
      </div>
    </nav>
  );
}
