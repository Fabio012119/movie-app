import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { BASE } from "@/utils/general";
import Image from "next/image";
import type { Movie } from "@/types/movie";

async function fetchMovieById(
  id: number,
  token: string,
): Promise<Movie | null> {
  const url = `${BASE}/movies/${id}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    redirect(`/login?next=/movies/${id}`);
  }
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const token = (await cookies()).get("auth_token")?.value;
  const id = Number(params.id);
  if (!token) return { title: "Login required" };
  if (!Number.isFinite(id)) return { title: "Movie not found" };

  const m = await fetchMovieById(id, token);
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

export const dynamic = "force-dynamic";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const token = (await cookies()).get("auth_token")?.value;
  const id = Number(params.id);

  if (!token) redirect(`/login?next=/movies/${params.id}`);
  if (!Number.isFinite(id)) notFound();

  const m = await fetchMovieById(id, token);
  if (!m) notFound();

  return (
    <article className="space-y-4">
      <Link
        href="/movies"
        className="inline-block fixed rounded-md border px-3 py-1 text-sm hover:bg-neutral-50 hover:text-black"
      >
        ← Back to list
      </Link>
      <div className="flex flex-col">
        <Image
          width={1920}
          height={1080}
          src={m.poster}
          alt={m.title}
          className="h-[80lvh] w-full rounded-lg object-cover"
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
        </div>
      </div>
    </article>
  );
}
