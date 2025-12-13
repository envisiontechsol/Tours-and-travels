import { ActivityListResType } from "../../../types/activityTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const fetchActivitiesReq = async (
  page: number | string,
  size: number | string
) => {
  try {
    const url = `/activities?page=${page}&pageSize=${size}`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data || [];
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
    const error = errorHandler(err, "fetchActivitiesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const fetchActivitiesByTourIdReq = async (tourId: string) => {
  try {
    const url = `/tour-packages/${tourId}/activities`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data || [];
    const _config = null;
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchActivitiesByTourIdReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const addActivityReq = async (body: any) => {
  try {
    const url = `/activities`;
    const res = await axiosInstance.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addActivityReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const updateActivityReq = async (id: string, body: any) => {
  try {
    const url = `/activities/${id}`;
    const res = await axiosInstance.patch(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateActivityReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

const getCodeAndValue = (cat: string) => {
  let code = 0;
  let value = 0;
  switch (cat?.toLowerCase()) {
    case "morning":
      code = 1;
      value = 1;
      break;
    case "afternoon":
      code = 2;
      value = 1;
      break;
    case "evening":
      code = 3;
      value = 1;
      break;
    case "firsthalf":
      code = 4;
      value = 1.5;
      break;
    case "secondhalf":
      code = 5;
      value = 1.5;
      break;

    default:
      code = 0;
      value = 0;
      break;
  }
  return {
    code,
    value,
  };
};

export const fetchActivitiesByCatReq = async (
  categoryCode: number,
  destinationId: string
) => {
  try {
    const url = `/activities/by-category?destinationId=${destinationId}&categoryCode=${categoryCode}`;
    const res = await axiosInstance.get(url);

    let _data = [];

    if (Array.isArray(res?.data?.items)) {
      _data = res?.data?.items?.map((i: ActivityListResType) => {
        return {
          ...i,
          categoryCode: i.categoryCode || getCodeAndValue(i.category).code,
          categoryValue: i.categoryValue || getCodeAndValue(i.category).value,
        };
      });
    }

    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "fetchActivitiesReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
