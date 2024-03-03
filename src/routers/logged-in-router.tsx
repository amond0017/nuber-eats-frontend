import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { Restaurants } from "../pages/client/restaurants";

const ClientRoutes = [
  <Route path="/" exact key="restaurants">
    <Restaurants />
  </Route>,
];

const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <Router>
      <Header />
      <Switch>{data.me.role === "Client" && ClientRoutes}</Switch>
      <Redirect to="/" />
    </Router>
  );
};

export default LoggedInRouter;
