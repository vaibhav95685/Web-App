import React from "react";

function splitTo({ address }) {
  const first = address?.substring(0, 4);
  const last = address?.substring(address?.length - 4);


  return (
    <>
      {first}...{last}
    </>
  );
}

export default splitTo;