import { createSlice } from "@reduxjs/toolkit";
import {
    getAllReturnedBooksThunk
} from "../services/returned-thunks";

const initialState = {
    books: [],
    error: null
}

const shoppingCartSlice = createSlice(
    {
        name: 'returned',
        initialState,
        reducers: {},
        extraReducers: {
            [getAllReturnedBooksThunk.pending]:
                (state) => {
                    state.books = {}
                    state.error = null
                },
            [getAllReturnedBooksThunk.fulfilled]:
                (state, { payload }) => {
                    state.books = payload
                    state.error = null
                },
            [getAllReturnedBooksThunk.rejected]:
                (state, action) => {
                    state.books = {}
                    state.error = action.error
                },
            
        }
    });

export default shoppingCartSlice.reducer;
