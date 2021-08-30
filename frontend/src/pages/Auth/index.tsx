
import "./styles.css";

import { Route, Switch } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import HomeAuthImage from "../../components/HomeAuthImage";
import Recover from "./Recover";


const Auth = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <Switch>
                        <Route path="/auth/signin" exact>
                            <Signin />
                        </Route>
                        <Route path="/auth/signup" exact>
                            <Signup />
                        </Route>
                        <Route path="/auth/recover" exact>
                            <Recover />
                        </Route>
                    </Switch>
                </div>
                <div className="col-md-6">
                    <HomeAuthImage />
                </div>
            </div>
        </div>
    )
}

export default Auth;