import  Axios  from "axios";

const axiosBaseUrl = Axios.create({
    baseURL: "http://localhost:4444/"
})

export default axiosBaseUrl;