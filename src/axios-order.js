import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-myburger-farid.firebaseio.com/"
});

export default instance;
