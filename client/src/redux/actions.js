export const GET_FRIENDS = "GET_FRIENDS";

export function getFriends(friends) {
    return {
        type: "GET_FRIENDS",
        friends,
    };
}
