import React from "react";
import { AiFillPlayCircle } from "react-icons/ai";

import { useRouter } from "next/router";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();

  return (
    <>
      <button
        className="flex w-auto flex-row items-center rounded-md bg-white px-2 py-1 text-xs font-semibold transition hover:bg-neutral-300 md:px-4 md:py-2 lg:text-lg"
        onClick={() => router.push(`/watch/${movieId}`)}
      >
        <AiFillPlayCircle className="mr-2" size={20} />
        Play
      </button>
    </>
  );
};

export default PlayButton;
