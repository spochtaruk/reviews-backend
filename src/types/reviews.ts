export type CreateReviewType = {
  title: string;
  content: string;
  rating: number;
  author: string;
};

export type Filter = {
  author?: string;
  rating?: number;
  search?: string;
};

export type FindOptions = {
  author?: string;
  rating?: number;
  title?: string;
};
