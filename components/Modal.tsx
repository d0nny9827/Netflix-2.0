import { modalState, movieState } from "@/atoms/modalAtom";
import { Element, Genre } from "@/typings";
import {
  PlusIcon,
  XMarkIcon,
  HandThumbUpIcon,
  SpeakerXMarkIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReactPlayer from "react-player/lazy";
import { FaPlay, FaVolumeMute } from "react-icons/fa";

export default function Modal() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trailer, setTrailer] = useState("");
  const [muted, setMuted] = useState(false);

  const [movie, setMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((res) => res.json());

      if (data?.videos) {
        const index = data?.videos?.results?.findIndex(
          (index: Element) => index.type === "Trailer"
        );
        const key = data?.videos?.results[index]?.key;
        setTrailer(key);
      }
      if (data?.genres) {
        setGenres(data?.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <>
      <MuiModal
        open={showModal}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50
      mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <>
          <button
            onClick={handleClose}
            className="modalButton absolute right-5 top-5 !z-40
        border-none h-9 w-9 bg-[#181818] hover:bg-[#181818]"
          >
            <XMarkIcon className="w-6" />
          </button>

          <div className="relative pt-[56.25%]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailer || `znX2lhAiuxM`}`}
              width="100%"
              height="100%"
              style={{ position: "absolute", top: "0", left: "0" }}
              playing
              muted={muted}
            />
            <div className="absolute bottom-10 flex items-center justify-between px-10 w-full ">
              <div className="flex space-x-2">
                <button
                  className="flex items-center gap-x-2 rounded bg-white text-black
                px-8 text-xl font-bold transition hover:bg-[#e6e6e6]"
                >
                  <FaPlay className="w-7 h-7" />
                  Play
                </button>
                <button className="modalButton">
                  <PlusIcon className="w-7 h-7" />
                </button>
                <button className="modalButton">
                  <HandThumbUpIcon className="w-7 h-7" />
                </button>
              </div>

              <button className="modalButton" onClick={() => setMuted(!muted)}>
                {muted ? (
                  <SpeakerXMarkIcon className="w-6" />
                ) : (
                  <SpeakerWaveIcon className="w-6" />
                )}
              </button>
            </div>
          </div>

          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-emerald-400">
                  {(movie?.vote_average * 10).toFixed(2)}% Match
                </p>
                <p className="font-light">
                  {movie?.release_date || movie?.first_air_date}
                </p>
                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                  HD
                </div>
              </div>

              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{movie?.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres : </span>
                    {genres?.map((genre) => genre.name).join(", ")}
                  </div>

                  <div>
                    <span className="text-[gray]">Original Language : </span>
                    {movie?.original_language.toUpperCase()}
                  </div>

                  <div>
                    <span className="text-[gray]">Total votes : </span>
                    {movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </MuiModal>
    </>
  );
}
