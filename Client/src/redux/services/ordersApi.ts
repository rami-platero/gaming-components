import { Order } from "../../types/order";
import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[],number | null>({
            query: () => ({
                url: "/orders"
            }),
            transformResponse(baseQueryReturnValue: Order[], _meta, limit) {
                if(limit){
                    return baseQueryReturnValue.slice(0,2)
                } 
                return baseQueryReturnValue
            },
        }),
        getOrder: builder.query<Order,string>({
            query: (id) => ({
                url: `/orders/${id}`
            })
        }),
    })
})

export const {useGetOrdersQuery,useGetOrderQuery} = ordersApi