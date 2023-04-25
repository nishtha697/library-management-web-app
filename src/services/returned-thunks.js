import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BOOKS_API = "http://localhost:8081/transaction";

export const getAllReturnedBooksThunk = createAsyncThunk("transactions/returned", async (username) => {
  const response = await axios.get(`${BOOKS_API}/${username}`);
  return response.data;
});

