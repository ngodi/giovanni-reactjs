import React from 'react';
import { FaFacebook, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialLinks = () => {
    
    const date = (new Date()).getFullYear();
    return (
        <div>
            <h5>Find Us</h5>
            <div className="socials mt-3 flex-row">
                <Link to="#"><FaFacebook /></Link>
                <Link to="#"><FaTwitterSquare /></Link>
                <Link to="#"><FaInstagramSquare /></Link>
            </div>
            &copy;&nbsp;{date} Designed By Ngodi Albert
        </div>
    )
}

export default SocialLinks
