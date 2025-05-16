export interface Root {
  items: Item[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface Item {
  id: number;
  title: string;
  blog_image_url: string;
  content: string;
  author: string;
  category_name: string;
  createdAt: string;
  updatedAt: string;
}
