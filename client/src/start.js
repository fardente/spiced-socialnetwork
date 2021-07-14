import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";
import axios from "./axios";
import App from "./components/App";

axios
    .get("/api/user/id.json")
    .then((response) => {
        if (response.data.userId) {
            ReactDOM.render(<App />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    })
    .catch((error) => {
        console.log(error);
    });
