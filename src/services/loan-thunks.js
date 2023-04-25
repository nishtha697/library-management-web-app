import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const TRANSACTION_API = "http://localhost:8081/transaction";

export const createTransactionThunk = createAsyncThunk(
  "transaction/createTransaction",
  async (request) => {
    const response = await axios.post(
      `${TRANSACTION_API}/createTransaction`,
      request
    );
    return response.data;
  }
);

export const getAllNotReturnedBooksThunk = createAsyncThunk(
  "transaction/unreturned",
  async ({ username }) => {
    const response = await axios.get(
      `${TRANSACTION_API}/unreturned/${username}`
    );
    return response.data;
  }
);

// export const markBookAsReturnedThunk = createAsyncThunk(
//   "transaction/markBookAsReturned",
//   async ({ transactionId, isbn }) => {
//     const response = await axios.put(
//       `${TRANSACTION_API}/${transactionId}/${isbn}`
//     );
//     return response.data;
//   }
// );
