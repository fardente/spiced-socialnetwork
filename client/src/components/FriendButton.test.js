import FriendButton from "./FriendButton";
import { render, waitFor } from "@testing-library/react";
import axios from "../axios";

jest.mock("../axios");

test("Button is not shown for own profile", async () => {
    axios.get.mockResolvedValue({ data: { user_id: 1 } });
    const { container } = render(<FriendButton other_id="1" />);
    await waitFor(() => expect(container.querySelector("button")).toBeNull());
});

test("Button shows Add Friend whithout friend request for other profiles", async () => {
    axios.get.mockResolvedValue({ data: { user_id: 1 } });
    const { container } = render(<FriendButton other_id="2" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe("Add Friend")
    );
});

test("Button shows Cancel Request with friend request when Sender is viewing", async () => {
    axios.get.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: false },
    });
    const { container } = render(<FriendButton other_id="2" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe(
            "Cancel Request"
        )
    );
});

test("Button shows Accept Friend with friend request when Receiver is viewing", async () => {
    axios.get.mockResolvedValue({
        data: { user_id: 2, sender_id: 1, receiver_id: 2, accepted: false },
    });
    const { container } = render(<FriendButton other_id="1" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe(
            "Accept Friend"
        )
    );
});

test("Button shows Unfriend whit accepted friend request", async () => {
    axios.get.mockResolvedValue({
        data: { user_id: 1, sender_id: 1, receiver_id: 2, accepted: true },
    });
    const { container } = render(<FriendButton other_id="2" />);
    await waitFor(() =>
        expect(container.querySelector("button").innerHTML).toBe("Unfriend")
    );
});
