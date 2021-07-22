import { DEFAULT_AVATAR } from "../conf";

export default function Avatar({
    firstname,
    lastname,
    avatar_url,
    onAvatarClick,
}) {
    return (
        <div className="avatar">
            <img
                src={avatar_url || DEFAULT_AVATAR}
                alt={(firstname, lastname)}
                onClick={onAvatarClick}
            />
        </div>
    );
}
