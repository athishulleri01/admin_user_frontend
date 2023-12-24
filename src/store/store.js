import { configureStore } from "@reduxjs/toolkit"
import  useReducer  from "../app/user/userSlice"

import {useSelector} from 'react-redux'

export const store =configureStore({
    reducer:{
        user:useReducer,

    },
    devTools: process.env.NODE_ENV !== 'production',
}) 




