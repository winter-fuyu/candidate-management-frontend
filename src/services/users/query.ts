import { AxiosResponse } from "axios";
import { User } from "./types";
import api from "../api";

export const get_users = async (value = "", skip = 0, count = 10) => {
  let response: AxiosResponse<{ results: User[]; total: number }> =
    await api.get(
      "/candidates?skip=" + skip + "&count=" + count + "&value=" + value
    );
  return response;
};

export const get_user_by_id = async (id: string) => {
  let response: AxiosResponse<User> = await api.get("/candidates/" + id);
  return response;
};
