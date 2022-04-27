import {FC} from "react";

interface Props {
  children: React.ReactNode;
}

export const PageLayout: FC<Props> = ({children}) => {
  return (
    <>
      {/* <Header /> */}
      <main className="flex flex-col min-h-screen px-5 py-[80px] mx-auto max-w-7xl">
        {children}
      </main>
      {/* <Footer /> */}
    </>
  );
};
