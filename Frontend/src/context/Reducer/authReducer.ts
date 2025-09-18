import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import client from "../../api/client"

export const login = createAsyncThunk("auth/login", async (data: {email: string, password: string}) => {
    const res = await client.post("/auth/login", data)
    return res.data
})

export const register = createAsyncThunk("auth/register", async (data: {name: string, email: string, password: string}) => {
    const res = await client.post("/auth/register", data)
    return res.data
})

const authReducer = createSlice({
    name: "auth",
    initialState: {user: null, token: null, status:"idle"},
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
        })
    }
}) 

export const {logout} = authReducer.actions
export default authReducer.reducer