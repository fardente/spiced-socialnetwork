import { useState, useEffect } from "react";
import axios from "../axios";

export default function FriendButton({ other_id }) {
    const ADD_FRIEND = "Add Friend";
    const CANCEL_REQUEST = "Cancel Request";
    const ACCEPT_REQUEST = "Accept Friend";
    const UNFRIEND = "Unfriend";

    let [buttonText, setButtonText] = useState(ADD_FRIEND);
    let [showButton, setShowButton] = useState(true);
    console.log("friend button other id", other_id);
    useEffect(() => {
        console.log("mounting friend button, other_id: ", other_id);
        axios.get("/api/user/" + other_id + "/requests").then((result) => {
            let { user_id, sender_id, receiver_id, accepted } = result.data;

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
    return (
        <div>
            {showButton && (
                <button className="friendButton">{buttonText}</button>
            )}
        </div>
    );
}
