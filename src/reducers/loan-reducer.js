import { createSlice } from "@reduxjs/toolkit";
import {
  //   markBookAsReturnedThunk,
  createTransactionThunk,
  getAllNotReturnedBooksThunk,
} from "../services/loan-thunks";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  loan: [],
  error: null,
  loading: false,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {},
  extraReducers: {
    [createTransactionThunk.pending]: (state) => {
      state.error = null;
    },
    [createTransactionThunk.fulfilled]: (state) => {
      state.error = null;
    },
    [createTransactionThunk.rejected]: (state, action) => {
      state.error = action.error;
    },

    [getAllNotReturnedBooksThunk.pending]: (state) => {
      state.loading = true;
      state.loan = [];
      state.error = null;
    },
    [getAllNotReturnedBooksThunk.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loan = payload;
      state.error = null;
    },
    [getAllNotReturnedBooksThunk.rejected]: (state, action) => {
      state.loading = false;
      state.loan = [];
      state.error = action.error;
    },
  },
});

export default loanSlice.reducer;
