import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const Auth = ({allowedRoles}) => {

    const roles = localStorage.getItem("roles").replace("[", "")
        .replace("]", "")
        .replace(/"/g, "")
        .split(",")
    const allowedRole = allowedRoles.at(0)

    return roles.find((role) => role.includes(allowedRole)) ? (
        <Outlet/>
    ) : <Navigate to={"/sign"}/>

};

export default Auth;