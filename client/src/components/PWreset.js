import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: null,
            code: null,
            newpass: null,
            error: null,
        };

        this.onChange = this.onChange.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.checkCode = this.checkCode.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    async checkEmail(event) {
        event.preventDefault();
        let exists = await axios.post("/password/reset/start", this.state);
        exists = exists.data.exists;
        if (exists) {
            this.setState({
                step: 2,
                error: null,
            });
        } else {
            this.setState({
                error: "Email not found!",
            });
        }
    }

    async checkCode(event) {
        event.preventDefault();
        let code = await axios.post("/password/reset/verify", this.state);
        console.log(code);
        if (code.data.success) {
            this.setState({
                step: 3,
                error: null,
            });
        }
    }

    async resetPassword() {}

    render() {
        if (this.state.step == 1) {
            return (
                <section className="resetPassword">
                    <h1>
                        Reset Password / <Link to="/login">Login</Link>
                    </h1>

                    <form
                        key="form1"
                        action="/"
                        method="POST"
                        onSubmit={this.checkEmail}
                    >
                        <h3>Enter your email address</h3>
                        <input
                            onChange={this.onChange}
                            type="email"
                            name="email"
                            placeholder="Email"
                        ></input>
                        <button type="submit">Submit</button>
                    </form>
                    {this.state.error && <div>{this.state.error}</div>}
                </section>
            );
        }

        if (this.state.step == 2) {
            return (
                <section className="resetPassword">
                    <h1>
                        Reset Password / <Link to="/login">Login</Link>
                    </h1>

                    <form
                        key="form2"
                        action="/"
                        method="POST"
                        onSubmit={this.checkCode}
                    >
                        <h3>Enter the code you received via email</h3>
                        <input
                            type="text"
                            name="code"
                            placeholder="Code"
                            onChange={this.onChange}
                        ></input>
                        <h3>Enter a new password</h3>
                        <input
                            type="password"
                            name="newpassword"
                            placeholder="New Password"
                            onChange={this.onChange}
                        ></input>
                        <button type="submit">Reset</button>
                    </form>
                    {this.state.error && <div>{this.state.error}</div>}
                </section>
            );
        }

        if (this.state.step == 3) {
            return (
                <section className="resetPassword">
                    <h1>
                        Reset Password / <Link to="/login">Login</Link>
                    </h1>
                    <div>
                        Your password was successfully changed! You can now
                        login here: <Link to="/login">Login</Link>
                    </div>
                    {this.state.error && <div>{this.state.error}</div>}
                </section>
            );
        }

        return <section>asd</section>;
    }
}
