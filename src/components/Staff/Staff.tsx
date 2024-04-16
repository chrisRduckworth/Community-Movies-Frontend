import React from "react";
import StaffLogin from "./StaffLogin";
import StaffMenu from "./StaffMenu";

function Staff({
  jwt,
  setJwt,
}: {
  jwt: string;
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <main>
      {jwt ? <StaffMenu setJwt={setJwt} /> : <StaffLogin setJwt={setJwt} />}
    </main>
  );
}

export default Staff;
