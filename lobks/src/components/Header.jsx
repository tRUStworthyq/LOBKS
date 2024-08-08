import React from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/Header.css"

const Header = () => {
    const navigate = useNavigate()

    const handlerBtnLogout = () => {
        navigate("/sign?#")
        localStorage.clear()
    }

    return (
        <header className="header">
            <img id={"header-img"} src={"https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-simvoli-dlya-logotipov-na-prozrachnom-fone-38.png"} alt={""}/>
            <h2 className={"name"}>LOBKS</h2>
            <button className="btn btn-danger panel-btn btn-header" onClick={handlerBtnLogout}>Logout</button>
        </header>
    );
};

export default Header;