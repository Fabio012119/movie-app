//Utils
import { toggleFavorite } from "@/api/toggleFavorite";

//Components
import Link from "next/link";
import Image from "next/image";

//Types
import type { Movie } from "@/types/movie";

export default function MovieCard({
  movie,
  isFav,
}: {
  movie: Movie;
  isFav: boolean;
}) {
  return (
    <article
      className={`overflow-hidden rounded-xl border bg-white space-y-1 p-4 ${isFav ? "ring-2 ring-amber-400" : ""}`}
    >
      <Link href={`/movies/${movie.id}`} className=" text-black block">
        <Image
          width={1920}
          height={1080}
          src={movie.poster}
          alt={movie.title}
          className="h-64 w-full object-cover"
        />
        <h3 className="line-clamp-1 text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-neutral-600">
          {movie.year} • {movie.director}
        </p>
        <p className="text-sm text-neutral-600">
          {movie.genre} • ⭐ {movie.rating.toFixed(1)}
        </p>
        <p className="line-clamp-2 text-sm">{movie.description}</p>
      </Link>
      <form action={toggleFavorite} className="pt-2 text-black">
        <input type="hidden" name="movieId" value={String(movie.id)} />
        <input type="hidden" name="isFav" value={isFav ? "1" : "0"} />
        <button
          className={`w-full rounded-md cursor-pointer border px-3 py-2 text-sm ${isFav ? "bg-amber-100" : "hover:bg-neutral-300"}`}
          type="submit"
        >
          {isFav ? "Remove from favorites" : "Add to favorites"}
        </button>
      </form>
    </article>
  );
}
