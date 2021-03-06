import React from "react";
import { GetStaticProps } from "next";

import api from "@api/index";
import Meta from "@components/Meta/Meta";
import Tv from "@components/Tv/Tv";
import DataCache from "@util/DataCache";
import { transformTv } from "@util/transform";
import { ITV } from "types";

const genresCache = new DataCache(api.genres, false, 60 * 24);
const popularTvCache = new DataCache(api.popularTv, false, 10);
const topRatedTvCache = new DataCache(api.topRatedTv, false, 10);

export const getStaticProps: GetStaticProps = async () => {
  const [genresResponse, popularTvResponse, topRatedTvResponse] =
    await Promise.all([
      genresCache.getData(),
      popularTvCache.getData(),
      topRatedTvCache.getData(),
    ]);
  const [movieGenres, tvGenres] = genresResponse;
  const genres = [...movieGenres.genres, ...tvGenres.genres];
  const popularTv = popularTvResponse.results.map(transformTv(genres));
  const topRatedTv = topRatedTvResponse.results.map(transformTv(genres));

  return { props: { popularTv, topRatedTv }, revalidate: 3600 };
};

const TvIndex = ({ popularTv, topRatedTv }) => {
  if (!popularTv && !topRatedTv) return null;

  return (
    <>
      <Meta title="Diziler" />
      <h1 className="px-4 text-2xl font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        Popüler Diziler
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch md:w-full sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0">
        {popularTv.map((tv: ITV, index: number) => (
          <Tv key={tv.id} tv={tv} isLast={index === popularTv.length - 1} />
        ))}
      </div>

      <h1 className="px-4 mt-20 text-2xl font-semibold tracking-wider text-orange-500 uppercase sm:px-0">
        En Sevilen Diziler
      </h1>
      <div className="flex w-screen p-4 space-x-8 overflow-x-scroll scrolling-touch sm:p-0 sm:overflow-hidden sm:grid sm:gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 sm:space-x-0 md:w-full">
        {topRatedTv.map((tv: ITV, index: number) => (
          <Tv key={tv.id} tv={tv} isLast={index === popularTv.length - 1} />
        ))}
      </div>
    </>
  );
};

export default TvIndex;
