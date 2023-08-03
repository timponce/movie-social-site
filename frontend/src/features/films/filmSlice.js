import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import filmService from "./filmService";

const initialState = {
  films: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Popular Films
export const getPopularFilms = createAsyncThunk(
  "films/getAll",
  async (_, thunkAPI) => {
    try {
      return await filmService.getPopularFilms();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPopularFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPopularFilms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.films = action.payload.results;
      })
      .addCase(getPopularFilms.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = filmSlice.actions;
export default filmSlice.reducer;
