import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import PWreset from "./PWreset";

function Welcome() {
    return (
        <div>
            <h1>Welcome</h1>
            <HashRouter>
                <Route path="/" exact>
                    <Registration />
                </Route>

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/pwreset">
                    <PWreset />
                </Route>
            </HashRouter>
        </div>
    );
}

export default Welcome;
