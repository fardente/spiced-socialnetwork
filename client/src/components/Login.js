import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            password: null,
        };

        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(event) {
        event.preventDefault();
        console.log("login", event);
        axios
            .post("/api/login", this.state)
            .then((result) => {
                console.log("login, sent data", result.id);
                event.target.reset();
                window.location.replace("/");
                this.setState({
                    email: null,
                    password: null,
                    error: null,
                });
            })
            .catch((error) => {
                console.log("error login", error.response);
                this.setState({
                    error: error.response.data.error,
                });
            });
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    render() {
        return (
            <div className="registration">
                <h1>Login please...</h1>
                <form method="POST" onSubmit={this.login}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={this.onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={this.onChange}
                    />
                    <button type="submit">Login</button>
                </form>
                <div className="error">{this.state.error}</div>
                <Link to="/">Register here...</Link>
                <Link to="/pwreset">Forgot password?</Link>
            </div>
        );
    }
}
