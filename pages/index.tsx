import { useState, useEffect } from "react";
import Layout from "../components/layout";
import useEffectOnce from "../hooks/useEffectOnce";
import MovieItems from "../components/movieItems";
import classes from "./index.module.css";
import Carousel from "../components/carousel";
import { useSession } from "next-auth/react";
import Pic1 from "public/images/pic1.jpg";
import Pic2 from "public/images/pic2.jpg";
import Pic3 from "public/images/pic3.jpg";
import MovieItems2 from "../components/movieItems2";
export default function IndexPage() {
  const { data: session } = useSession();
  const [movie, setMovie] = useState<any>([]);
  const [personal_recommendations, setPersonalRecommendations] = useState<any>(
    []
  );
  const getMovies = async () => {
    let data = await fetch(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    let datajson = await data.json();
    let m = datajson.results;
    if (m) setMovie(m.slice(0, 10));
  };
  const getPersonalRecommendations = async () => {
    if (session) {
      const data = await fetch(
        "https://chill-flix-backend.onrender.com/personal_recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: session.user?.email,
          }),
        }
      );
      let datajson = await data.json();
      console.log(datajson);
      // let m = datajson.results;
      if (datajson) setPersonalRecommendations(datajson.slice(0, 10));
    }
  };
  useEffect(() => {
    if (session) getPersonalRecommendations();
  }, [session]);
  useEffectOnce(() => {
    getMovies();
  });
  // useEffect(() => {

  //   // eslint-disable-next-line
  // },[session]);
  return (
    <Layout>
      <Carousel images={[Pic1, Pic2, Pic3]} />
      <div className="trending">
        <h1 className={classes.header}>Explore Trending movies/shows</h1>
        <div className={classes.container}>
          {movie?.map((item: any, idx: number) => {
            if (item.media_type === "movie") {
              return <MovieItems movieitem={item} key={idx} />;
            } else return "";
          })}
        </div>
      </div>
      {personal_recommendations.length > 0 && (
        <div className="personal">
          <h1 className={classes.header}>Based on your interests</h1>
          <div className={classes.container}>
            {personal_recommendations?.map((item: any, idx: number) => {
              return <MovieItems2 movieitem={item} key={idx} />;
            })}
          </div>
        </div>
      )}
    </Layout>
  );
}
