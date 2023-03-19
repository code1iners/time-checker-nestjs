import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { resetServerContext } from "react-beautiful-dnd";
import ResponsiveHorizontal from "@/components/responsive-horizontal.component";
import HeaderComponent from "@/components/header.component";
import BodyComponent from "@/components/body.component";
import Loading from "@/components/loading.component";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted) return <Loading />;

  return (
    <>
      <Head>
        <title>Time Stamper</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <main className="h-screen">
        <ResponsiveHorizontal>
          <HeaderComponent />
          <BodyComponent />
        </ResponsiveHorizontal>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

  return { props: { data: [] } };
};
