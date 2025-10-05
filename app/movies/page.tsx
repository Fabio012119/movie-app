import { cookies } from "next/headers";
import Link from "next/link";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import { BASE } from "@/utils/general";
import type { MoviesResponse } from "@/types/movie";

async function fetchMovies(
  page: number,
  token?: string,
): Promise<MoviesResponse | null> {
  const PER_PAGE = 8;
  const url = `${BASE}/movies?page=${page}&limit=${PER_PAGE}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) return null;
  return res.json();
}

export const dynamic = "force-dynamic";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const token = (await cookies()).get("auth_token")?.value;
  const data = await fetchMovies(page, token);
  if (!data)
    return (
      <section className="p-6 text-center">Failed to load movies.</section>
    );

  return (
    <main className="space-y-4">
      <Header />
      <section className="p-8">
        <h1 className="text-2xl font-bold">Movies</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10">
          {data.movies.map((m) => (
            <MovieCard key={m.id} movie={m} isFav={m.favorite} />
          ))}
        </div>

        <nav className="flex items-center justify-center gap-2">
          {Array.from(
            { length: data.pagination.totalPages },
            (_, i) => i + 1,
          ).map((p) => (
            <Link
              key={p}
              href={`/movies?page=${p}`}
              className={`rounded-md border px-3 py-1 text-sm ${p === page ? "bg-red-500 text-white" : "hover:bg-neutral-50 hover:text-black"}`}
            >
              {p}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
