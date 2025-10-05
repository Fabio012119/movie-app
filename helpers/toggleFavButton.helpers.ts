import { cn } from "@/utils/general";

export const btnClass = (isInMovieDetails: boolean, optimisticFav: boolean) => {
  return cn(
    "rounded-md cursor-pointer border px-3 py-2 text-sm",
    isInMovieDetails ? "min-md:w-[25%]" : "w-full",
    optimisticFav ? "bg-amber-100" : "bg-neutral-300",
  );
};
