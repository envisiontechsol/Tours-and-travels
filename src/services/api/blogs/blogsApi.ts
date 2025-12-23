import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchBlogReq = async (
  page: number | string = 1,
  size: number | string = 20
) => {
  try {
    const url = `/blogs`;
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
    const error = errorHandler(err, "fetchBlogReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const addBlogReq = async (body: any) => {
  try {
    const url = `/blogs`;
    const res = await axiosInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addBlogReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const upadteBlogReq = async (id: string, body: any) => {
  try {
    const url = `/blogs/${id}`;
    const res = await axiosInstance.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message || "Updated successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "upadteBlogReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const deleteBlogReq = async (id: string) => {
  try {
    const url = `/blogs/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message || "Deleted successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteBlogReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
