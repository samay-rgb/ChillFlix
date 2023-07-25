import Image from "next/image";
import React from "react";
import classes from "./movieItems.module.scss";
export default function CastMember({ member }: any) {
  return (
    <div className={classes.member}>
      <Image
        src={`https://image.tmdb.org/t/p/w500/${member.profile_path}`}
        alt=""
        height={300}
        width={200}
        style={{ borderRadius: "15px" }}
      />
      <p>{member.name}</p>
    </div>
  );
}
// const Image = styled.img`
//   display: block;
//   height: 300px;
//   border-radius: 15px;
// `;
