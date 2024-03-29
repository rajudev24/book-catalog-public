import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/apiSlice";
import UserReducer from "./user/userSlice";
const store = configureStore({
  reducer: {
    user: UserReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
