import React from "react";
import Link from "next/link";

import Rating from "@components/Rating/Rating";
import { IMovie } from "types";
import dayjs from "dayjs";

interface Props {
  movie: IMovie;
  isLast: boolean;
}

// Movie on the homepage
const Movie = ({
  movie: {
    id,
    title,
    original_title,
    poster_path,
    release_date,
    release_date_readable,
    vote_average,
    genres,
  },
  isLast,
}: Props) => {
  return (
    <div className={`mt-8 space-y-2 ${isLast && "pr-8 md:pr-0 "}`}>
      <Link href={`/film/${id}`}>
        <a className="block relative flex flex-col">
          <h5 className="text-sm  text-gray-500 hover:text-gray-500 sm:text-left truncate ... ">
            {original_title}
          </h5>
          <h2
            title={title}
            className="text-xl  text-gray-300 hover:text-gray-500 sm:text-left truncate ... "
          >
            {title}
          </h2>
        </a>
      </Link>
      <Link href={`/film/${id}`}>
        <a className="block w-48 sm:w-auto sm:h-auto">
          <img
            className="object-cover w-full rounded h-96"
            src={poster_path}
            alt={title}
          />
        </a>
      </Link>
      <div
        className="grid items-center h-20"
        style={{ gridTemplateColumns: "auto 3fr" }}
      >
        <div className="text-center mt-2 pl-3 pr-5">
          <div className="text-gray-400 text-xs">Puan</div>
          <Rating rating={vote_average} />
        </div>

        <div>
          <div className="text-md leading-relaxed text-gray-300 ">
            <small className="opacity-75 text-xs">Çıkış tarihi</small>
            <div className="-mt-1">{release_date_readable}</div>
          </div>
          <div className="text-sm">
            {genres.length > 0 ? (
              <p className="text-gray-400">{genres.slice(0, 3).join(", ")}</p>
            ) : (
              <p className="text-gray-500">Genel</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
