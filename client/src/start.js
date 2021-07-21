import ReactDOM from "react-dom";
import Welcome from "./components/Welcome";
import axios from "./axios";
import App from "./components/App";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./redux/reducers";
import { Provider } from "react-redux";
const store = createStore(reducer, applyMiddleware(reduxPromise));

axios
    .get("/api/user/id.json")
    .then((response) => {
        if (response.data.userId) {
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        } else {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        }
    })
    .catch((error) => {
        console.log(error);
    });
