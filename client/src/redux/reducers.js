import { GET_FRIENDS, CHAT_HISTORY, CHAT_MESSAGE } from "./actions";

export default function reducer(state = {}, action) {
    if (action.type === GET_FRIENDS) {
        return { ...state, friends: action.friends };
    }

    if (action.type === CHAT_HISTORY) {
        return { ...state, chatHistory: action.chatHistory };
    }

    if (action.type === CHAT_MESSAGE) {
        console.log("chatmessage: ", action.message);
        return {
            ...state,
            chatHistory: [action.message, ...state.chatHistory],
        };
    }

    return state;
}
