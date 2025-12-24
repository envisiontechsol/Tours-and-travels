import { create } from "zustand";

/* -------------------- TYPES -------------------- */
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
import { BlogPostResType } from "../types/blogsTypes";
import { ReviewResType } from "../types/reviewsTypes";
import { UserItinerayListResType } from "../types/user-itinerary-types";

/* -------------------- STORE INTERFACE -------------------- */
interface EditMgmtStore {
  /* -------- EDIT DATA -------- */
  editiDestinationData: DestinationResType | null;
  editiActivityData: ActivityResType | null;
  editiPackageDurationData: PackageDurationResType | null;
  editiPackageTypeData: PackageType | null;
  editTagData: TagResType | null;
  editTourPackageData: TourPackageResType | null;
  editSlotCategoryData: SlotsCategoryResType | null;
  editTopLeveleMenuData: TopLevelMenuResType | null;
  editBlogData: BlogPostResType | null;
  editReviewData: ReviewResType | null;

  /* -------- VIEW DATA -------- */
  viewDestinationData: DestinationResType | null;
  viewActivityData: ActivityResType | null;
  viewPackageDurationData: PackageDurationResType | null;
  viewPackageTypeData: PackageType | null;
  viewTagData: TagResType | null;
  viewTourPackageData: TourPackageResType | null;
  viewSlotCategoryData: SlotsCategoryResType | null;
  viewTopLeveleMenuData: TopLevelMenuResType | null;
  viewBlogData: BlogPostResType | null;
  viewReviewData: ReviewResType | null;
  viewUserItineraryData: UserItinerayListResType | null;

  /* -------- EDIT SETTERS -------- */
  setDestination: (v: DestinationResType | null) => void;
  setActivity: (v: ActivityResType | null) => void;
  setPackageDuration: (v: PackageDurationResType | null) => void;
  setPackageType: (v: PackageType | null) => void;
  setTag: (v: TagResType | null) => void;
  setTourPackage: (v: TourPackageResType | null) => void;
  setSlotCategory: (v: SlotsCategoryResType | null) => void;
  setTopLevelMenu: (v: TopLevelMenuResType | null) => void;
  setBlog: (v: BlogPostResType | null) => void;
  setReview: (v: ReviewResType | null) => void;

  /* -------- VIEW SETTERS -------- */
  setViewDestination: (v: DestinationResType | null) => void;
  setViewActivity: (v: ActivityResType | null) => void;
  setViewPackageDuration: (v: PackageDurationResType | null) => void;
  setViewPackageType: (v: PackageType | null) => void;
  setViewTag: (v: TagResType | null) => void;
  setViewTourPackage: (v: TourPackageResType | null) => void;
  setViewSlotCategory: (v: SlotsCategoryResType | null) => void;
  setViewTopLevelMenu: (v: TopLevelMenuResType | null) => void;
  setViewBlog: (v: BlogPostResType | null) => void;
  setViewReview: (v: ReviewResType | null) => void;
  setViewUserItinerary: (v: UserItinerayListResType | null) => void;

  clearAllEdit: () => void;
  clearAllView: () => void;
}

/* -------------------- STORE -------------------- */
export const useEditMgmtStore = create<EditMgmtStore>((set) => ({
  /* -------- EDIT STATE -------- */
  editiDestinationData: null,
  editiActivityData: null,
  editiPackageDurationData: null,
  editiPackageTypeData: null,
  editTagData: null,
  editTourPackageData: null,
  editSlotCategoryData: null,
  editTopLeveleMenuData: null,
  editBlogData: null,
  editReviewData: null,

  /* -------- VIEW STATE -------- */
  viewDestinationData: null,
  viewActivityData: null,
  viewPackageDurationData: null,
  viewPackageTypeData: null,
  viewTagData: null,
  viewTourPackageData: null,
  viewSlotCategoryData: null,
  viewTopLeveleMenuData: null,
  viewBlogData: null,
  viewReviewData: null,
  viewUserItineraryData: null,

  /* -------- EDIT SETTERS -------- */
  setDestination: (v) => set({ editiDestinationData: v }),
  setActivity: (v) => set({ editiActivityData: v }),
  setPackageDuration: (v) => set({ editiPackageDurationData: v }),
  setPackageType: (v) => set({ editiPackageTypeData: v }),
  setTag: (v) => set({ editTagData: v }),
  setTourPackage: (v) => set({ editTourPackageData: v }),
  setSlotCategory: (v) => set({ editSlotCategoryData: v }),
  setTopLevelMenu: (v) => set({ editTopLeveleMenuData: v }),
  setBlog: (v) => set({ editBlogData: v }),
  setReview: (v) => set({ editReviewData: v }),

  /* -------- VIEW SETTERS -------- */
  setViewDestination: (v) => set({ viewDestinationData: v }),
  setViewActivity: (v) => set({ viewActivityData: v }),
  setViewPackageDuration: (v) => set({ viewPackageDurationData: v }),
  setViewPackageType: (v) => set({ viewPackageTypeData: v }),
  setViewTag: (v) => set({ viewTagData: v }),
  setViewTourPackage: (v) => set({ viewTourPackageData: v }),
  setViewSlotCategory: (v) => set({ viewSlotCategoryData: v }),
  setViewTopLevelMenu: (v) => set({ viewTopLeveleMenuData: v }),
  setViewBlog: (v) => set({ viewBlogData: v }),
  setViewReview: (v) => set({ viewReviewData: v }),
  setViewUserItinerary: (v) => set({ viewUserItineraryData: v }),

  /* -------- CLEAR -------- */
  clearAllEdit: () =>
    set({
      editiDestinationData: null,
      editiActivityData: null,
      editiPackageDurationData: null,
      editiPackageTypeData: null,
      editTagData: null,
      editTourPackageData: null,
      editSlotCategoryData: null,
      editTopLeveleMenuData: null,
      editBlogData: null,
      editReviewData: null,
    }),

  clearAllView: () =>
    set({
      viewDestinationData: null,
      viewActivityData: null,
      viewPackageDurationData: null,
      viewPackageTypeData: null,
      viewTagData: null,
      viewTourPackageData: null,
      viewSlotCategoryData: null,
      viewTopLeveleMenuData: null,
      viewBlogData: null,
      viewReviewData: null,
      viewUserItineraryData: null,
    }),
}));

