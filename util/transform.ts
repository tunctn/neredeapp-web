import format from "date-fns/format";
import { IMovie, ITV, IActor, ICast } from "types";
import dayjs from "dayjs";
import differenceInYears from "date-fns/differenceInYears";
import _ from "lodash";
import Url from "url-parse";

import { uniqBy } from "@util/index";
const getGenres = (genres, object) => {
  const genresArray =
    genres
      .filter((genre) => object?.genre_ids?.includes(genre.id))
      .map((genre) => genre.name) || [];

  return _.uniq(genresArray);
};

export const transformMovie = (genres: any) => (movie: IMovie) => {
  const genreList = getGenres(genres, movie);
  return {
    ...movie,
    short_title:
      movie.title.length > 50
        ? movie.title.substring(0, 50) + "..."
        : movie.title,
    release_date: movie.release_date,
    release_date_readable: dayjs(movie.release_date).format("DD MMMM YYYY"),
    backdrop_path: movie.backdrop_path
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : null,
    poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    genres: genreList,
    trailer:
      movie.videos?.results.find((video) => video.type === "Trailer")?.key ||
      "",
    credits: movie.credits
      ? {
          ...movie.credits,
          cast: movie.credits.cast.slice(0, 5),
        }
      : null,
    vote_average: movie.vote_average,
  };
};

export const transformTv = (genres: any) => (tv: ITV) => {
  const genreList = getGenres(genres, tv);
  return {
    ...tv,
    short_title:
      tv.name.length > 20 ? tv.name.substring(0, 20) + "..." : tv.name,
    release_date: tv.first_air_date,
    release_date_readable: dayjs(tv.first_air_date).format("DD MMMM YYYY"),
    poster_path: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    genres: genreList,
  };
};

export const transformProviders = (providers: any) => {
  if (!providers || providers.length === 0) return [];
  const count = providers.count;
  const country = providers.country;

  const providerList = providers.providers.map((url: string) => {
    const urlParsed = new Url(url, true);
    const host = urlParsed.host;
    let provider_name = "";
    if (host === "www.netflix.com") provider_name = "Netflix";
    if (host === "www.primevideo.com") provider_name = "Prime Video";
    if (host === "www.youtube.com") provider_name = "YouTube Premium";
    if (host === "puhutv.com") provider_name = "PuhuTV";
    if (host === "www.blutv.com") provider_name = "BluTV";
    if (host === "mubi.com") provider_name = "MUBI";
    if (host === "play.google.com") provider_name = "Google Play Movies & TV";
    if (host === "itunes.apple.com") provider_name = "Apple iTunes";
    return {
      host,
      name: provider_name,
      url,
    };
  });

  return {
    count,
    country,
    providers: providerList,
  };
};

export const transformSingleTv = (tv: ITV, tvMedia: any) => {
  return {
    ...tv,
    title: tv.name,
    short_title:
      tv.name.length > 20 ? tv.name.substring(0, 20) + "..." : tv.name,
    release_date: format(new Date(tv.first_air_date), "dd.MM.yyyy"),
    backdrop_path: `https://image.tmdb.org/t/p/original${tv.backdrop_path}`,
    poster_path: `https://image.tmdb.org/t/p/w500${tv.poster_path}`,
    trailer:
      tv.videos?.results.find((video) => video.type === "Trailer")?.key || "",
    // images: [...tv., ...tvMedia.images],
  };
};

export const transformActor = (actor: IActor) => {
  return {
    ...actor,
    profile_path: actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : `https://dummyimage.com/500x750/cbd5e0/1a202c.png&text=Profile+Image+Not+Found`,
    known_for: actor.known_for?.map((kf) => kf.name || kf.title),
  };
};

export const transformSingleActor = (actor: IActor) => {
  return {
    ...actor,
    profile_path: actor.profile_path
      ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
      : `https://dummyimage.com/500x750/cbd5e0/1a202c.png&text=Profile+Image+Not+Found`,
    birthday_line: actor.birthday
      ? `${format(new Date(actor.birthday), "dd.MM.yyyy")} (${differenceInYears(
          new Date(),
          new Date(actor.birthday)
        )} years old) in ${actor.place_of_birth}`
      : "Sorry, we could not get this information 😔",
    known_for_movies: getKnownForMovies(actor.combined_credits.cast),
    credits: getCredits(actor.combined_credits.cast),
  };
};

function getKnownForMovies(cast: Array<ICast>) {
  const copyCast = Array.from(uniqBy(cast, "id"));
  copyCast.sort((c1, c2) => c2.popularity - c1.popularity);
  return copyCast.slice(0, 5).map((c) => ({
    id: c.id,
    title: c.title || c.name,
    poster_path: c.poster_path,
    popularity: c.popularity,
    link: c.media_type === "movie" ? `/film/${c.id}` : `/dizi/${c.id}`,
  }));
}

function getCredits(cast: Array<ICast>) {
  const copyCast = Array.from(uniqBy(cast, "id"))
    .map((c: ICast) => {
      if (c.first_air_date) {
        return {
          ...c,
          release_date: c.first_air_date,
        };
      }
      return c;
    })
    .filter((c: ICast) => {
      return (
        c.release_date !== undefined &&
        c.release_date !== null &&
        c.release_date !== ""
      );
    });

  copyCast.sort(
    (c1, c2) =>
      new Date(c2.release_date).getTime() - new Date(c1.release_date).getTime()
  );

  return copyCast.map((c) => {
    return {
      id: c.id,
      title: c.title || c.name,
      character: c.character ? ` as ${c.character} ` : "",
      releaseYear: c.release_date
        ? new Date(c.release_date).getFullYear()
        : "Unknown",
      link: c.media_type === "movie" ? `/film/${c.id}` : `/dizi/${c.id}`,
    };
  });
}
