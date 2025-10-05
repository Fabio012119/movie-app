import { cookies } from "next/headers";
import { Suspense } from "react";
import { fetchMovies } from "@/api/fetchMovies";

import Header from "@/components/Headers/Header";
import MoviesList from "@/components/Movie/MoviesList";
import Pagination from "@/components/Pagination/Pagination";
import { MoviesListSkeleton } from "@/components/Skeleton/SkeletonList";

import type { MoviesPageParams } from "@/types/props";

export const dynamic = "force-dynamic";

export default async function MoviesPage({ searchParams }: MoviesPageParams) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page || 1));
  const token = (await cookies()).get("auth_token")?.value;

  const dataPromise = fetchMovies(page, token);

  return (
    <main className="space-y-4">
      <Header />
      <section className="p-8">
        <h1 className="text-2xl font-bold">Movies</h1>

        <Suspense fallback={<MoviesListSkeleton />}>
          <MoviesSection dataPromise={dataPromise} page={page} />
        </Suspense>
      </section>
    </main>
  );
}

async function MoviesSection({
  dataPromise,
  page,
}: {
  dataPromise: ReturnType<typeof fetchMovies>;
  page: number;
}) {
  const data = await dataPromise;

  if (!data) {
    return (
      <section className="p-6 text-center">Failed to load movies.</section>
    );
  }

  return (
    <>
      <MoviesList data={data} />
      <Pagination data={data} page={page} />
    </>
  );
}
