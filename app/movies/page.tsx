//Utils
import { cookies } from "next/headers";
import { fetchMovies } from "@/api/fetchMovies";

//Components
import Pagination from "@/components/Pagination/Pagination";
import MoviesList from "@/components/Movie/MoviesList";
import Header from "@/components/Headers/Header";

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
        <MoviesList data={data} />
        <Pagination data={data} page={page} />
      </section>
    </main>
  );
}
