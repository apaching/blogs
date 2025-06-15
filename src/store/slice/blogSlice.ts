import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "@/types/types";

interface BlogState {
  blogs: Blog[];
}

const initialState: BlogState = {
  blogs: [],
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (
      state,
      action: PayloadAction<{
        blogs: Blog[];
      }>,
    ) => {
      state.blogs = action.payload.blogs;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
