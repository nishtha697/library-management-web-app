import { createSlice } from "@reduxjs/toolkit";
import {
  markBookAsReturnedThunk,
  createTransactionThunk,
  getAllNotReturnedBooksThunk,
  getAllTransactionsForUser,
} from "../services/loan-thunks";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  loan: [],
  transaction: [],
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

    [markBookAsReturnedThunk.pending]: (state) => {
      state.error = null;
    },
    [markBookAsReturnedThunk.fulfilled]: (state) => {
      state.error = null;
    },
    [markBookAsReturnedThunk.rejected]: (state, action) => {
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

    [getAllTransactionsForUser.pending]: (state) => {
      state.loading = true;
      state.transaction = [];
      state.error = null;
    },
    [getAllTransactionsForUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.transaction = payload;
      state.error = null;
    },
    [getAllTransactionsForUser.rejected]: (state, action) => {
      state.loading = false;
      state.transaction = [];
      state.error = action.error;
    },
  },
});

export default loanSlice.reducer;
