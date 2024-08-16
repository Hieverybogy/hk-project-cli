import type { Dept } from "@/types/index";
import axios from "@/utils/axios";

export const fetchShopPageData = (params: Dept.Params) => {
  return axios.post("/users/login", params, { showLoading: false });
};
