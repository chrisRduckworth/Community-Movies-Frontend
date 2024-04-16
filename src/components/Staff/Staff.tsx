import React from "react";
import StaffLogin from "./StaffLogin";

function Staff({
  jwt,
  setJwt,
}: {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <main>
      {jwt ? <p>TBD</p>: <StaffLogin setJwt={setJwt}/>}
    </main>
  );
}

export default Staff;
