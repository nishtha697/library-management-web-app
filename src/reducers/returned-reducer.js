import { createSlice } from "@reduxjs/toolkit";
import { getAllReturnedBooksThunk } from "../services/returned-thunks";

const initialState = {
  returned: [],
  error: null,
};

const shoppingCartSlice = createSlice({
  name: "returned",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllReturnedBooksThunk.pending]: (state) => {
      state.returned = [];
      state.error = null;
    },
    [getAllReturnedBooksThunk.fulfilled]: (state, { payload }) => {
      state.returned = payload;
      state.error = null;
    },
    [getAllReturnedBooksThunk.rejected]: (state, action) => {
      state.returned = [];
      state.error = action.error;
    },
  },
});

export default shoppingCartSlice.reducer;
