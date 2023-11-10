import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import axios from "axios";
import React, { useCallback, useMemo } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.delete("/api/favorites", { data: { movieId } });
    } else {
      response = await axios.post("/api/favorites", { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? MdFavorite : MdFavoriteBorder;

  return (
    <div
      onClick={toggleFavorites}
      className="group/item flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition lg:h-10 lg:w-10"
    >
      <Icon
        className="w-4 text-white group-hover/item:text-neutral-300 lg:w-6"
        size={30}
      />
    </div>
  );
};

export default FavoriteButton;
