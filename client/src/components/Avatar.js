export default function Avatar({
    firstname,
    lastname,
    avatar_url,
    onAvatarClick,
}) {
    const DEFAULT_AVATAR = "https://via.placeholder.com/100";
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
