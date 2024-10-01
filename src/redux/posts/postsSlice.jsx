import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import postsService from "./postsService"
import axios from "axios"

const initialState = {
posts:[],
isLoading: false,
post:{},
error: null,
}


export const createPost = createAsyncThunk('posts/Postcreate', async (postData, thunkAPI) => {
  try {
    const response = await postsService.create(postData);
    return response;
  } catch (error) {
    const message = error.response?.data?.error || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});
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


  export const likePost = createAsyncThunk('posts/like', async (_id, thunkAPI) => {
    try {
      return await postsService.like(_id); // Asegúrate de que _id es un string válido
    } catch (error) {
      const message = error.response?.data?.error || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  });

   export const dislike = createAsyncThunk('posts/dislike', async (_id) => {
    try {
      return await postsService.dislike(_id)
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

    updatePostLikes: (state, action) => {
      const index = state.posts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = {
          ...state.posts[index],
          likes: action.payload.likes,
        };
      }
    },

    extraReducers: (builder) => {
      builder.

      addCase(createPost.fulfilled, (state, action) => {
        if (action.payload && action.payload._id) {
          state.posts.push(action.payload);
        } else {
          console.error('Post creado sin _id:', action.payload);
        }
      })
      
      .addCase(createPost.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
        .addCase(getAll.fulfilled, (state, action) => {
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
          
         

          .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = {
            ...state.posts[index],
            likes: action.payload.likes,
          };
        }
      })

          // .addCase(dislike.fulfilled, (state, action) => {
          //   const updatedPost = action.payload; // Aquí recibimos el post actualizado con los likes
          //   state.posts = state.posts.map((post) => {
          //     if (post._id === updatedPost._id) {
          //       return {
          //         ...post,  // Mantiene todas las propiedades del post
          //         likes: updatedPost.likes,  // Solo actualiza la propiedad de likes
          //       };
          //     }
          //     return post;
          //   });
          // })
          
        
      
    },
  })
  export const { reset, updatedPost } = postsSlice.actions
  export default postsSlice.reducer
