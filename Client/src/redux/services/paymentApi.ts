import { Order } from "../../types/order";
import { apiSlice } from "./apiSlice";

type SessionParams = {
    url: string
}

type TOrderID = {
    id: number
}

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCheckoutSession: builder.mutation<SessionParams,null>({
            query: () => ({
                url: "/create-checkout-session",
                method: 'POST',
            }),
            async onQueryStarted(_arg, {queryFulfilled}) {
                try {
                    const res = await queryFulfilled
                    window.location.href = res.data.url
                } catch (error) {
                    
                }
            },
        }),
        getCheckoutSession: builder.query<Order,string>({
            query: (session_id) => ({
                url: `/order/${session_id}`
            })
        }),
        getOrderID: builder.query<TOrderID,string>({
            query: (session_id)=> ({
                url: `/checkout-session/order/${session_id}` 
            })
        })
    }),
})

export const {useCreateCheckoutSessionMutation, useLazyGetCheckoutSessionQuery,useLazyGetOrderIDQuery} = paymentApi