import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ other_id }) {
    const ADD_FRIEND = "Add Friend";
    const CANCEL_REQUEST = "Cancel Request";
    const ACCEPT_REQUEST = "Accept Friend";
    const UNFRIEND = "Unfriend";

    let [friendship_id, setFriendship_id] = useState(null);
    let [user_id, setUser_id] = useState(null);
    let [buttonText, setButtonText] = useState(ADD_FRIEND);
    let [showButton, setShowButton] = useState(true);

    useEffect(() => {
        axios.get("/api/user/" + other_id + "/requests").then((result) => {
            let { id, user_id, sender_id, receiver_id, accepted } = result.data;
            setUser_id(user_id);
            setFriendship_id(id);

            if (user_id == other_id) {
                setShowButton(false);
                return;
            }

            if (!sender_id) {
                setButtonText(ADD_FRIEND);
                return;
            }

            if (accepted) {
                setButtonText(UNFRIEND);
                return;
            }

            if (!accepted) {
                if (user_id == sender_id) {
                    setButtonText(CANCEL_REQUEST);
                } else {
                    setButtonText(ACCEPT_REQUEST);
                }
            }
        });
    }, [other_id]);

    async function onClick() {
        switch (buttonText) {
            case ADD_FRIEND: {
                const response = await axios.post("/api/user/addfriend", {
                    sender_id: user_id,
                    receiver_id: other_id,
                });
                setButtonText(CANCEL_REQUEST);
                break;
            }
            case CANCEL_REQUEST: {
                const response = await axios.post(
                    "/api/user/deletefriendship",
                    {
                        id: friendship_id,
                    }
                );
                setButtonText(ADD_FRIEND);
                break;
            }
            case ACCEPT_REQUEST: {
                const response = await axios.post("/api/user/acceptfriend", {
                    id: friendship_id,
                });
                setButtonText(UNFRIEND);
                break;
            }
            case UNFRIEND: {
                const response = await axios.post(
                    "/api/user/deletefriendship",
                    {
                        id: friendship_id,
                    }
                );
                setButtonText(ADD_FRIEND);
                break;
            }
        }
    }

    return (
        <div>
            {showButton && (
                <button className="friendButton" onClick={onClick}>
                    {buttonText}
                </button>
            )}
        </div>
    );
}
