import React from 'react';
import {Redirect} from "react-router";
import PersistentDrawerLeft from "../components/PersistentDrawerLeft";

export function Main() {

    let isLogin = localStorage.getItem("isLogin");
    if(isLogin !== "true") {
        return <Redirect to="/login_view"/>
    }
    return (
        <div>
            <PersistentDrawerLeft />
        </div>
    )
}

export default Main;