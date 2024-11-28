import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import AddClient from "../views/AddClient";
import AddAction from "../views/AddAction";
import Login from "../views/LogIn";
import SignUp from "../views/SignUp";
import SingleClient from "../views/SingleClient";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users/login" element={<Login/>}/>
            <Route path="/users/signup" element={<SignUp/>}/>
            <Route path="/clients/add" element={<AddClient/>}/>
            <Route path="/clients/addaction/:id" element={<AddAction/>}/>
            <Route path="/clients/edit/:id" element={<AddClient/>}/>
            <Route path="/clients/:id" element={<SingleClient/>}/>
        </Routes>
    )
}
export default AppRoutes;