"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
  totalPages: number;
};

export default function Pagination({ totalPages }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2 text-sm">
      {/* ← Prev */}
      <Link
        href={createPageURL(currentPage - 1)}
        className="rounded border px-3 py-1 hover:bg-muted disabled:opacity-50"
        aria-disabled={currentPage <= 1}
        tabIndex={currentPage <= 1 ? -1 : 0}
      >
        ← Prev
      </Link>

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        const isActive = currentPage === page;

        return (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`rounded border px-3 py-1 ${
              isActive
                ? "border-primary bg-primary text-white"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next → */}
      <Link
        href={createPageURL(currentPage + 1)}
        className="rounded border px-3 py-1 hover:bg-muted disabled:opacity-50"
        aria-disabled={currentPage >= totalPages}
        tabIndex={currentPage >= totalPages ? -1 : 0}
      >
        Next →
      </Link>
    </div>
  );
}
