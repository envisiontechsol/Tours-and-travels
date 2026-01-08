export type VehicleResType = {
  id: string;
  name: string;
  description: string;
  numberSeats: number;
  isActive: boolean;
  imageUrl: string | null;
  createdAt: string; // or Date if you parse it
  updatedAt: string; // or Date if you parse it
};
