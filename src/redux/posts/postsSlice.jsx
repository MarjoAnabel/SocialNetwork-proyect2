import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postsService from "./postsService"

const initialState = {
posts:[],
isLoading: false,
post:{},
error: null,
}

export const getAll = createAsyncThunk("posts/getAll", async () => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.error(error);
  }
})

export const getById = createAsyncThunk("posts/getById", async (id) => {
    try {
      return await postsService.getById(id)
    } catch (error) {
      console.error(error)
    }
  })

  export const getPostByName = createAsyncThunk(
    'posts/getPostByName',
    async (postName) => {
      const response = await axios.get(`/api/posts/name/${postName}`); // Llamada simplificada
      return response.data; // Devuelve los posts
    }
  ); 


  export const like = createAsyncThunk('posts/like', async (_id) => {
    try {
      return await postsService.like(_id)
    } catch (error) {
      console.error(error)
    }
   })
   

  

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
      reset: (state) => {
        state.isLoading = false;
      },
    },
    extraReducers: (builder) => {
      builder.

            addCase(getAll.fulfilled, (state, action) => {
           state.posts = action.payload;
         })

         .addCase(getAll.pending, (state) => {
           state.isLoading = true;
         })
         
         builder.addCase(getById.fulfilled, (state, action) => {
            state.post = action.payload
          })

          .addCase(getPostByName.fulfilled, (state, action) => {
            state.posts = action.payload
          })

          .addCase(like.fulfilled, (state, action) => {
            const posts = state.posts.map((post) => {
              if (post_id === action.payload._id) {
                post = action.payload
              }
              return post
            })
            state.posts = posts
          })
     
          
        
      
    },
  })
  export const { reset } = postsSlice.actions
  export default postsSlice.reducer
