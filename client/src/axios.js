import axios from "axios";

const instance = axios.create({
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "csrf-token",
});

export default instance;
