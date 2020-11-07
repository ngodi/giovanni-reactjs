import React from 'react'
import Menu from './Menu';
import SocialLinks from './SocialLinks';
import { SiVisa, SiPaypal, SiMastercard } from 'react-icons/si';

 const Footer = () => {
    return (
        <footer className="footer">
            <Menu className="footer-menu"/>
            <div className="flex-column mt-5">
                <h5>We accept</h5>
                <SiPaypal />
                <SiVisa />
                <SiMastercard />
            </div>
            <div className="bottom mt-5">
                <SocialLinks />
            </div>
        </footer>
    )
}

export default Footer;