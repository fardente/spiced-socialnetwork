import { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import axios from "../axios";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import Friends from "./Friends";
import Nav from "./Nav";
import Avatar from "./Avatar";
import AvatarUploader from "./AvatarUploader";
import Chat from "./Chat";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            firstname: null,
            lastname: null,
            avatar_url: null,
            bio: null,
            showModal: false,
        };

        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }

    async componentDidMount() {
        const { data } = await axios.get("/api/user");
        console.log("app mounted", data);
        this.setState(data);
    }

    onAvatarClick() {
        this.toggleModal();
    }

    toggleModal() {
        console.log("toggle modal");
        this.setState({
            showModal: !this.state.showModal,
        });
    }

    updateAvatar(avatar_url) {
        this.setState({ avatar_url });
    }

    updateBio(bio) {
        console.log("updatebio", bio);
        this.setState({
            bio,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <section className="app">
                    {this.state.showModal && (
                        <AvatarUploader
                            toggleModal={this.toggleModal}
                            updateAvatar={this.updateAvatar}
                        />
                    )}
                    <header>
                        <h1>2D-Friends</h1>
                        <Nav />
                        <Avatar
                            firstname={this.state.firstname}
                            lastname={this.state.lastname}
                            avatar_url={this.state.avatar_url}
                            bio={this.state.bio}
                            onAvatarClick={this.onAvatarClick}
                        />
                    </header>
                    <section className="content">
                        <Route
                            path="/"
                            exact
                            render={() => (
                                <Profile
                                    firstname={this.state.firstname}
                                    lastname={this.state.lastname}
                                    avatar_url={this.state.avatar_url}
                                    bio={this.state.bio}
                                    onAvatarClick={this.onAvatarClick}
                                    updateBio={this.updateBio}
                                />
                            )}
                        />
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/users" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                    </section>
                </section>
            </BrowserRouter>
        );
    }
}
