import axios from "axios";
export default axios.create({
    baseURL: "https://h47fpq-3000.csb.app/",
    headers: {
        "Content-type": "application/json"
    }
  /*headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }*/
});
