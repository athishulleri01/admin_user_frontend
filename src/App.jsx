import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Containers/HomePage'
import LoginPage from './Containers/LoginPage'
import RegisterPage from './Containers/RegisterPage'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Login from './Componets/Login/Login'
import Register from './Componets/Register/Register'
import Home from './Componets/Home/Home'
import Admin from './Componets/AdminLogin/Admin'
import AdminDashBord from './Componets/AdminDashBorad/AdminDashBord'
import EditHome from './Componets/Home/EditHome'




const App = () => {


  return (
    <div>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/admin' element={<Admin />} ></Route>
            <Route path='/admindashboard' element={<AdminDashBord />} ></Route>
            <Route path='/loginpage' element={<Login />}></Route>
            <Route path='/registerpage' element={<Register />}></Route>
            <Route path='/edituser' element={<EditHome />}></Route>
          </Routes>
        </Router>
      </Provider>
    </div>
  )
}

export default App




