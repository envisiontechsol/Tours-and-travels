import { TopLevelMenuResType } from "../../../types/topLevelMenuTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

export const addTopLevelMenuReq = async (body: { name: string }) => {
  try {
    const reqBody = {
      name: body?.name,
      slug: body?.name?.toLowerCase()?.replace(" ", ""),
      route: "/package",
    };
    const url = `/toplevels`;
    const res = await axiosInstance.post(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "addTopLevelMenuReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const fetchTopLevelMenusReq = async (
  page: number | string,
  size: number | string
) => {
  try {
    const url = `/toplevels`;
    const res = await axiosInstance.get(url);
    const _data = res?.data?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "fetchTopLevelMenusReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const updateTopLevelMenuReq = async (
  id: string,
  body: Partial<TopLevelMenuResType>
) => {
  try {
    const reqBody = body;
    const url = `/toplevels/${id}`;
    const res = await axiosInstance.patch(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "updateTopLevelMenuReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
export const deleteTopLevelMenuReq = async (id: string) => {
  try {
    const url = `/toplevels/${id}`;
    const res = await axiosInstance.delete(url);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "deleteTopLevelMenuReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
