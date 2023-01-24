import { authReducer } from "./authSlice";
import { eventReducer } from "./eventSlice";
import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export default setupStore;
