import { create } from "zustand";
import { DestinationResType } from "../types/locationTypes";
import { ActivityResType } from "../types/activityTypes";
import {
  PackageDurationResType,
  PackageType,
  TagResType,
} from "../types/packageType";
import { TourPackageResType } from "../types/tourTypes";
import { SlotsCategoryResType } from "../types/slotsTypes";
import { TopLevelMenuResType } from "../types/topLevelMenuTypes";

interface EditMgmtStore {
  editiDestinationData: DestinationResType | null;
  editiActivityData: ActivityResType | null;
  editiPackageDurationData: PackageDurationResType | null;
  editiPackageTypeData: PackageType | null;
  editTagData: TagResType | null;
  editTourPackageData: TourPackageResType | null;
  editSlotCategoryData: SlotsCategoryResType | null;
  editTopLeveleMenuData: TopLevelMenuResType | null;

  setDestination: (v: DestinationResType | null) => void;
  setActivity: (v: ActivityResType | null) => void;
  setPackageDuration: (v: PackageDurationResType | null) => void;
  setPackageType: (v: PackageType | null) => void;
  setTag: (v: TagResType | null) => void;
  setTourPackage: (v: TourPackageResType | null) => void;
  setSlotCategory: (v: SlotsCategoryResType | null) => void;
  setTopLevelMenu: (v: TopLevelMenuResType | null) => void;

  clearAll: () => void;
}

export const useEditMgmtStore = create<EditMgmtStore>((set) => ({
  editiDestinationData: null,
  editiActivityData: null,
  editiPackageDurationData: null,
  editiPackageTypeData: null,
  editTagData: null,
  editTourPackageData: null,
  editSlotCategoryData: null,
  editTopLeveleMenuData: null,

  setDestination: (v) => set({ editiDestinationData: v }),
  setActivity: (v) => set({ editiActivityData: v }),
  setPackageDuration: (v) => set({ editiPackageDurationData: v }),
  setPackageType: (v) => set({ editiPackageTypeData: v }),
  setTag: (v) => set({ editTagData: v }),
  setTourPackage: (v) => set({ editTourPackageData: v }),
  setSlotCategory: (v) => set({ editSlotCategoryData: v }),
  setTopLevelMenu: (v) => set({ editTopLeveleMenuData: v }),

  clearAll: () =>
    set({
      editiDestinationData: null,
      editiActivityData: null,
      editiPackageDurationData: null,
      editiPackageTypeData: null,
      editTagData: null,
      editTourPackageData: null,
      editSlotCategoryData: null,
      editTopLeveleMenuData: null,
    }),
}));

export const editDestinationAction = (v: DestinationResType) =>
  useEditMgmtStore.getState().setDestination(v);
export const closeDestinationEditAction = () =>
  useEditMgmtStore.getState().setDestination(null);

export const editActivityAction = (v: ActivityResType) =>
  useEditMgmtStore.getState().setActivity(v);
export const closeActivityEditAction = () =>
  useEditMgmtStore.getState().setActivity(null);

export const editPackageDurationAction = (v: PackageDurationResType) =>
  useEditMgmtStore.getState().setPackageDuration(v);
export const closePackageDurationEditAction = () =>
  useEditMgmtStore.getState().setPackageDuration(null);

export const editPackageTypeAction = (v: PackageType) =>
  useEditMgmtStore.getState().setPackageType(v);
export const closePackageTypeEditAction = () =>
  useEditMgmtStore.getState().setPackageType(null);

export const editTagAction = (v: TagResType) =>
  useEditMgmtStore.getState().setTag(v);
export const closeTagEditAction = () =>
  useEditMgmtStore.getState().setTag(null);

export const editTourPackageAction = (v: TourPackageResType) =>
  useEditMgmtStore.getState().setTourPackage(v);
export const closeTourPackageEditAction = () =>
  useEditMgmtStore.getState().setTourPackage(null);

export const editSlotCategoryAction = (v: SlotsCategoryResType) =>
  useEditMgmtStore.getState().setSlotCategory(v);
export const closeSlotCategoryEditAction = () =>
  useEditMgmtStore.getState().setSlotCategory(null);

export const editTopLeveleMenuAction = (v: TopLevelMenuResType) =>
  useEditMgmtStore.getState().setTopLevelMenu(v);
export const closeTopLeveleMenuEditAction = () =>
  useEditMgmtStore.getState().setTopLevelMenu(null);

export const closeAllEditAction = () => {
  useEditMgmtStore.getState().clearAll();
};
