import React from 'react'
import Menu from './Menu';
import SocialLinks from './SocialLinks';
import { SiVisa, SiPaypal, SiMastercard } from 'react-icons/si';

 const Footer = () => {
    const date = (new Date()).getFullYear();
    return (
        <footer className="footer">
            <Menu className="footer-menu"/>
            <div className="flex-column mt-5">
                <h5>We accept</h5>
                <SiPaypal />
                <SiVisa />
                <SiMastercard />
            </div>
            <div className="bottom">
                <SocialLinks />
            </div>
        </footer>
    )
}

export default Footer;