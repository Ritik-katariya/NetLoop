import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatData: [],
  activeChat: null,
  messages: [],
  onlineUsers: {}
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatData: (state, action) => {
      state.chatData = action.payload;
    },
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  }
});

export const { setChatData, setActiveChat, setMessages, addMessage, setOnlineUsers } = chatSlice.actions;

export default chatSlice.reducer;

// Selectors
export const selectMessages = (state) => state.chat.messages;
export const selectActiveChat = (state) => state.chat.activeChat;
export const selectChatData = (state) => state.chat.chatData;
