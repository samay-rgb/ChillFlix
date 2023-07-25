import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import classes from "./movieItems.module.scss";
import { useSession } from "next-auth/react";

import Link from "next/link";
export default function MovieItems2({ movieitem }: any) {
  const router = useRouter();
  const { data: session } = useSession();
  movieitem = movieitem?.movie_detail;
  let poster = "/gPQM1zqqsm6Lw1tHF41BwbmOkya.jpg";
  let title = "Movie Name";
  const onClick = () => {
    // post request to send movie id to be added to db if user is logged in
    if (session) {
      const res = fetch("https://chill-flix-backend.onrender.com/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: movieitem.id,
          email: session.user?.email,
        }),
      });
    }
    router.push(`/movies/${movieitem.id}`);
  };
  if (
    typeof movieitem?.poster_path !== "undefined" &&
    movieitem?.poster_path !== null
  )
    poster = movieitem.poster_path;
  if (typeof movieitem?.title !== "undefined" && movieitem?.title !== null)
    title = movieitem.title;
  if (
    typeof movieitem?.original_title !== "undefined" &&
    movieitem.original_title !== null
  )
    title = movieitem.original_title;
  if (
    typeof movieitem?.original_name !== "undefined" &&
    movieitem.original_name !== null
  )
    title = movieitem.original_name;
  if (
    typeof movieitem?.vote_average !== "undefined" &&
    movieitem.vote_average !== null
  )
    if (!movieitem?.title) return null;
  return (
    <>
      {movieitem?.title && (
        // <Link href={`/movies/${movieitem.id}`}>
        <div className={classes.movieItem}>
          <Image
            src={`https://image.tmdb.org/t/p/w500/${poster}`}
            alt=""
            height={300}
            width={200}
            style={{ borderRadius: "15px" }}
          />
          <div className={classes.overlay} onClick={onClick}>
            <div className={classes.text}>{title}</div>
          </div>
        </div>
        // </Link>
      )}
    </>
  );
}

// const Image = styled.img`
//   display: block;
//   height: 300px;
//   border-radius: 15px;
// `;
