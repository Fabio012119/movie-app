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
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams?.page || 1));
  const token = (await cookies()).get("auth_token")?.value;
  const data = await fetchMovies(page, token);
  if (!data) return <section className="p-6">Failed to load movies.</section>;

  const isAuthed = !!token;
  const favMap = new Map<number, boolean>();
  for (const m of data.movies) {
    favMap.set(m.id, !!m.isFavorite);
  }

  return (
    <main className="space-y-4">
      <Header />
      <section className="p-4">
        <h1 className="text-2xl font-bold">Movies</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10">
          {data.movies.map((m) => (
            <MovieCard
              key={m.id}
              movie={m}
              isFav={!!favMap.get(m.id)}
              isAuthed={isAuthed}
            />
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
              className={`rounded-md border px-3 py-1 text-sm ${p === page ? "bg-black text-white" : "hover:bg-neutral-50"}`}
            >
              {p}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
