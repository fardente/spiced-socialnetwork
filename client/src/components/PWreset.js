import { Component } from "react";
import axios from "../axios";

export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            email: null,
            code: null,
            newpass: null,
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
        console.log("exit", exists);
        if (exists) {
            this.setState({
                step: 2,
            });
        }
    }

    async checkCode(event) {
        event.preventDefault();
        let code = await axios.post("/password/reset/verify", this.state);
    }

    async resetPassword() {}

    render() {
        if (this.state.step == 1) {
            return (
                <section>
                    <h1>Reset Password</h1>
                    <form action="/" method="POST" onSubmit={this.checkEmail}>
                        <input
                            onChange={this.onChange}
                            type="email"
                            name="email"
                        ></input>
                        <button type="submit">Submit</button>
                    </form>
                </section>
            );
        }

        if (this.state.step == 2) {
            return (
                <section>
                    <h1>Reset Password</h1>
                    <h2>Enter the code you received via emial</h2>
                    <form action="/" method="POST" onSubmit={this.checkCode}>
                        <input
                            type="text"
                            name="code"
                            onChange={this.onChange}
                        ></input>
                        <h2>Enter a new password</h2>
                        <input
                            type="password"
                            name="newpassword"
                            onChange={this.onChange}
                        ></input>
                        <button type="submit">Reset</button>
                    </form>
                </section>
            );
        }

        return <section>asd</section>;
    }
}
