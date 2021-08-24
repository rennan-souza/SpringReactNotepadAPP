
import { Switch } from "react-router-dom";
import PrivateRoute from "../../components/PrivateRoute";
import List from "./Note/List";



const NotepadApp = () => {
    return (
        <>
            <Switch>
                <PrivateRoute path="/notes">
                    <List />
                </PrivateRoute>
            </Switch>
        </>
    );
};

export default NotepadApp;