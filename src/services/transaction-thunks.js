import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const TRANSACTION_API = "http://localhost:8080/transaction";

export const createTransactionThunk = createAsyncThunk(
  "transaction/createTransaction",
  async ({transaction}) => {
    const response = await axios.post(
      `${TRANSACTION_API}/createTransaction`,
      transaction
    );
    return response.data;
  }
);

export const getAllNotReturnedBooksThunk = createAsyncThunk(
  "transaction/unreturned",
  async (username) => {
    const response = await axios.get(
      `${TRANSACTION_API}/unreturned/${username}`
    );
    return response.data;
  }
);

export const getAllTransactionsForUser = createAsyncThunk(
  "transaction/getAllTransaction",
  async (username) => {
    const response = await axios.get(`${TRANSACTION_API}/${username}`);
    return response.data;
  }
);

export const markBookAsReturnedThunk = createAsyncThunk(
  "transaction/markBookAsReturned",
  async ({ transactionId, isbn }) => {
    const response = await axios.put(
      `${TRANSACTION_API}/${transactionId}/book/${isbn}`
    );
    return response.data;
  }
);

export const getAllReturnedBooksThunk = createAsyncThunk(
    "transactions/returned",
    async (username) => {
        const response = await axios.get(`${TRANSACTION_API}/returned/${username}`);
        return response.data;
    }
);
