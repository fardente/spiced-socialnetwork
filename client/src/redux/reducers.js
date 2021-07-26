import {
    GET_FRIENDS,
    ACCEPT_FRIEND,
    REJECT_FRIEND,
    UNFRIEND,
    CHAT_HISTORY,
    CHAT_MESSAGE,
} from "./actions";

export default function reducer(state = {}, action) {
    if (action.type === GET_FRIENDS) {
        return { ...state, friends: action.friends };
    }

    if (action.type === ACCEPT_FRIEND) {
        const newFriends = [...state.friends];
        console.log(
            "reducer accept newFriends",
            newFriends,
            action.acceptedFriendship
        );
        newFriends.find(
            (friend) => friend.friendship_id == action.acceptedFriendship
        ).accepted = true;
        console.log("newnewfriends", newFriends);
        return { ...state, friends: newFriends };
    }

    if (action.type === REJECT_FRIEND) {
        const newFriends = state.friends.filter(
            ({ friendship_id }) => friendship_id != action.rejectedFriendship
        );
        console.log("rejected reducer", newFriends);
        return { ...state, friends: newFriends };
    }

    if (action.type === UNFRIEND) {
        const newFriends = state.friends.filter(
            ({ friendship_id }) => friendship_id != action.deletedFriendship
        );
        console.log(
            "reducer nefriends",
            state.friends,
            action.deletedFriendship,
            newFriends
        );
        return { ...state, friends: newFriends };
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
