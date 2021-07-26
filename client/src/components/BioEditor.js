import { Component } from "react";
import axios from "../axios";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            draft: null,
        };
        this.renderButton = this.renderButton.bind(this);
        this.renderEditMode = this.renderEditMode.bind(this);
        this.onEditBio = this.onEditBio.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onSubmitBio = this.onSubmitBio.bind(this);
    }

    onEditBio() {
        this.setState({
            isEditing: true,
            draft: this.props.bio,
        });
    }

    onInput(event) {
        this.setState({
            draft: event.target.value,
        });
    }

    onSubmitBio(event) {
        event.preventDefault();
        axios.put("/api/user/updatebio", { bio: this.state.draft });
        this.setState({
            isEditing: false,
        });
        this.props.updateBio(this.state.draft);
        this.setState({
            draft: "",
        });
    }

    renderButton() {
        return this.props.bio ? (
            <button onClick={this.onEditBio}>Edit Bio</button>
        ) : (
            <button onClick={this.onEditBio}>Add Bio</button>
        );
    }

    renderEditMode() {
        return (
            <form onSubmit={this.onSubmitBio}>
                <textarea
                    className="bioArea"
                    onInput={this.onInput}
                    defaultValue={this.props.bio}
                ></textarea>
                <button>Save</button>
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.props.bio}
                <div>
                    {this.state.isEditing
                        ? this.renderEditMode()
                        : this.renderButton()}
                </div>
            </div>
        );
    }
}
