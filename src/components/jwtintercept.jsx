import axios from "axios";

const jwtInterceptor = axios.create({});

jwtInterceptor.interceptors.response.use(
  (res) => {
    return res;
  },

  async (error) => {
    if (error?.response?.status === 401 || 403) {
      await axios
        .get("http://127.0.0.1:3500/refresh", {
          withCredentials: true,
        })
        .catch((refresherror) => {
          localStorage.removeItem("userProfile");
          localStorage.removeItem("token");
          return Promise.reject(refresherror);
        });
      return axios(error.config);
    }
  }
);
export default jwtInterceptor;
