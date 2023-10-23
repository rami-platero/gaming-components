import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import config from "../../config/config";
import { Review } from "../../types/reviews";
import { apiSlice } from "./apiSlice";
import { productsApi } from "./productsApi";

type Params = {
  offset: number;
  id: number;
  date: number;
};

export type PostReviewParams = {
  id: number;
  review: {
    body: string;
    rating: number;
  };
  slug: string;
};

export type RemoveReviewParams = {
  id: number;
  product_id: number;
  slug: string;
  oldRating: number;
};

export type EditReviewParams = {
  id: number;
  body: string;
};

type TGetReviews = {
  reviews: Review[];
  hasNextPage: boolean;
};

export const reviewsApi = createApi({
  reducerPath: "reviewsAPI",
  tagTypes: ["Reviews"],
  baseQuery: fetchBaseQuery({
    baseUrl: config.API_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getReviews: builder.query<TGetReviews, Params>({
      query: (params) => ({
        url: `/reviews/${params?.id}/?offset=${
          params?.offset
        }&date=${params.date.toString()}`,
      }),
      providesTags: ["Reviews"],
      serializeQueryArgs: ({ queryArgs }) => {
        return { id: queryArgs?.id };
      },
      merge: (currentCache, newItems, { arg }) => {
        if (arg?.offset === 0) {
          currentCache.hasNextPage = newItems.hasNextPage;
          currentCache.reviews = newItems.reviews;
        } else {
          currentCache.hasNextPage = newItems.hasNextPage;
          currentCache.reviews.push(...newItems.reviews);
        }
        return currentCache;
      },
      forceRefetch({ endpointState }) {
        if (
          endpointState &&
          endpointState.data &&
          typeof endpointState?.data === "object" &&
          "hasNextPage" in endpointState?.data
        ) {
          return endpointState.data.hasNextPage === true;
        }
        return true;
      },
    }),
  }),
});

export const authReviewsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postReview: builder.mutation<Review, PostReviewParams>({
      query: (params) => ({
        url: `/reviews/${params.id}`,
        body: {
          ...params.review,
        },
        method: "POST",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            reviewsApi.util.updateQueryData(
              "getReviews",
              { id: data.product_id, offset: 0, date: 0 },
              (draft) => {
                draft.reviews.splice(0, 0, data);
              }
            )
          );
          // update product rating avg and amount
          dispatch(
            productsApi.util.updateQueryData(
              "getSingleProduct",
              args.slug,
              (draft) => {
                if (draft.rating.amount === 0) {
                  draft.rating.amount = 1;
                  draft.rating.avg = data.rating;
                } else {
                  const newAmount = draft.rating.amount + 1;
                  draft.rating.avg =
                    (draft.rating.avg * draft.rating.amount + data.rating) /
                    newAmount;
                  draft.rating.amount = newAmount;
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
    removeReview: builder.mutation<null, RemoveReviewParams>({
      query: (params) => ({
        url: `/reviews/${params.id}`,
        method: "DELETE",
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(
            reviewsApi.util.updateQueryData(
              "getReviews",
              { id: args.product_id, offset: 0, date: 0 },
              (draft) => {
                draft.reviews = draft.reviews.filter((review) => {
                  return review.id !== args.id;
                });
              }
            )
          );

          // update product rating avg and amount
          dispatch(
            productsApi.util.updateQueryData(
              "getSingleProduct",
              args.slug,
              (draft) => {
                if(draft.rating.amount === 1){
                  draft.rating.amount = 0
                  draft.rating.avg = 0
                } else {
                  const newAmount = draft.rating.amount - 1;
                  draft.rating.avg =
                    (draft.rating.avg * draft.rating.amount - args.oldRating) /
                    newAmount;
                  draft.rating.amount = newAmount;
                }
              }
            )
          );
        } catch (error) {}
      },
    }),
    editReview: builder.mutation<null, EditReviewParams>({
      query: (params) => ({
        url: `/reviews/${params.id}`,
        method: "PUT",
        body: {
          body: params.body,
        },
      }),
    }),
  }),
});

export const { useGetReviewsQuery, useLazyGetReviewsQuery } = reviewsApi;

export const {
  usePostReviewMutation,
  useRemoveReviewMutation,
  useEditReviewMutation,
} = authReviewsApi;
