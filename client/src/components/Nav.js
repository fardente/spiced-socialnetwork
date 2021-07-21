import { Link, useHistory } from "react-router-dom";
import axios from "../axios";

export default function Nav() {
    const history = useHistory();
    async function logout(event) {
        event.preventDefault();
        await axios.post("/logout");
        history.push("/#/login");
        window.location.reload();
    }

    return (
        <nav className="nav">
            <Link to="/">My Profile</Link>
            <Link to="/friends">Friends</Link>
            <Link to="/users">Find Friends</Link>
            <button type="submit" onClick={logout}>
                Logout
            </button>
        </nav>
    );
}
