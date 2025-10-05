//Utils
import generateMovieMetadata from "@/utils/movieMetadata";
import { fetchMovieById } from "@/api/fetchMovieById";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

//Components
import MovieDescription from "@/components/Movie/Movie";

//Types
import type { MovieDetailsParams } from "@/types/general";

export async function generateMetadata({ params }: MovieDetailsParams) {
  const [{ id }, token] = await Promise.all([
    params,
    cookies().then((c) => c.get("auth_token")?.value ?? null),
  ]);

  if (!token) return { title: "Login required" };

  const numId = Number(id);
  if (!Number.isFinite(numId)) return { title: "Movie not found" };

  const m = await fetchMovieById(numId, token);
  return generateMovieMetadata(m);
}

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const [{ id }, token] = await Promise.all([
    params,
    cookies().then((c) => c.get("auth_token")?.value ?? null),
  ]);

  if (!token) redirect(`/login?next=/movies/${params.id}`);

  const m = await fetchMovieById(Number(id), token);
  if (!m) notFound();

  return <MovieDescription movie={m} />;
}
