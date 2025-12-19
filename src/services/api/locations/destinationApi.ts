import { DestinationReqBodyType } from "../../../types/locationTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchDestinationReq = async (
  page: number | string = 1,
  size: number | string = 20
) => {
  try {
    const url = `/destinations?page=${page}&pageSize=${size}`;
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
    const error = errorHandler(err, "fetchDestinationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const addDestinationReq = async (body: any) => {
  try {
    const url = `/destinations`;
    const res = await axiosInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addDestinationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const upadteDestinationReq = async (id: string, body: any) => {
  try {
    const url = `/destinations/${id}`;
    const res = await axiosInstance.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message || "Updated successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "upadteDestinationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const deleteDestinationReq = async (id: string) => {
  try {
    const url = `/destinations/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message || "Deleted successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteDestinationReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
