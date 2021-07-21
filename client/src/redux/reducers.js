import { GET_FRIENDS } from "./actions";

export default function reducer(state = {}, action) {
    if (action.type === GET_FRIENDS) {
        return { ...state, friends: action.friends };
    }
    return state;
}
