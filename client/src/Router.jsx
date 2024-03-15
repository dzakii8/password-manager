import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "./pages/Landing-page";
import Login from "./pages/Login";
import LandingPage from "./pages/Landing-page";
import Home from "./pages/Home";
import Register from "./pages/register-pages";
import WaitVerify from "./pages/waitVerify";
import Verify from "./pages/Verify";
import EditPage from "./pages/editPage";

const router = createBrowserRouter([
  {
    path : "/",
    element : <LandingPage/>,
    loader :()=>{
      if (localStorage.access_token) {
        throw redirect('/home')
      } else{
        return null
      }
    }
  },
  {
    path : "/login",
    element : <Login/>,
    loader :()=>{
      if (localStorage.access_token) {
        throw redirect('/home')
      } else{
        return null
      }
    }
  },
  {
    path : "/register",
    element : <Register/>,
    loader :()=>{
      if (localStorage.access_token) {
        throw redirect('/home')
      } else{
        return null
      }
    }
  },
  {
    path : "/verify",
    element : <Verify/>,
    loader :()=>{
      if (localStorage.access_token) {
        throw redirect('/home')
      } else{
        return null
      }
    }
  },
  {
    path : "/home",
    element : <Home/>,
    loader :()=>{
      if (!localStorage.access_token) {
        throw redirect('/login')
      } else{
        return null
      }
    }
  },
  {
    path : "/edit/:id",
    element : <EditPage/>,
    loader :()=>{
      if (!localStorage.access_token) {
        throw redirect('/login')
      } else{
        return null
      }
    }
  },

])

export default router