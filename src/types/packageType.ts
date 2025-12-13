export interface PackageType {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageDurationResType {
  id: string;
  name: string;
  days: number;
  nights: number;
  createdAt: string;
  updatedAt: string;
}
export interface PackageDurationReqBodyType {
  name: string;
  days: number;
  nights: number;
}

export interface TagResType {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  topLevelId: string;
  topLevel: TopLevelTagResType;
}
export interface TopLevelTagResType {
  id: string;
  name: string;
  slug: string;
}
