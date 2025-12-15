import { SlotsCategoryResType } from "../../../types/slotsTypes";
import axiosInstance from "../config";
import { errorHandler } from "../errorHandler";

const getValue = (codeIs: number) => {
  if (codeIs <= 3) return 1;
  if (codeIs > 3 && codeIs <= 5) return 1.5;
};

export const fetchSlotsCategoryReq = async () => {
  try {
    const url = `/categories`;
    const res = await axiosInstance.get(url);
    let _data = [];
    const _config = null;
    if (Array.isArray(res?.data?.data)) {
      _data = res?.data.data.map((item: SlotsCategoryResType) => {
        return {
          ...item,
          value: item?.value || getValue(item?.code),
        };
      });
    }
    const _msg = res?.data?.message;

    return {
      error: false,
      data: _data,
      config: _config,
      message: _msg,
      errorMsg: "",
    };
  } catch (err) {
    const error = errorHandler(err, "fetchSlotsCategoryReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};

export const upadteCategoryReq = async (
  id: string,
  body: { name: string; isActive: boolean }
) => {
  try {
    const reqBody = body;
    const url = `/categories/${id}`;
    const res = await axiosInstance.patch(url, reqBody);
    const _data = res?.data;
    const _msg = res?.data?.message;

    return { error: false, data: _data, message: _msg, errorMsg: "" };
  } catch (err) {
    const error = errorHandler(err, "upadteCategoryReq");
    throw { error: true, data: "", message: "", errorMsg: error };
  }
};
