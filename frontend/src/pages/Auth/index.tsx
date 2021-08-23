import "./styles.css";

import { Route, Switch } from "react-router-dom";
import Home from "../Home";
import Signin from "./Signin";
import Sidebar from "./Sidebar";
import Signup from "./Signup";

const Auth = () => {
    return (
        <>
            <Sidebar />
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <Switch>
                            <Route path="/home" exact>
                                <Home />
                            </Route>
                            <Route path="/auth/signin" exact>
                                <Signin />
                            </Route>
                            <Route path="/auth/signup" exact>
                                <Signup />
                            </Route>
                        </Switch>
                    </div>
                    <div className="col-md-6">
                        <div className="auth-image-container">
                            <img src="https://cdn.pixabay.com/photo/2013/06/07/09/53/notepad-117597_960_720.png" alt="img" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth;