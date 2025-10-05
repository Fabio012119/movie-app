import Link from "next/link";
import Image from "next/image";
import type { Movie } from "@/types/movie";

export default function MovieDescription({ movie }: { movie: Movie }) {
  const { poster, title, year, genre, director, description, rating } = movie;
  return (
    <article className="space-y-4">
      <Link
        href="/movies"
        className="inline-block fixed rounded-md border px-3 py-1 text-sm hover:bg-neutral-50 hover:text-black"
      >
        ← Back to list
      </Link>
      <div className="flex flex-col">
        <Image
          width={1920}
          height={1080}
          src={poster}
          alt={title}
          className="h-[80lvh] w-full rounded-lg object-cover"
        />
        <div className="space-y-5 p-4">
          <h1 className="text-3xl font-bold">
            {title}
            <span className="text-neutral-500 font-normal">({year})</span>
          </h1>
          <p className="text-neutral-700">
            {genre} • Directed by {director} • ⭐ {rating.toFixed(1)}
          </p>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}
