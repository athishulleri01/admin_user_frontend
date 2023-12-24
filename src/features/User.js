import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {API_URL} from '../config/index'
  const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  registered: false,
};

const register = createAsyncThunk('users/register',async ({first_name,last_name,email,password})=>{
  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password
  })
  try{
    const res = await fetch(`${API_URL}/api/users/register`)
  }
  catch{

  }
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetRegistered: (state) => {
      state.registered = false;
    },
  },
});

export const { resetRegistered } = userSlice.actions;
export default userSlice.reducer;
