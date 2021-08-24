import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import NotepadApp from "./pages/NotepadApp";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>  
      <Route path="/home" exact>
        <Home />
      </Route>

      <Redirect from="/auth" to="/auth/signin" exact />
      <Route path="/auth">
        <Auth />
      </Route>

      <Redirect from="/" to="/notes" exact />
      <Route path="/">
        <NotepadApp />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;