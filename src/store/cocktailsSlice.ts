import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CocktailCardType } from "../components/coctail-card/types";

const API = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

interface CocktailState {
  data: Record<string, CocktailCardType[] | null>;
  loading: boolean;
  error: string | null;
  cocktailList: string[];
}

const initialState: CocktailState = {
  data: {},
  loading: false,
  error: null,
  cocktailList: ["margarita", "mojito", "a1", "kir"],
};

export const fetchCocktail = createAsyncThunk<
  { cocktailCode: string; drinks: CocktailCardType[] | null },
  string,
  { state: { cocktails: CocktailState } }
>(
  "cocktails/fetchCocktail",
  async (cocktailCode, { getState, rejectWithValue }) => {
    const state = getState();
    const existingCocktail = state.cocktails.data[cocktailCode];

    if (existingCocktail) {
      return { cocktailCode, drinks: existingCocktail };
    }

    try {
      const response = await axios.get(`${API}${cocktailCode}`);
      return { cocktailCode, drinks: response.data.drinks || null };
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError).response?.data || "Ошибка запроса",
      );
    }
  },
);

const cocktailsSlice = createSlice({
  name: "cocktails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCocktail.fulfilled, (state, action) => {
        state.loading = false;
        const { cocktailCode, drinks } = action.payload;
        state.data[cocktailCode] = drinks;
      })
      .addCase(fetchCocktail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cocktailsSlice.reducer;
