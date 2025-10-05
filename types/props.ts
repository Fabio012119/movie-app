import type { Movie, MoviesResponse } from "./movie";

export type FormInputs = { type: "username" | "password" };

export type MoviesResponseData = { data: MoviesResponse };

export type MovieDescriptionProps = { movie: Movie };

export type PaginationProps = MoviesResponseData & { page: number };

export type isFav = { isFav: boolean };

export type MovieCardProps = MovieDescriptionProps & isFav;

export type isInMovieDetails = { isInMovieDetails: boolean };

export type ToggleFavoriteButtonProps = MovieDescriptionProps &
  isFav &
  isInMovieDetails;

export type LoginPageProps = {
  searchParams: { error?: string; next?: string };
};

export type MovieDetailsParams = { params: { id: string } };

export type MoviesPageParams = {
  searchParams: { page?: string };
};
