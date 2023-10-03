import { updateAvatar } from "../features/user/authSlice";
import { apiSlice } from "./apiSlice";

type Avatar = {
    avatar:string
}

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadAvatar: builder.mutation<Avatar,FormData>({
            query: (file) => ({
                method: "POST",
                url: "/avatar",
                body: file,
            }),
            onQueryStarted: async (_args, {dispatch,queryFulfilled}) => {
                try {
                    const res = await queryFulfilled
                    dispatch(updateAvatar(res.data.avatar))
                } catch (error) {

                }
            }, 
        }),
        getAvatarSignedURL: builder.query<Avatar,string>({
            query: (avatar) => ({
                url: `/avatar/${avatar}`
            })
        })
    })
})

export const {useUploadAvatarMutation,useLazyGetAvatarSignedURLQuery} = userApi