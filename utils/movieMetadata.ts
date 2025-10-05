import type { Movie } from "@/types/movie";

export default function generateMovieMetadata(m: Movie | null) {
  if (!m) return { title: "Movie not found" };

  return {
    title: `${m.title} (${m.year})`,
    description: m.description,
    openGraph: {
      title: `${m.title} (${m.year})`,
      description: m.description,
      images: [{ url: m.poster }],
      type: "video.movie",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: [m.poster],
    },
  };
}
