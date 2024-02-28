import React from "react";
import { isLoggedInVar } from "../apollo";

const LoggedInRouter = () => (
  <div>
    <h1>Logged In</h1>
    <button onClick={() => isLoggedInVar(false)}>Log Out</button>
  </div>
);

export default LoggedInRouter;
