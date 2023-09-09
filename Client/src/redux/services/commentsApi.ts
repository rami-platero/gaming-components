import { apiSlice } from "./apiSlice";

export const commentsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      deleteComment: builder.mutation<null, null>({
        query: () => ({
          url: `/comments/${8}`,
          method: "DELETE",
        }),
      }),
  })
})

export const {useDeleteCommentMutation} = commentsApiSlice