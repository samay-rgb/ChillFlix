import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MovieItems from "../components/movieItems";
import classes from "./index.module.css";
import Layout from "../components/layout";
export default function SearchResults() {
  const router = useRouter();
  const param = router.query;
  const movie = param.movie;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const getMovies = async (movie: any) => {
    let recom = await fetch(
      "https://movie-recommender-backend-g.onrender.com/search/" + movie
    );
    let recomjson = await recom.json();
    setMovies(recomjson);
    setLoading(false);
  };
  useEffect(() => {
    getMovies(movie);
  }, [movie, param]);

  if (loading) {
    return (
      <div style={{ padding: "1rem 1.5rem" }}>
        <h1 style={{ color: "white" }}>Loading...</h1>
      </div>
    );
  }

  return (
    <Layout>
      <h1 style={{ color: "white", textAlign: "center" }}>Search Results</h1>
      <div className={classes.container}>
        {movies.map((item, idx) => {
          return <MovieItems movieitem={item} key={idx} />;
        })}
      </div>
    </Layout>
  );
}
