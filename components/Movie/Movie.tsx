//Components
import Link from "next/link";
import Image from "next/image";
import ToggleFavoriteButton from "../ToggleFavorite/ToggleFavButton";

//Types
import type { MovieDescriptionProps } from "@/types/props";

export default function MovieDescription({ movie }: MovieDescriptionProps) {
  const { poster, title, year, genre, director, description, rating } = movie;

  return (
    <article className="space-y-4">
      <Link
        href="/movies"
        data-testid="go-back-btn"
        className="inline-block fixed top-5 left-5 rounded-md border px-3 py-1 text-sm hover:bg-neutral-50 hover:text-black"
      >
        ← Back to list
      </Link>
      <div className="flex flex-col">
        <Image
          width={1920}
          data-testid="movie-poster"
          height={1080}
          src={poster}
          alt={title}
          className="h-[80lvh] w-full rounded-lg object-cover"
        />
        <div className="space-y-5 p-4">
          <h1 className="text-3xl font-bold" data-testid="movie-title">
            {title}
            <span
              className="text-neutral-500 font-normal"
              data-testid="movie-year"
            >
              {year}
            </span>
          </h1>
          <p
            className="text-neutral-700"
            data-testid="movie-genre-director-rating"
          >
            {genre} • Directed by {director} • ⭐ {rating.toFixed(1)}
          </p>
          <p data-testid="movie-description">{description}</p>
          <ToggleFavoriteButton
            movie={movie}
            isFav={movie.favorite}
            isInMovieDetails={true}
          />
        </div>
      </div>
    </article>
  );
}
