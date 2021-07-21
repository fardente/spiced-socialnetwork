import { GET_FRIENDS } from "./actions";

export default function reducer(state = {}, action) {
    if (action.type === GET_FRIENDS) {
        const user = { ...state.user, friends: action.friends };
        return { ...state, user };
    }
    return state;
}
