import { useSelector } from "react-redux";
import { useRef } from "react";
import { socket } from "../socket";

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
            Hey Chat{" "}
            {chatHistory &&
                chatHistory.map((msg) => {
                    return (
                        <div key={msg.id}>
                            <div className="avatar">
                                <img src={msg.avatar_url}></img>
                            </div>
                            <div className="chatMessage">
                                <span>
                                    <strong>
                                        {msg.firstname} {msg.lastname}
                                    </strong>
                                </span>{" "}
                                {msg.message}
                            </div>
                        </div>
                    );
                })}
            <textarea
                placeholder="Type a message..."
                onKeyPress={checkKey}
                ref={textarea}
            ></textarea>
            <button onClick={sendMessage}>Send</button>
        </section>
    );
}
