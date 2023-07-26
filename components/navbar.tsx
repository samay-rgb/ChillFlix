import { useState } from "react";
import * as React from "react";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import classes from "./navbar.module.css";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useFormControl } from "@mui/material/FormControl";

// import { orange } from "@mui/material/colors";

export default function Navbar(props: { movieList: string[] }) {
  const [movieName, setMovieName] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div className={classes.container}>
      <Link href="/" style={{ textDecoration: "none" }}>
        {/* logo */}
        <Image
          src={"/images/logo-lg.svg"}
          alt="chillflix"
          height={80}
          width={100}
        />
      </Link>
      <div style={{ display: "flex", flexFlow: "row wrap" }}>
        <input
          className={classes.input}
          type="text"
          list="moviename"
          role={"combobox"}
          placeholder="Enter movie name"
          onChange={(e) => setMovieName(e.target.value)}
          value={movieName}
          onKeyDown={(e) => {
            if (e.key === "Enter") router.push(`/search?movie=${movieName}`);
          }}
        />
        {
          <datalist id="moviename">
            {props.movieList.map((item, idx) => {
              return (
                <option value={item} key={idx}>
                  {item}
                </option>
              );
            })}
          </datalist>
        }

        {/* <Autocomplete
          disablePortal
          id="combo-box-demo"
          onSelect={(event) => {
            setMovieName(event.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") return getIds(movieName);
          }}

          options={props.movieList}
          sx={{ width: 500, height: 45 }}
          renderInput={(params) => (
            <TextField
              {...params}
              color="warning"
              label="Search Movie"
              sx={{ input: { color: "white" } }}
              focused
            />
          )}
        /> */}

        <button
          className={classes.btn}
          type="submit"
          onClick={() => router.push(`/search?movie=${movieName}`)}
        >
          <img
            src="https://img.icons8.com/color/48/000000/search--v2.png"
            alt="search btn"
            style={{ margin: "auto" }}
            width={48}
            height={48}
          />
        </button>
        {!session && (
          <>
            <a
              href={`/api/auth/signin`}
              className={classes.buttonPrimary}
              onClick={(e) => {
                e.preventDefault();
                signIn();
              }}
            >
              Sign in
            </a>
          </>
        )}
        {session?.user && (
          <>
            {session.user.image && (
              <span
                style={{ backgroundImage: `url('${session.user.image}')` }}
                className={classes.avatar}
              />
            )}
            <a
              href={`/api/auth/signout`}
              className={classes.button}
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              Sign out
            </a>
          </>
        )}
      </div>
    </div>
  );
}
