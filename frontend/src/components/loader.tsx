import React from "react";

const Loader = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <>
      <div className="bouncing-loader">
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
        <div style={{ backgroundColor }}></div>
      </div>
    </>
  );
};

export default Loader;