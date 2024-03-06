import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import { Restaurants } from "../pages/client/restaurants";
import { ConfirmEmail } from "../pages/user/confirm-email";
import { EditProfile } from "src/pages/user/edit-profile";
import { Search } from "src/pages/client/search";
import { Category } from "src/pages/client/category";

const ClientRoutes = [
  <Route path="/" exact key="restaurants">
    <Restaurants />
  </Route>,
  <Route path="/confirm" key="confirm-email">
    <ConfirmEmail />
  </Route>,
  <Route path="/edit-profile" key="edit-profile">
    <EditProfile />
  </Route>,
  <Route path="/search" key="search">
    <Search />
  </Route>,
  <Route path="/category/:slug" key="category">
    <Category />
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
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        {/* <Redirect to="/" /> */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedInRouter;
