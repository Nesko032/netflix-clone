import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

import useBillboard from "@/hooks/useBillboard";

const Billboard = () => {
  const { data } = useBillboard();

  return (
    <>
      <div className="relative h-[56.25vw]">
        <video
          className="h-[56.25vw] w-full object-cover brightness-[60%]"
          src={data?.videoUrl}
          poster={data?.thumbnailUrl}
          autoPlay
          loop
          muted
        ></video>
        <div className=" absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
          <p className="text-1xl h-full w-[50%] font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl">
            {data?.title}
          </p>
          <p className="mt-3 w-[60%] text-justify text-[10px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
            {data?.description}
          </p>
          <div className="mt-3 flex flex-row items-center gap-3 md:mt-4">
            <button className="flex w-auto flex-row items-center rounded-md bg-white bg-opacity-30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-opacity-20 md:px-4 md:py-2 lg:text-lg">
              <AiOutlineInfoCircle className="mr-2 " />
              More Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billboard;
