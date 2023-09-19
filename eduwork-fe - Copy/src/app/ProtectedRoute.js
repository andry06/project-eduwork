import { Navigate } from "react-router-dom";

const ProtectedRouteUser = (props) =>  {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    if(!token) return <Navigate to="/login" />

    return props.children;
}

const ProtectedRouteAuth = (props) =>  {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    if(token) return <Navigate to="/account" />

    return props.children;
}


export  {ProtectedRouteUser, ProtectedRouteAuth};