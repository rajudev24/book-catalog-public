import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book, ResponseData, bookData } from "../../interfaces";
type review = {
  id: string;
  review: string;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-virid.vercel.app/api/v1",
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<ResponseData, string>({
      query: (searchTerm) => `/book/get-book/?searchTerm=${searchTerm}`,
    }),
    singleBook: builder.query<Book, string>({
      query: (id: string) => `/book/get-book/${id}`,
    }),
    bookReview: builder.mutation<object, review>({
      query: ({ id, ...data }) => ({
        url: `/book/review/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    addBook: builder.mutation<object, bookData>({
      query: (data) => ({
        url: `/book/create-book`,
        method: "POST",
        body: data,
      }),
    }),
    updateBook: builder.mutation<object, Partial<bookData>>({
      query: ({ id, ...data }) => ({
        url: `/book/${id!}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: builder.mutation<{ success: boolean; id: number }, string>({
      query: (id) => ({
        url: `/book/delete-book/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useSingleBookQuery,
  useBookReviewMutation,
  useAddBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = api;
