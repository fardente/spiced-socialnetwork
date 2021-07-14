import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            password: null,
        };

        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    register(event) {
        event.preventDefault();
        console.log("register", event);
        axios
            .post("/api/register", this.state)
            .then((result) => {
                console.log("register, sent data", result.id);
                event.target.reset();
                window.location.replace("/");
                this.setState({
                    firstname: null,
                    lastname: null,
                    email: null,
                    password: null,
                    error: null,
                });
            })
            .catch((error) => {
                console.log("error posting", error.message);
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
                <h1>Register</h1>
                <form method="POST" onSubmit={this.register}>
                    <input
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        onChange={this.onChange}
                    />
                    <input
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        onChange={this.onChange}
                    />
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
                    <button type="submit">Register</button>
                </form>
                <div className="error">{this.state.error}</div>
                <Link to="/login">Login here...</Link>
            </div>
        );
    }
}