/* -------------------- EDIT ACTIONS -------------------- */
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

export const editBlogAction = (v: BlogPostResType) =>
  useEditMgmtStore.getState().setBlog(v);
export const closeBlogEditAction = () =>
  useEditMgmtStore.getState().setBlog(null);

export const editReviewAction = (v: ReviewResType) =>
  useEditMgmtStore.getState().setReview(v);
export const closeReviewEditAction = () =>
  useEditMgmtStore.getState().setReview(null);

/* -------------------- VIEW ACTIONS -------------------- */
export const viewDestinationAction = (v: DestinationResType) =>
  useEditMgmtStore.getState().setViewDestination(v);
export const closeDestinationViewAction = () =>
  useEditMgmtStore.getState().setViewDestination(null);

export const viewActivityAction = (v: ActivityResType) =>
  useEditMgmtStore.getState().setViewActivity(v);
export const closeActivityViewAction = () =>
  useEditMgmtStore.getState().setViewActivity(null);

export const viewPackageDurationAction = (v: PackageDurationResType) =>
  useEditMgmtStore.getState().setViewPackageDuration(v);
export const closePackageDurationViewAction = () =>
  useEditMgmtStore.getState().setViewPackageDuration(null);

export const viewPackageTypeAction = (v: PackageType) =>
  useEditMgmtStore.getState().setViewPackageType(v);
export const closePackageTypeViewAction = () =>
  useEditMgmtStore.getState().setViewPackageType(null);

export const viewTagAction = (v: TagResType) =>
  useEditMgmtStore.getState().setViewTag(v);
export const closeTagViewAction = () =>
  useEditMgmtStore.getState().setViewTag(null);

export const viewTourPackageAction = (v: TourPackageResType) =>
  useEditMgmtStore.getState().setViewTourPackage(v);
export const closeTourPackageViewAction = () =>
  useEditMgmtStore.getState().setViewTourPackage(null);

export const viewSlotCategoryAction = (v: SlotsCategoryResType) =>
  useEditMgmtStore.getState().setViewSlotCategory(v);
export const closeSlotCategoryViewAction = () =>
  useEditMgmtStore.getState().setViewSlotCategory(null);

export const viewTopLeveleMenuAction = (v: TopLevelMenuResType) =>
  useEditMgmtStore.getState().setViewTopLevelMenu(v);
export const closeTopLeveleMenuViewAction = () =>
  useEditMgmtStore.getState().setViewTopLevelMenu(null);

export const viewBlogAction = (v: BlogPostResType) =>
  useEditMgmtStore.getState().setViewBlog(v);
export const closeBlogViewAction = () =>
  useEditMgmtStore.getState().setViewBlog(null);

export const viewReviewAction = (v: ReviewResType) =>
  useEditMgmtStore.getState().setViewReview(v);
export const closeReviewViewAction = () =>
  useEditMgmtStore.getState().setViewReview(null);

export const viewUserItineraryAction = (v: UserItinerayListResType) =>
  useEditMgmtStore.getState().setViewUserItinerary(v);
export const closeUserItineraryViewAction = () =>
  useEditMgmtStore.getState().setViewUserItinerary(null);

/* -------------------- GLOBAL CLOSE -------------------- */
export const closeAllEditAction = () =>
  useEditMgmtStore.getState().clearAllEdit();

export const closeAllViewAction = () =>
  useEditMgmtStore.getState().clearAllView();
