import { useSelector } from "react-redux";
import { useRef } from "react";
import { socket } from "../socket";
import { DEFAULT_AVATAR } from "../conf";

export default function Chat() {
    const chatHistory = useSelector((state) => state.chatHistory);
    const textarea = useRef();
    console.log("hist", chatHistory);

    function sendMessage() {
        socket.emit("chatMessage", textarea.current.value);
        textarea.current.value = "";
        textarea.current.focus();
    }

    function checkKey(event) {
        if (event.key == "Enter") {
            event.preventDefault();
            sendMessage();
        }
    }

    return (
        <section className="chat">
            <div className="chatMessageBox">
                {chatHistory &&
                    chatHistory.map((msg) => {
                        return (
                            <div key={msg.id} className="chatMessage">
                                <div className="chatAvatar">
                                    <img
                                        src={msg.avatar_url || DEFAULT_AVATAR}
                                        loading="lazy"
                                    ></img>
                                </div>
                                <div className="chatText">
                                    <p>
                                        <strong>
                                            {msg.firstname} {msg.lastname}
                                        </strong>
                                    </p>
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="chatInput">
                <textarea
                    placeholder="Type a message..."
                    onKeyPress={checkKey}
                    ref={textarea}
                ></textarea>
                <button onClick={sendMessage}>Send</button>
            </div>
        </section>
    );
}
