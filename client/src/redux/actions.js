import axios from "../axios";

export const GET_FRIENDS = "GET_FRIENDS";
export const CHAT_HISTORY = "CHAT_HISTORY";
export const CHAT_MESSAGE = "CHAT_MESSAGE";

export async function getFriends() {
    const { data } = await axios.get("/api/user/friendsandwannabes");
    console.log("actions", data);
    return {
        type: GET_FRIENDS,
        friends: data,
    };
}

export function chatHistory(chatHistory) {
    return {
        type: CHAT_HISTORY,
        chatHistory,
    };
}

export function chatMessage(message) {
    return {
        type: CHAT_MESSAGE,
        message,
    };
}
