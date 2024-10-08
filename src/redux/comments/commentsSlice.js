import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentsService from './commentsService'

const initialState = {
 comments: [],
}

export const getAll = createAsyncThunk('comments/getAll', async () => {
 try {
   return await commentsService.getAll()
 } catch (error) {
   console.error(error)
 }
})

export const commentsSlice = createSlice({
 name: 'comments',
 initialState,
 reducers: {},
 extraReducers: (builder) => {
   builder.addCase(getAll.fulfilled, (state, action) => {
     state.comments = action.payload
   })
 },
})
export default commentsSlice.reducer