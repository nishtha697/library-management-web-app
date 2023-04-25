import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const TRANSACTION_API = "http://localhost:8081/transaction";

export const getAllReturnedBooksThunk = createAsyncThunk(
  "transactions/returned",
  async (username) => {
    const response = await axios.get(`${TRANSACTION_API}/returned/${username}`);
    return response.data;
  }
);
