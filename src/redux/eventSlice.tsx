import { createSlice } from "@reduxjs/toolkit";

const initialEventState = {
  userUpdateEvent: false,
};

const EventSlice = createSlice({
  name: "event",
  initialState: initialEventState,
  reducers: {
    setUserUpdateEvent(state) {
      state.userUpdateEvent = !state.userUpdateEvent;
    }
  },
});

export const eventAction = EventSlice.actions;
export const eventReducer = EventSlice.reducer;
