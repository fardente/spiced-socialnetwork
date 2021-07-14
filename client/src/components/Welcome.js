import { HashRouter, Route } from "react-router-dom";
import Registration from "./Registration";
import Login from "./Login";
import PWreset from "./PWreset";

function Welcome() {
    return (
        <div className="welcome">
            <div>
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
            <div className="greeting">
                <h1>Join thousands of freaks like yourself!</h1>
            </div>
        </div>
    );
}

export default Welcome;
