// blogSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blog } from "@/types/types";

interface BlogState {
  blogs: Blog[];
  currentPage: number;
  totalPages: number;
}

const initialState: BlogState = {
  blogs: [],
  currentPage: 1,
  totalPages: 1,
};

export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setBlogs: (
      state,
      action: PayloadAction<{
        blogs: Blog[];
        currentPage: number;
        totalPages: number;
      }>,
    ) => {
      state.blogs = action.payload.blogs;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
