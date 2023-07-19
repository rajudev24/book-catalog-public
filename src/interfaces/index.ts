export interface bookData {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}
export interface Book {
  data: bookData;
}
export interface ResponseData {
  statusCode: number;
  success: string;
  message: string;
  data: bookData[];
}
