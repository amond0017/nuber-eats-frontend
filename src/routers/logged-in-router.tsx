import { gql, useQuery } from "@apollo/client";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { meQuery } from "../__generated__/meQuery";
import { Restaurants } from "../pages/client/restaurants";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      verified
    }
  }
`;

const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);
  // console.log(data);
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Switch>{data.me.role === "Client" && ClientRoutes}</Switch>
      <Redirect from="/potato" to="/" />
    </Router>
  );
};

export default LoggedInRouter;
