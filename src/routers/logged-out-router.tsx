import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Login } from "../pages/login";
import { CreateAccount } from "../pages/create-account";
import { NotFound } from "../pages/404";

const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default LoggedOutRouter;
