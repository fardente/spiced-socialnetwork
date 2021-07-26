import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
    getFriends,
    accept_friend,
    reject_friend,
    unfriend,
} from "../redux/actions";
import { DEFAULT_AVATAR } from "../conf";

export default function Friends() {
    const dispatch = useDispatch();
    let friends = useSelector((state) => state.friends);

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    function unfriendClick(id) {
        console.log("unfriend", id);
        dispatch(unfriend(id));
    }

    function accept(id) {
        console.log("accept", id);
        dispatch(accept_friend(id));
    }

    function rejectClick(id) {
        dispatch(reject_friend(id));
    }

    return (
        <div>
            {friends && friends.filter(({ accepted }) => !accepted) && (
                <h2>These People want to be your friend:</h2>
            )}
            <div className="friendlist">
                {friends &&
                    friends
                        .filter(({ accepted }) => !accepted)
                        .map((friend) => {
                            return (
                                <div key={friend.id} className="user">
                                    <div className="avatar">
                                        <img
                                            src={
                                                friend.avatar_url ||
                                                DEFAULT_AVATAR
                                            }
                                            loading="lazy"
                                        ></img>
                                    </div>
                                    <div className="userinfo">
                                        {friend.firstname} {friend.lastname}
                                        <br></br>
                                        <button
                                            onClick={() =>
                                                accept(friend.friendship_id)
                                            }
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() =>
                                                rejectClick(
                                                    friend.friendship_id
                                                )
                                            }
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
            </div>
            <h2>These are your friends:</h2>
            <div className="friendlist">
                {friends &&
                    friends
                        .filter(({ accepted }) => accepted)
                        .map((friend) => {
                            return (
                                <div key={friend.id} className="user">
                                    <div className="avatar">
                                        <img
                                            src={
                                                friend.avatar_url ||
                                                DEFAULT_AVATAR
                                            }
                                            loading="lazy"
                                        ></img>
                                    </div>
                                    <div className="userinfo">
                                        {friend.firstname} {friend.lastname}
                                        <br></br>
                                        <button
                                            onClick={() =>
                                                unfriendClick(
                                                    friend.friendship_id
                                                )
                                            }
                                        >
                                            Unfriend
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
            </div>
        </div>
    );
}
