import {createSlice} from '@reduxjs/toolkit'
import { User } from '../../../types'

const initialState = null as User | null

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state,action)=>{
            return state = action.payload
        },
        logOut: (state,_action)=>{
            return state = initialState
        }
    }
})

export const {setCredentials,logOut} = userSlice.actions

export default userSlice.reducer