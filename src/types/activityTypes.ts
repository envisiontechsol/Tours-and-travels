export interface ActivityListResType {
  id: string;
  destinationId: string;
  title: string;
  category: string;
  description: string;
  isActive: boolean;
  priceInINR: string;
  createdAt: string;
  imageUrl: string;
  categoryCode?: number;
  categoryValue?: number;
}
export interface ActivityResType {
  id: string;
  title: string;
  categoryId: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  editable: boolean;
  priceInINR: string;
  destinationId: string;
  bannerImageUrl: string;
  bannerImagetage: string;
  image1Url: string;
  image1tage: string;
  image2Url: string;
  image2tage: string;
  image3Url: string;
  image3tage: string;
  image4Url: string;
  image4tage: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReqBodyType {
  title: string;
  categoryId: string;
  description: string;
  destinationId: string;
  priceInINR: number;
  bannerImageUrl: string;
  bannerImagetage: string;
  image1Url: string;
  image1tage: string;
  image2Url: string;
  image2tage: string;
  image3Url: string;
  image3tage: string;
  image4Url: string;
  image4tage: string;
  editable: boolean;
}

export interface ItineraryActivityResType {
  dayNumber: number;
  id: string;
  title: string;
  category: string;
  priceInINR: string;
  imageUrl: string | null;
  destination: {
    id: string;
    name: string;
    slug: string;
  };
  isEditable: boolean;
}
