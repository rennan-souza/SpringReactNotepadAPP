
import { Route, Switch } from "react-router-dom";
import Create from "./Note/Create";
import List from "./Note/List";

const NotepadApp = () => {
    return (
        <Switch>
            <Route path="/notes" exact>
                <List />
            </Route>
            <Route path="/notes/:noteId" exact>
                <Create />
            </Route>
        </Switch>
    );
};

export default NotepadApp;