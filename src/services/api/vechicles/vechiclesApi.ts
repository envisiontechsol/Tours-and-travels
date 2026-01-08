import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

/* -------------------- FETCH VEHICLES -------------------- */
export const fetchVehicleReq = async (
  page: number | string = 1,
  size: number | string = 20
) => {
  try {
    const url = `/vehicles`; //?page=${page}&pageSize=${size}
    const res = await axiosInstance.get(url);

    const _data = res?.data?.data?.rows;
    const _config = res?.data?.data || null;
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchVehicleReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

/* -------------------- ADD VEHICLE -------------------- */
export const addVehicleReq = async (body: any) => {
  try {
    const url = `/vehicles`;
    const res = await axiosInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addVehicleReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

/* -------------------- UPDATE VEHICLE -------------------- */
export const updateVehicleReq = async (id: string, body: any) => {
  try {
    const url = `/vehicles/${id}`;
    const res = await axiosInstance.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const _data = res?.data;
    const _msg = res?.data?.message || "Updated successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateVehicleReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

/* -------------------- DELETE VEHICLE -------------------- */
export const deleteVehicleReq = async (id: string) => {
  try {
    const url = `/vehicles/${id}`;
    const res = await axiosInstance.delete(url);

    const _data = res?.data;
    const _msg = res?.data?.message || "Deleted successfully";

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteVehicleReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
