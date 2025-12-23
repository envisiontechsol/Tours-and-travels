interface Tag {
  id: string;
  name: string;
  topLevelId: string;
  createdAt: string;
  updatedAt: string;
}

interface TagLink {
  reviewId: string;
  tagId: string;
  tag: Tag;
}

export interface ReviewResType {
  id: string;
  name: string;
  rating: number;
  location: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
  tagLinks: TagLink[];
}
