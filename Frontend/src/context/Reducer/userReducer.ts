import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import client from "../../api/client"

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const res = await client.get("/users")
  return res.data
})

const userReducer = createSlice({
name: "user",
initialState: {users: [], status: "idle"},
reducers: {},
extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
    })
}
})

export default userReducer.reducer