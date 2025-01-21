import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload.messages;
    },
    clearChat(state) {
      state.messages = [];
    }
  }
});

export const { setMessages, clearChat } = chatSlice.actions;

// Corrected export of the reducer
export default chatSlice.reducer;

// Selector to select messages
export const selectMessage = (state) => state.chat.messages;
