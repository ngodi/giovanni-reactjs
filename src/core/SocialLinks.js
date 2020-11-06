import React from 'react';
import { FaFacebook, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialLinks = () => {
    return (
        <div className="socials mt-3 flex-column">
            <h5>Find Us</h5>
            <Link to="#"><FaFacebook /></Link>
            <Link to="#"><FaTwitterSquare /></Link>
            <Link to="#"><FaInstagramSquare /></Link>
        </div>
    )
}

export default SocialLinks
