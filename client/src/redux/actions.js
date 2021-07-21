import axios from "../axios";

export const GET_FRIENDS = "GET_FRIENDS";

export async function getFriends() {
    const { data } = await axios.get("/api/user/friendsandwannabes");
    console.log("actions", data);
    return {
        type: GET_FRIENDS,
        friends: data,
    };
}
