import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchAboutReq = async () => {
  try {
    const url = `/cms/ABOUT`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data;
    const _config = res?.data || null;
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchAboutReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const addAboutReq = async (body: any) => {
  try {
    const url = `/cms/ABOUT`;
    const res = await axiosInstance.put(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addAboutReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const upadteAboutReq = async (id: string, body: any) => {
  try {
    const url = `/cms/ABOUT`;
    const res = await axiosInstance.patch(url, body);
    const _data = res?.data;
    const _msg = res?.data?.message || "Updated successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "upadteAboutReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
