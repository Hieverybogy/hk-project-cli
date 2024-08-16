import axios, { AxiosError } from "axios";
import { getToken } from "./sign";
import { ElMessage, ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading.js";

let loading: LoadingInstance | undefined;
let loadingTotal = 0;
const loadingStart = () => {
  if (loadingTotal <= 0) {
    loading?.close();
    loading = ElLoading.service({
      lock: true,
      text: "Loading",
      spinner: "el-icon-loading",
      background: "rgba(0, 0, 0, 0.7)",
      target: "#app",
    });
  }
  loadingTotal++;
};
const loadingEnd = () => {
  loadingTotal--;
  if (loadingTotal <= 0) {
    loading?.close();
    loading = undefined;
  }
};

let lock: number = 0;
const instance = axios.create({
  timeout: 8000,
  timeoutErrorMessage: "请求超时，请稍后再试", // 请求超时时间
  withCredentials: true, // 异步请求携带cookie
});

instance.interceptors.request.use(
  (config) => {
    if (config.showLoading) loadingStart();

    if (getToken()) {
      config.headers["authorization"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    loadingEnd();
    const data = res.data;
    const code = res.status;
    const status = data.code || code;
    const message = data.msg || data.error_description || "未知错误";

    if (res.config.responseType === "blob") return res;

    if (status === 401) {
      if (lock === 1) return false;
      lock === 0 && ElMessage.error(message);
      lock = 1;
      location.href = "/login?callback=" + encodeURIComponent(location.href);
      return Promise.reject(data);
    } else if (status !== 200) {
      ElMessage.error(message);
      return Promise.reject(data);
    }
    lock = 0;
    return res;
  },
  (error: AxiosError) => {
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

// export default instance;

interface IConfig {
  showLoading?: boolean;
  showError?: boolean;
}
export default {
  get<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.get(url, { params, ...options });
  },
  post<T>(
    url: string,
    params?: object,
    options: IConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return instance.post(url, { params, ...options });
  },
};
