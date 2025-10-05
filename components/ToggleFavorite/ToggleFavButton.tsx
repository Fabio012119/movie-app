//Utils
import { toggleFavorite } from "@/api/toggleFavorite";

//Types
import type { Movie } from "@/types/movie";

export default function ToggleFavoriteButton({
  movie,
  isFav,
  isInMovieDetails,
}: {
  movie: Movie;
  isFav: boolean;
  isInMovieDetails: boolean;
}) {
  return (
    <form action={toggleFavorite} className="pt-2 text-black">
      <input type="hidden" name="movieId" value={String(movie.id)} />
      <input type="hidden" name="isFav" value={isFav ? "1" : "0"} />
      <button
        className={`${isInMovieDetails ? "min-md:w-[25%]" : "w-full"} rounded-md cursor-pointer border px-3 py-2 text-sm ${isFav ? "bg-amber-100" : "bg-neutral-300"}`}
        type="submit"
      >
        {isFav ? "Remove from favorites" : "Add to favorites"}
      </button>
    </form>
  );
}
