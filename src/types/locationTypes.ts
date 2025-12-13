export interface DestinationResType {
  id: string;
  name: string;
  slug: string;
  url: string;
  isActive: boolean;
  about: string;
  createdById: string;
  bannerImageUrl: string;
  bannerImageTag: string;
  createdAt: string;
  updatedAt: string;
}

export interface DestinationReqBodyType {
  name: string;
  slug: string;
  isActive: boolean;
  about: string;
  createdById: string;
}
