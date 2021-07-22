import io from "socket.io-client";
import { chatHistory, chatMessage } from "./redux/actions";

export let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on("chatHistory", (messages) =>
            store.dispatch(chatHistory(messages))
        );

        socket.on("chatMessage", (message) => {
            console.log("received message", message);
            store.dispatch(chatMessage(message));
        });
    }
}
