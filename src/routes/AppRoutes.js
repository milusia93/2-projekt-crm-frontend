import { Route, Routes } from "react-router-dom";
import Home from "../views/Home";
import AddClient from "../views/AddClient";
import Login from "../views/LogIn";
import SignUp from "../views/SignUp";
import SingleClient from "../views/SingleClient";

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/clients/add" element={<AddClient/>}/>
            <Route path="/clients/:id" element={<SingleClient/>}/>
        </Routes>
    )
}
export default AppRoutes;