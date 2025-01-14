import { createSlice } from "@reduxjs/toolkit";

const companiesSlice = createSlice({
  name: "companies",
  initialState: { loading: false, companies: [], error: null },
  reducers: {
    companiesRequest(state) {
      state.loading = true;
    },
    companiesSuccess(state, action) {
      state.loading = false;
      state.companies = action.payload.companies;
    },
    companiesFail(state, action) {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

// Export actions and reducer
export const { companiesRequest, companiesSuccess, companiesFail } =
  companiesSlice.actions;
export default companiesSlice.reducer;
