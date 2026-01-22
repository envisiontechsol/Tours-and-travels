export interface QuickLinkReqBodyType {
  name: string;
  url: string;
  tourPackageIds: string[];
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
}

export interface QuickLinkResType {
  id: string;
  name: string;
  url: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: {
    id: string;
    name: string;
  }[];
}
