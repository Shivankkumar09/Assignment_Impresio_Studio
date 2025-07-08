import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PhotographerState {
  photographers: any[];
  filters: {
    city: string;
    rating: number;
    styles: string[];
    search: string;
    sort: string;
  };
}

const initialState: PhotographerState = {
  photographers: [],
  filters: {
    city: "",
    rating: 0,
    styles: [],
    search: "",
    sort: "",
  },
};

const photographerSlice = createSlice({
  name: "photographer",
  initialState,
  reducers: {
    setPhotographers: (state, action: PayloadAction<any[]>) => {
      state.photographers = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<PhotographerState["filters"]>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setPhotographers, setFilters } = photographerSlice.actions;
export default photographerSlice.reducer;
