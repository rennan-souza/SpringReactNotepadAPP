
import { Route, Switch } from "react-router-dom";
import Create from "./Note/Create";
import List from "./Note/List";
import Profile from "./User/Profile";
import Security from "./User/Security";

const NotepadApp = () => {
    return (
        <Switch>
            <Route path="/notes" exact>
                <List />
            </Route>
            <Route path="/notes/:noteId" exact>
                <Create />
            </Route>
            <Route path="/user/profile" exact>
                <Profile />
            </Route>
            <Route path="/user/security" exact>
                <Security />
            </Route>
        </Switch>
    );
};

export default NotepadApp;