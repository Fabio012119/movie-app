//Components
import MovieCard from "./MovieCard";

//Types
import type { MoviesResponseData } from "@/types/props";

export default function MoviesList({ data }: MoviesResponseData) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-10">
      {data.movies.map((m) => (
        <MovieCard key={m.id} movie={m} isFav={m.favorite} />
      ))}
    </div>
  );
}
