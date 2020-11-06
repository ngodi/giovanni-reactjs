import React from 'react'
import Menu from './Menu';
import SocialLinks from './SocialLinks';
import { SiVisa, SiPaypal, SiMastercard } from 'react-icons/si';

 const Footer = () => {
    const date = (new Date()).getFullYear();
    return (
        <footer className="footer container row">
                <div className="col-md-3 col-sm-12">
                   <SocialLinks />
                </div>
                <div className="col-md-3 col-sm-12">
                    <Menu className="footer-menu"/>
                </div>
                <div className="col-md-3 col-sm-12 flex-column mt-3">
                    <h5>We accept</h5>
                    <SiPaypal />
                    <SiVisa />
                    <SiMastercard />
                </div>
                <div className="col-md-3 col-sm-12 bottom">
                    
                    &copy;&nbsp;{date} Designed By Ngodi Albert

                </div>
        </footer>
    )
}

export default Footer;