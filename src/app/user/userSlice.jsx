import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi } from './userApi';
import { jwtDecode } from 'jwt-decode';


export const userRegistation = createAsyncThunk('user/register', async (userData) => {
    const response = await userApi.register(userData)

    console.log("This is the data from the backend", response)

    return response

});

export const userLogin = createAsyncThunk('user/login', async (userData) => {
    try {
        const response = await userApi.login(userData);
        const accessToken = response.access;
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.is_admin) {
            localStorage.setItem('jwtTokenadmin', accessToken);
        } else {
            localStorage.setItem('jwtToken', accessToken);
        }
        return decodedToken;
    } catch (error) {
        throw error;
    }
});


export const superUserLogin = createAsyncThunk('superUser/login', async (userData) => {
    try {
        const response = await userApi.login(userData);
        const accessToken = response.access;
        const decodedToken = jwtDecode(accessToken);
      
            localStorage.setItem('jwtToken', accessToken);
       
        return decodedToken;
    } catch (error) {
        throw error;
    }
});
 

const userSlice = createSlice({
    name: 'user',
    initialState: { superuser: null, user: null, error: (null) },
    reducers: {
        login: (state, action) => {

            if (!action.payload.is_admin) {
                state.user = action.payload;
                state.superuser = null;
            } else {
                state.superuser = action.payload;
                state.user = null;

            }
        },
        logout: (state) => {
            if (state.user){
                state.user = null;
            }else{
                state.superuser = null;
            }
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        updateSuperUser: (state, action) => {
            state.superuser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegistation.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(userRegistation.rejected, (state, action) => {
                state.user = null;
                state.error = action.error.message;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                if (!action.payload.is_admin) {
                    state.user = action.payload;
                    state.superuser = null;
                }
            })
            .addCase(superUserLogin.fulfilled, (state, action) => {
                if (action.payload.is_admin) {
                    state.superuser = action.payload;
                    state.user = null;
                }
            })
            .addCase(updateUser, (state, action) => {
                state.user = action.payload;
            });
    }
})

export default userSlice.reducer;
export const { login, logout, updateUser,updateSuperUser } = userSlice.actions;