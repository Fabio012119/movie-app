"use client";

//Hooks
import { useToggleFavorite } from "@/hooks/useToggleFavorite";

//helpers
import { btnClass } from "@/helpers/toggleFavButton.helpers";

//Types
import type { ToggleFavoriteButtonProps } from "@/types/props";

export default function ToggleFavoriteButton({
  movie,
  isFav,
  isInMovieDetails,
}: ToggleFavoriteButtonProps) {
  const { handleAction, pending, optimisticFav } = useToggleFavorite(isFav);

  return (
    <form action={handleAction} className="pt-2 text-black">
      <input type="hidden" name="movieId" value={String(movie.id)} />
      <input type="hidden" name="isFav" value={optimisticFav ? "1" : "0"} />

      <button
        type="submit"
        disabled={pending}
        className={btnClass(isInMovieDetails, optimisticFav)}
      >
        {pending
          ? "Saving..."
          : optimisticFav
            ? "Remove from favorites"
            : "Add to favorites"}
      </button>
    </form>
  );
}
