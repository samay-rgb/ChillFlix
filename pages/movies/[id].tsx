import React, { useState, useEffect } from "react";
import ContentLoader from "react-content-loader";
import { NextRouter, useRouter } from "next/router";
import classes from "./movieDetails.module.scss";
import CastMember from "../../components/castMember";
import MovieItems from "../../components/movieItems";
import Layout from "../../components/layout";
import { ParsedUrlQuery } from "querystring";
const api_key = process.env.NEXT_PUBLIC_API_KEY;
type Movie = {
  original_title: string;
  adult: number;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
};
export async function getServerSideProps(params: any) {
  const param = params.query;
  const data1 = await fetch(
    `https://api.themoviedb.org/3/movie/${param.id}?api_key=${api_key}&language=en-US`
  );
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/${param.id}/credits?api_key=${api_key}&language=en-US`
  );

  const datajson = await data.json();
  const datajson1 = await data1.json();
  //console.log(datajson1);
  console.log(param);
  let recom = await fetch(
    "https://movie-recommender-backend-g.onrender.com/similarity/" + param.id
  );
  let recomjson = await recom.json();
  let temp = [];
  for (let i = 0; i < recomjson.length; i++) {
    temp.push(recomjson[i].movie_detail);
  }
  // setMovies(temp);
  const movies = temp;
  let cast = [];
  const m = datajson.cast;
  const m1 = datajson1;
  if (m) cast = m.slice(0, 10);
  // setMovie(m1);
  let movie = m1;
  let genre = "";
  if (m1.genres) {
    for (let i = 0; i < m1.genres.length; i++)
      genre = genre + m1.genres[i].name + " | ";
    genre = genre.substring(0, genre.length - 2);
  }
  return { props: { movies, movie, cast, genre } };
}
export default function MovieDetails(props: any) {
  // console.log(props);
  const [loading, setLoading] = useState(true);
  // const [cast, setCast] = useState<string[]>([]);
  // const [movie, setMovie] = useState<any>([]);
  // const [movies, setMovies] = useState<any>([]);
  const [moviegenre, setMoviegenre] = useState("");
  const movies = props.movies;
  const movie = props.movie;
  const cast = props.cast;
  const genre: string = props.genre;
  const router = useRouter();
  // const param = router.query;
  // console.log(param);
  const MyLoader = (props: any) => (
    <ContentLoader
      width={1200}
      height={1200}
      viewBox="0 0 1200 1200"
      backgroundColor="#507dbc"
      foregroundColor="#a1c6ea"
      {...props}
    >
      <rect x="25" y="42" rx="16" ry="16" width="300" height="400" />
      <rect x="450" y="113" rx="3" ry="3" width="500" height="17" />
      <rect x="450" y="150" rx="3" ry="3" width="478" height="16" />
      <rect x="450" y="200" rx="3" ry="3" width="178" height="16" />
      <rect x="450" y="250" rx="3" ry="3" width="102" height="17" />
      <rect x="450" y="300" rx="3" ry="3" width="178" height="16" />
      <rect x="450" y="42" rx="3" ry="3" width="631" height="50" />
      <rect x="25" y="500" rx="3" ry="3" width="350" height="50" />
      <rect x="25" y="600" rx="16" ry="16" width="200" height="300" />
      <rect x="325" y="600" rx="16" ry="16" width="200" height="300" />
      <rect x="625" y="600" rx="16" ry="16" width="200" height="300" />
      <rect x="925" y="600" rx="16" ry="16" width="200" height="300" />

      {/* <rect x="555" y="600" rx="16" ry="16" width="200" height="300" /> */}
    </ContentLoader>
  );
  // const getDetails = async () => {
  //   const data1 = await fetch(
  //     `https://api.themoviedb.org/3/movie/${param.id}?api_key=${api_key}&language=en-US`
  //   );
  //   const data = await fetch(
  //     `https://api.themoviedb.org/3/movie/${param.id}/credits?api_key=${api_key}&language=en-US`
  //   );

  //   const datajson = await data.json();
  //   const datajson1 = await data1.json();
  //   //console.log(datajson1);
  //   let recom = await fetch(
  //     "https://movie-recommender-backend-g.onrender.com/similarity/" + param.id
  //   );
  //   let recomjson = await recom.json();
  //   let temp = [];
  //   for (let i = 0; i < recomjson.length; i++) {
  //     temp.push(recomjson[i].movie_detail);
  //   }
  //   setMovies(temp);
  //   const m = datajson.cast;
  //   const m1 = datajson1;
  //   if (m) setCast(m.slice(0, 10));
  //   setMovie(m1);
  //   if (m1.genres) {
  //     let genre = "";
  //     for (let i = 0; i < m1.genres.length; i++)
  //       genre = genre + m1.genres[i].name + " | ";
  //     genre = genre.substring(0, genre.length - 2);
  //     setMoviegenre(genre);
  //     //console.log(genre);
  //   }
  //   //console.log(recomjson)
  // };
  // useEffect(() => {
  //   setLoading(true);
  //   // !!param.id && console.log(param.id);
  //   !!param.id && getDetails().then(() => setLoading(false));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [param.id]);

  if (loading)
    return (
      <Layout>
        <div className={classes.container}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt=""
          />
          <div className={classes.overview}>
            <h2>{movie.original_title}</h2>

            <p>
              {movie.adult ? "18+" : "U/A"} &nbsp; {moviegenre}{" "}
            </p>
            {genre && <p>Genre : {genre} </p>}
            <h3>Overview:</h3>
            <p>{movie.overview}</p>
            <p>
              <b>Release :</b> {movie.release_date}
            </p>
            <p>
              <b>Rating :</b> {movie.vote_average}/10
            </p>
            <p>
              <b>Duration :</b> {Math.floor(movie.runtime / 60)}h{" "}
              {movie.runtime % 60}m
            </p>
            {/* <p><b>Genres : </b>{(movie.genres).map((gen)=>{return gen.name+" | "})}</p> */}
          </div>
        </div>
        <h1>Cast</h1>
        <div className={classes.castContainer}>
          {cast.map((member: any, idx: number) => {
            if (member.profile_path) {
              return <CastMember member={member} key={idx} />;
            } else return "";
          })}
        </div>

        <h1>Recommended Movies</h1>
        {movies.length > 0 && (
          <div className={classes.movieContainer}>
            {movies.map((item: any, idx: number) => {
              return <MovieItems movieitem={item} key={idx} />;
            })}
          </div>
        )}
      </Layout>
    );
  else
    return (
      <Layout>
        <MyLoader />
      </Layout>
    );
}
