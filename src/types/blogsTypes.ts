export interface BlogPostResType {
  id: string;
  postTitle: string;
  blogUrl: string;
  createdBy: string;
  featuredImageUrl: string | null;
  showComments: boolean;
  showHome: boolean;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}
