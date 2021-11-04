import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ site }) => {
  const router = useRouter();
  return (
    <header className="absolute top-0 left-0 right-0 z-20 ">
      <nav className="shadow-lg">
        <div className="container flex flex-col items-center justify-between px-4 py-6 mx-auto md:flex-row">
          <Link href="/">
            <a className={`flex items-center space-x-2`}>
              <svg
                className="w-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 26 26"
              >
                <path d="M 25 1 L 24 1 L 24 3 L 21 3 L 21 1 L 5 1 L 5 3 L 2 3 L 2 1 L 1 1 C 0.449219 1 0 1.449219 0 2 L 0 24 C 0 24.550781 0.449219 25 1 25 L 2 25 L 2 24 L 5 24 L 5 25 L 21 25 L 21 24 L 24 24 L 24 25 L 25 25 C 25.550781 25 26 24.550781 26 24 L 26 2 C 26 1.449219 25.550781 1 25 1 Z M 5 21 L 2 21 L 2 18 L 5 18 Z M 5 15 L 2 15 L 2 12 L 5 12 Z M 5 9 L 2 9 L 2 6 L 5 6 Z M 24 21 L 21 21 L 21 18 L 24 18 Z M 24 15 L 21 15 L 21 12 L 24 12 Z M 24 9 L 21 9 L 21 6 L 24 6 Z" />
              </svg>

              <div className="text-2xl tracking-wide ">
                <span className="font-bold">nerede</span>
                <span className="font-ligh">.app</span>
              </div>
            </a>
          </Link>
          <ul className="flex items-center flex-1 space-x-4 text-md">
            <li className="mt-3 md:ml-16 md:mt-2">
              <Link href="/">
                <a
                  className={`tracking-wide hover:text-gray-300  ${
                    (router.pathname === "/" ||
                      router.pathname.includes("/film")) &&
                    "font-bold text-orange-500"
                  }`}
                >
                  Filmler
                </a>
              </Link>
            </li>
            <li className="mt-3 md:ml-16 md:mt-2">
              <Link href="/dizi">
                <a
                  className={`tracking-wide hover:text-gray-300  ${
                    router.pathname.includes("/dizi") &&
                    "font-bold text-orange-500"
                  }`}
                >
                  Diziler
                </a>
              </Link>
            </li>
            {/* <li className="mt-3 md:ml-6 md:mt-0">
              <Link href="/actor">
                <a
                  className={`tracking-wide uppercase hover:text-gray-300  ${
                    router.pathname.includes("/actor") &&
                    "font-bold text-orange-500"
                  }`}
                >
                  Actors
                </a>
              </Link>
            </li> */}
          </ul>
          <div className="relative z-50 mt-3 md:mt-0">
            <div className="absolute top-0">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </div>
            <input
              type="search"
              className={`w-64 px-4 py-1 pl-8 text-sm ${
                site === "show"
                  ? "bg-gray-800 md:bg-transparent"
                  : "bg-gray-800"
              } rounded-full focus:outline-none focus:shadow-outline`}
              placeholder="Search"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
