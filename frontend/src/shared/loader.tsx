import React from "react";

const Loader = ({
  backgroundColor,
  size,
}: {
  backgroundColor: string;
  size?: string;
}) => {
  return (
    <>
      {size === "20px" ? (
        <div className="lds-ellipsis-small" style={{ color: backgroundColor }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className="lds-ellipsis" style={{ color: backgroundColor }}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default Loader;
