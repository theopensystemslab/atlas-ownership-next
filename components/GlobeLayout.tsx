import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
import Header from "./Header";
import MapboxGlobe from "./MapboxGlobe";

type Props = PropsWithChildren<{}>;

const GlobeLayout = (props: Props) => {
  const { children } = props;
  return (
    <>
      <Header />
      <div className="absolute w-full h-3/4">
        <MapboxGlobe />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default GlobeLayout;
