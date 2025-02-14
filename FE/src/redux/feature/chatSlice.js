import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  chatData: [],
  activeChat: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    clearChat(state) {
      state.messages = [];
    },
    setActiveChat(state, action) {
      state.activeChat = action.payload;
    },
    setChatData(state, action) {
      state.chatData = action.payload;
    },
  },
});

export const { setMessages, clearChat, setActiveChat, setChatData } = chatSlice.actions;
export default chatSlice.reducer;

// Selectors
export const selectMessages = (state) => state.chat.messages;
export const selectActiveChat = (state) => state.chat.activeChat;
export const selectChatData = (state) => state.chat.chatData;
