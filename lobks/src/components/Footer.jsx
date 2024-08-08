import React from 'react';
import "../styles/Footer.css"

const Footer = () => {
    return (
        <footer className="my-footer">
            <img id={"header-img"}
                 src={"https://gas-kvas.com/grafic/uploads/posts/2024-01/gas-kvas-com-p-simvoli-dlya-logotipov-na-prozrachnom-fone-38.png"}
                 alt={""}/>
            <p>Email: example@mail.ru</p>
            <p>Phone number: +7-777-111-22-33</p>
            <p>Contact us</p>
        </footer>
    );
};

export default Footer;