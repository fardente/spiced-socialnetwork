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
                <h1>Join thousands of 2D-freaks like yourself!</h1>
                <h2>2D-Friends is a place for people from Flatland.</h2>
            </div>
        </div>
    );
}

export default Welcome;
