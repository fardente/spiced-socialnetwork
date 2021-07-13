import Avatar from "./Avatar";
import BioEditor from "./BioEditor";

export default function Profile({
    firstname,
    lastname,
    avatar_url,
    onAvatarClick,
    bio,
    updateBio,
}) {
    return (
        <section>
            Hey {firstname} - {lastname}
            <Avatar
                firstname={firstname}
                lastname={lastname}
                avatar_url={avatar_url}
                onAvatarClick={onAvatarClick}
            />
            <BioEditor bio={bio} updateBio={updateBio} />
        </section>
    );
}
