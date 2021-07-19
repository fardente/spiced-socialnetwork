import FriendButton from "./FriendButton";
import { render, waitFor, fireEvent } from "@testing-library/react";
import axios from "../axios";

jest.mock("../axios");

test("Button is not shown for own profile", async () => {
    axios.get.mockResolvedValue({ data: { user_id: 1 } });
    const { container } = render(<FriendButton other_id="1" />);
    await waitFor(() => expect(container.querySelector("button")).toBeNull());
});

test("Button shows Add Friend whithout friend request for other profiles, onClick changes to Cancel Request", async () => {
    axios.get.mockResolvedValue({ data: { user_id: 1 } });
    axios.post.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: false },
    });
    const { container } = render(<FriendButton other_id="2" />);
    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe("Add Friend");
    });
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe(
            "Cancel Request"
        );
    });
});

test("Button shows Cancel Request with friend request when Sender is viewing, onClick changes to Add Friend", async () => {
    axios.get.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: false },
    });
    axios.post.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: false },
    });
    const { container } = render(<FriendButton other_id="2" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe(
            "Cancel Request"
        )
    );
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe("Add Friend");
    });
});

test("Button shows Accept Friend with friend request when Receiver is viewing, onClick changes to Unfriend", async () => {
    axios.get.mockResolvedValue({
        data: { user_id: 2, sender_id: 1, receiver_id: 2, accepted: false },
    });
    axios.post.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: true },
    });
    const { container } = render(<FriendButton other_id="1" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe(
            "Accept Friend"
        )
    );
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe("Unfriend");
    });
});

test("Button shows Unfriend whit accepted friend request, onClick changes to Add Friend", async () => {
    axios.get.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: true },
    });
    axios.post.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: true },
    });
    const { container } = render(<FriendButton other_id="2" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe("Unfriend")
    );
    fireEvent.click(container.querySelector("button"));
    await waitFor(() => {
        expect(container.querySelector("button").innerHTML).toBe("Add Friend");
    });
});
