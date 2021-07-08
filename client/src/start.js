import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";
import axios from "axios";

axios
    .get("/api/user/id.json")
    .then((response) => {
        ReactDOM.render(
            <Welcome userId={response.data.userId} />,
            document.querySelector("main")
        );
    })
    .catch((error) => {
        console.log(error);
    });
