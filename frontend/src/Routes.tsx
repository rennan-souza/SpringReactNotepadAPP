import { BrowserRouter, Route, Switch } from "react-router-dom";
import Auth from "./pages/Auth";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/">
        <Auth />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;