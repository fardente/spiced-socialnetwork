import axios from "../axios";

export const GET_FRIENDS = "GET_FRIENDS";
export const UNFRIEND = "UNFRIEND";
export const ACCEPT_FRIEND = "ACCEPT_FRIEND";
export const REJECT_FRIEND = "REJECT_FRIEND";
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

export async function accept_friend(id) {
    const { data } = await axios.post("/api/user/acceptfriend", {
        id,
    });
    console.log("actions, accept", data);
    return {
        type: ACCEPT_FRIEND,
        acceptedFriendship: data[0].id,
    };
}

export async function reject_friend(id) {
    const { data } = await axios.post("/api/user/deletefriendship", {
        id,
    });
    return {
        type: REJECT_FRIEND,
        rejectedFriendship: data.rows[0].id,
    };
}

export async function unfriend(id) {
    const { data } = await axios.post("/api/user/deletefriendship", {
        id,
    });
    return {
        type: UNFRIEND,
        deletedFriendship: data.rows[0].id,
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
