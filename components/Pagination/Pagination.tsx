//Components
import Link from "next/link";

//Types
import type { PaginationProps } from "@/types/props";

export default function Pagination({ data, page }: PaginationProps) {
  return (
    <nav className="flex items-center justify-center gap-2">
      {Array.from({ length: data.pagination.totalPages }, (_, i) => i + 1).map(
        (p) => (
          <Link
            key={p}
            href={`/movies?page=${p}`}
            className={`rounded-md border px-3 py-1 text-sm ${p === page ? "bg-red-500 text-white" : "hover:bg-neutral-50 hover:text-black"}`}
          >
            {p}
          </Link>
        ),
      )}
    </nav>
  );
}
