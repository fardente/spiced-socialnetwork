import Avatar from "./Avatar";

export default function Profile({
    firstname,
    lastname,
    avatar_url,
    onAvatarClick,
}) {
    return (
        <section>
            Hey {firstname} - {lastname} - {avatar_url}
            <Avatar
                firstname={firstname}
                lastname={lastname}
                avatar_url={avatar_url}
                onAvatarClick={onAvatarClick}
            />
        </section>
    );
}
