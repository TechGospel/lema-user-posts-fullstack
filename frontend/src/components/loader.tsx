import React from "react";

const Loader = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <>
      <div className="bouncing-loader">
        <div data-testid="loader-div" style={{ backgroundColor }}></div>
        <div data-testid="loader-div" style={{ backgroundColor }}></div>
        <div data-testid="loader-div" style={{ backgroundColor }}></div>
      </div>
    </>
  );
};

export default Loader;