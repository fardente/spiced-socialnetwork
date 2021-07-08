import Registration from "./Registration";

function Welcome(props) {
    console.log("logging welcome props ", props.userId);
    const loggedIn = props.userId;
    if (loggedIn) {
        return <div>Welcome to the N3tW0Rk</div>;
    }
    return (
        <div>
            <h1>Welcome</h1>
            <Registration />
        </div>
    );
}

export default Welcome;
