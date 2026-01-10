import { message } from "antd";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";
import { userDataDummy } from "./dummyData";

export const fetchUsersReq = async (
  page: number | string = 1,
  size: number | string = 20
) => {
  try {
    const url = `/users-permissions?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url); //{ data: userDataDummy, message: "" }; //
    const _data = res?.data?.data;
    const _config = res?.data;
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchUsersReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const addUsersReq = async (body: {
  email: string;
  password: string;
  name: string;
  phone: string;
}) => {
  try {
    const reqBody = body;
    const url = `/admins`;
    const res = await axiosInstance.post(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addUsersReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const updateUsersReq = async (
  id: string,
  body: {
    email: string;
    password?: string;
    name: string;
    phone: string;
  }
) => {
  try {
    const reqBody = body;
    const url = `/admins/${id}`;
    const res = await axiosInstance.patch(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateUsersReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const updateUsersPermissionsReq = async (
  id: string,
  body: {
    permissions: {
      module: string;
      actions: ("VIEW" | "ADD" | "EDIT" | "DELETE")[];
    }[];
  }
) => {
  try {
    const reqBody = body;
    const url = `/admins/${id}/permissions`;
    const res = await axiosInstance.put(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateUsersPermissionsReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const deleteUsersReq = async (id: string) => {
  try {
    const url = `/admins/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteUsersReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
