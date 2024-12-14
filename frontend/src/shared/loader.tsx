import React from "react";

const Loader = ({ backgroundColor }: { backgroundColor: string }) => {
  return (
    <>
      <div className="lds-ellipsis" style={{ color: backgroundColor }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Loader;
