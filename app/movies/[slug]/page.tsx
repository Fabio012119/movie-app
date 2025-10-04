import { cookies } from "next/headers";
import Link from "next/link";
import { toggleFavorite } from "@/app/actions";
import { slugify } from "@/utils/slugify";
import { BASE } from "@/utils/general";
import type { Movie, MoviesResponse } from "@/types/movie";

async function fetchMovies(limit: number, token?: string): Promise<Movie[]> {
  const url = `${BASE}/movies?page=1&limit=${limit}`;
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = (await res.json()) as MoviesResponse;
  return data.movies;
}

async function fetchMovieBySlug(
  slug: string,
  token?: string,
): Promise<Movie | null> {
  const all = await fetchMovies(100, token);
  return all.find((m) => slugify(m.title) === slug) ?? null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const token = (await cookies()).get("auth_token")?.value;
  const m = await fetchMovieBySlug(params.slug, token);
  if (!m) return { title: "Movie not found" };
  return {
    title: `${m.title} (${m.year})`,
    description: m.description,
    openGraph: {
      title: `${m.title} (${m.year})`,
      description: m.description,
      images: [{ url: m.poster }],
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [m.poster],
    },
  };
}

export default async function MovieDetail({
  params,
}: {
  params: { slug: string };
}) {
  const token = (await cookies()).get("auth_token")?.value;
  const m = await fetchMovieBySlug(params.slug, token);
  if (!m) {
    return (
      <p className="p-6">
        Not found.{" "}
        <Link className="underline" href="/movies">
          Back to list
        </Link>
      </p>
    );
  }
  const isAuthed = !!token;
  const isFav = !!m.isFavorite;

  return (
    <article className="space-y-4">
      <Link
        href="/movies"
        className="inline-block rounded-md border px-3 py-1 text-sm hover:bg-neutral-50"
      >
        ← Back to list
      </Link>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px,1fr]">
        <img
          src={m.poster}
          alt={m.title}
          className="h-80 w-full rounded-lg object-cover md:h-full"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            {m.title}{" "}
            <span className="text-neutral-500 font-normal">({m.year})</span>
          </h1>
          <p className="text-neutral-700">
            {m.genre} • Directed by {m.director} • ⭐ {m.rating.toFixed(1)}
          </p>
          <p>{m.description}</p>

          {isAuthed && (
            <form action={toggleFavorite} className="pt-2">
              <input type="hidden" name="movieId" value={String(m.id)} />
              <input type="hidden" name="isFav" value={isFav ? "1" : "0"} />
              <button
                className={`rounded-md border cursor-pointer px-3 py-2 text-sm ${isFav ? "bg-amber-100" : "hover:bg-neutral-50"}`}
                type="submit"
              >
                {isFav ? "Remove from favorites" : "Add to favorites"}
              </button>
            </form>
          )}
        </div>
      </div>
    </article>
  );
}
