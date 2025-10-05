//Utils
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { fetchMovieById } from "@/api/fetchMovieById";
import generateMovieMetadata from "@/utils/movieMetadata";

//Components
import MovieDescription from "@/components/Movie/Movie";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const token = (await cookies()).get("auth_token")?.value;
  const id = Number(params.id);
  if (!token) return { title: "Login required" };
  if (!Number.isFinite(id)) return { title: "Movie not found" };
  const m = await fetchMovieById(id, token);
  generateMovieMetadata(m);
}

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

  return <MovieDescription movie={m} />;
}
