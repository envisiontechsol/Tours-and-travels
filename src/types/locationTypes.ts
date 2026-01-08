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
  top10Rank: number;
  createdAt: string;
  updatedAt: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  travelInsuranceIncluded: boolean;
  visaInformationHtml: string;
  insurancePriceInINR: number;
}

export interface DestinationReqBodyType {
  name: string;
  slug: string;
  isActive: boolean;
  about: string;
  createdById: string;
}
