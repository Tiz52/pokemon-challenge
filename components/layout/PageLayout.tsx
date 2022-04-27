import Head from "next/head";
import {FC} from "react";

interface Props {
  children: React.ReactNode;
  title: string;
}

export const PageLayout: FC<Props> = ({children, title}) => {
  return (
    <>
      <Head>
        <title>{title || "Pokemon App"}</title>
        <meta name="author" content="Carlos" />
        <meta
          name="description"
          content={`Información sobre el pokémon ${title}`}
        />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la página sobre ${title}`}
        />
        <meta property="og:image" content="/banner.png" />
        <link rel="shortcut icon" href="/pokeball.png" />
      </Head>
      <main className="flex flex-col min-h-screen px-5 py-[80px] mx-auto max-w-7xl">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};
