import { Component } from "react";
import axios from "../axios";
import Profile from "./Profile";
import Avatar from "./Avatar";
import AvatarUploader from "./AvatarUploader";

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
        console.log(data);
        this.setState(data);
        console.log(this.state);
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
            <section>
                {this.state.showModal && (
                    <AvatarUploader
                        toggleModal={this.toggleModal}
                        updateAvatar={this.updateAvatar}
                    />
                )}
                <header>
                    <img src=""></img>
                    <Avatar
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        avatar_url={this.state.avatar_url}
                        bio={this.state.bio}
                        onAvatarClick={this.onAvatarClick}
                    />
                </header>
                <Profile
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    avatar_url={this.state.avatar_url}
                    bio={this.state.bio}
                    onAvatarClick={this.onAvatarClick}
                    updateBio={this.updateBio}
                />
            </section>
        );
    }
}
