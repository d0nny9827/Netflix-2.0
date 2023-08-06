import { Movie } from "@/typings";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef } from "react";
import Thumbnail from "./Thumbnail";
interface Props {
  title: string;
  movies: Movie[];
}

export default function Row({ title, movies }: Props) {
  const [isMoved, setIsMoved] = useState(false);

  const rowRef = useRef<HTMLDivElement>(null);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      console.log(rowRef);

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2
        className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200
      hover:text-white md:text-2xl"
      >
        {title}
      </h2>

      <div className="group relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`scrollArrowIcon left-2 ${!isMoved && "hidden"}`}
        />

        <div
          ref={rowRef}
          className=" flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail movie={movie} key={movie.id} />
          ))}
        </div>

        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className="scrollArrowIcon right-2"
        />
      </div>
    </div>
  );
}
