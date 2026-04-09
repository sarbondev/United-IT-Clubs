import { API_URL } from "../config/config";

export const BASE_URL = API_URL;

export const swrConfig = {
  errorRetryCount: 2,
  errorRetryInterval: 3000,
  revalidateOnFocus: false,
};

export const fetcher = (url) =>
  fetch(`${BASE_URL}${url}`).then((res) => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  });
