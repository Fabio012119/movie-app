import { useTransition, useOptimistic, useCallback } from "react";
import { toggleFavorite } from "@/api/toggleFavorite";

export const useToggleFavorite = (isFav: boolean) => {
  const [pending, startTransition] = useTransition();

  const [optimisticFav, setOptimisticFav] = useOptimistic<boolean, boolean>(
    isFav,
    (_prev, next) => next,
  );

  const handleAction = useCallback(
    (fd: FormData) => {
      startTransition(async () => {
        setOptimisticFav(!optimisticFav);
        try {
          await toggleFavorite(fd);
        } catch {
          setOptimisticFav(isFav);
        }
      });
    },
    [optimisticFav, isFav, setOptimisticFav],
  );

  return { handleAction, pending, optimisticFav };
};
