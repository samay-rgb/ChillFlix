import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import useInterval from "../hooks/useInterval";
import { useState } from "react";
import Pic1 from "public/images/pic1.jpg";
import Pic2 from "public/images/pic2.jpg";
import Pic3 from "public/images/pic3.jpg";
import Carousel from "../components/carousel";
export default function MePage() {
  const { data } = useSession();
  const [t, setT] = useState(0);
  useInterval(() => {
    console.log(t);
    setT(t + 1);
  }, 3000);
  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Carousel images={[Pic1, Pic2, Pic3]} />
    </Layout>
  );
}
