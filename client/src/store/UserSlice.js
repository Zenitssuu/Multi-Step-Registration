import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:{
    token:"",
    data:{},
  }
}

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      //payload will contain all the data including jwt token
      state.user.token = action.payload;     
      localStorage.setItem('token', action.payload);
    },
    setData : (state,action)=>{
      state.user.data = action.payload;
    },
    logout: (state, action) => {
      state.user.token="";
      state.user.data={}; 
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout, setData } = userSlice.actions;

export default userSlice.reducer;
