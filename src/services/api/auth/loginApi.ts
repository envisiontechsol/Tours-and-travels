import axiosInstance, { axiosPublic } from "../config";
import { errorHandler } from "../errorHandler";

export const adminLoginReq = async (body: {
  email: string;
  password: string;
}) => {
  try {
    const url = `auth/login`;
    const res = await axiosPublic.post(url, body);
    const _data = res?.data?.data;
    const _msg = res?.data?.message;

    localStorage.setItem("token", res?.data?.data?.accessToken);

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "adminLoginReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
