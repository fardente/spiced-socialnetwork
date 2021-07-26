import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import { DEFAULT_AVATAR } from "../conf";

export default function FindPeople() {
    let [recentUsers, setRecentUsers] = useState([]);
    let [searchTerm, setSearchTerm] = useState("");
    let [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("/api/users/recent").then((result) => {
            console.log(result.data);
            setRecentUsers(result.data);
        });
    }, []);

    useEffect(() => {
        if (searchTerm == "") {
            setUsers([]);
            return;
        }

        axios.get("/api/users/search?q=" + searchTerm).then((result) => {
            setUsers(result.data);
        });
    }, [searchTerm]);

    function onSearchInput(event) {
        setSearchTerm(event.target.value);
    }

    function renderUsers(users) {
        return users.map((user) => {
            return (
                <Link to={"/user/" + user.id} key={user.id}>
                    <div className="user">
                        <div className="avatar">
                            <img
                                src={user.avatar_url || DEFAULT_AVATAR}
                                loading="lazy"
                            ></img>
                        </div>
                        <div className="userinfo">
                            {user.firstname} {user.lastname}
                        </div>
                    </div>
                </Link>
            );
        });
    }

    return (
        <section>
            <h2>Our newest members:</h2>
            {renderUsers(recentUsers)}
            <h1>Looking for someone specific?</h1>
            <input
                type="text"
                placeholder="Username"
                onChange={onSearchInput}
            ></input>
            <div className="searchResults">{renderUsers(users)}</div>
        </section>
    );
}
