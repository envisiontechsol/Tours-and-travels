import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchTourPackagesReq = async (
  page: number | string,
  size: number | string
) => {
  try {
    const url = `/tour-packages?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url);
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
    const error = errorHandler(err, "fetchTourPackagesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const addTourPackageReq = async (body: any) => {
  try {
    const url = `/tour-packages`;
    const res = await axiosInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addTourPackageReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const updateTourPackageReq = async (id: string, body: any) => {
  try {
    const url = `/tour-packages/${id}`;
    const res = await axiosInstance.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateTourPackageReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
