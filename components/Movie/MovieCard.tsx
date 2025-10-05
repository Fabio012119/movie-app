//Components
import Link from "next/link";
import Image from "next/image";
import ToggleFavoriteButton from "../ToggleFavorite/ToggleFavButton";

//Types
import type { MovieCardProps } from "@/types/props";

export default function MovieCard({ movie, isFav }: MovieCardProps) {
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
      <ToggleFavoriteButton
        movie={movie}
        isFav={isFav}
        isInMovieDetails={false}
      />
    </article>
  );
}
