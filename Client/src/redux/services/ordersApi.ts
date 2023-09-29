import { Order } from "../../types/order";
import { apiSlice } from "./apiSlice";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrders: builder.query<Order[],null>({
            query: () => ({
                url: "/orders"
            })
        }),
        getOrder: builder.query<Order,string>({
            query: (id) => ({
                url: `/orders/${id}`
            })
        }),
    })
})

export const {useGetOrdersQuery,useGetOrderQuery} = ordersApi