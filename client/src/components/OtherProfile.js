import { Component } from "react";
import axios from "../axios";
import FriendButton from "./FriendButton";

export default class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    async componentDidMount() {
        const id = this.props.match.params.id;
        let data;
        try {
            data = await axios.get("/api/user/" + id);
        } catch (error) {
            console.log("error fetching user", error);
            this.props.history.push("/");
            return;
        }
        console.log("otherprofile mount", data, this.props);
        this.setState(data.data);
    }

    render() {
        return (
            <section className="otherprofile">
                <div className="avatar">
                    <img src={this.state.avatar_url}></img>
                </div>
                <div className="userinfo">
                    <h1>
                        {this.state.firstname} {this.state.lastname}
                    </h1>
                    <p>{this.state.bio}</p>
                    <div>
                        {this.state.id && (
                            <FriendButton other_id={this.state.id} />
                        )}
                    </div>
                </div>
            </section>
        );
    }
}
