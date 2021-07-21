import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getFriends } from "../redux/actions";

export default function Friends() {
    const dispatch = useDispatch();
    let friends = useSelector((state) => state.friends);

    useEffect(() => {
        dispatch(getFriends());
    }, []);

    return (
        <div>
            <h2>These People want to be your friend:</h2>
            <div className="friendlist">
                {friends &&
                    friends
                        .filter(({ accepted }) => !accepted)
                        .map((friend) => {
                            return (
                                <div key={friend.id}>{friend.firstname}</div>
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
                                <div key={friend.id}>{friend.firstname}</div>
                            );
                        })}
            </div>
        </div>
    );
}
