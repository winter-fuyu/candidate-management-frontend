import api from "../api";
import { UserCreateDto } from "./types";

export const remove_user_by_id = async (id: number) => {
  let response = await api.delete("/candidates/" + id);
  return response;
};
export const create_user = async (dto: UserCreateDto) => {
  let response = await api.post("/candidates", {
    ...dto,
  });
  return response;
};
export const update_user = async (dto: UserCreateDto, id: string) => {
  let response = await api.patch("/candidates/" + id, {
    ...dto,
  });
  return response;
};
