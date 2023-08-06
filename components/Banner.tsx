import { baseUrl } from "@/constants/movie";
import { Movie } from "@/typings";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

interface Props {
  netflixOriginals: Movie[];
}

export default function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    );
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          alt="Movie Poster"
        />
      </div>

      <h1 className="text-2xl md:text-7xl lg:text-7xl font-bold text-shadow-xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl text-shadow-xl">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerBtn bg-white text-black">
          <FaPlay className="w-4 text-black md:w-7" />
          Play
        </button>
        <button className="bannerBtn bg-[gray]/70">
          More Info
          <InformationCircleIcon className="w-5 md:w-8" />
        </button>
      </div>
    </div>
  );
}
