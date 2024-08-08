import React from 'react';
import {useLocation} from "react-router-dom";
import Header from "./components/Header";

const Layout = ({children}) => {
    const location = useLocation();
    const hideHeaderRoute = "/sign"

    const shouldHideHeader = hideHeaderRoute.includes(location.pathname)
    return (
        <div>
            {!shouldHideHeader && (
                <Header/>
            )}
            {children}
        </div>
    );
};

export default Layout;