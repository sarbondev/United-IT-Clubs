import { API_URL } from "../lib/config";

export const fetcher = (url) => {
  const token = localStorage.getItem("uitctoken") || "";
  return fetch(`${API_URL}${url}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  });
};
