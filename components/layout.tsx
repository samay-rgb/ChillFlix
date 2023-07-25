import Navbar from "./navbar";
import { ReactNode, useState } from "react";
import useEffectOnce from "../hooks/useEffectOnce";

export default function Layout({ children }: { children: ReactNode }) {
  const [movieList, setMovieList] = useState([]);
  const getMovieList = async () => {
    const res = await fetch(
      "https://movie-recommender-backend-g.onrender.com/movielist"
    );
    const data = await res.json();
    setMovieList(data);
    // return data;
  };
  useEffectOnce(() => {
    getMovieList();
    // console.log(movieList);
  });
  return (
    <>
      <Navbar movieList={movieList} />
      {/* <Header /> */}
      <main>{children}</main>
    </>
  );
}
