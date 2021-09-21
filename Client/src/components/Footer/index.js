import React from 'react'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGooglePlusG, FaMapMarkerAlt, FaPhone, FaEnvelope  } from 'react-icons/fa'
import './style.css'

const Footer = () => {
    return (
        //style edited from CodePen Home - Mihai Constantin
        <footer className="footer">
            <div className="footer-left col-md-4 col-sm-6">
                <p className="about">
                    <span> About Us</span> One Stop Print Shop was created by 5 friends who wanted a better printing experience. 1.5% of our profits are donated to local charities.
                </p>
                <div className="icons">
                    <a href="#"><i className="fa fa-facebook"><FaFacebookF/></i></a>
                    <a href="#"><i className="fa fa-twitter"><FaTwitter/></i></a>
                    <a href="#"><i className="fa fa-linkedin"><FaLinkedinIn/></i></a>
                    <a href="#"><i className="fa fa-google-plus"><FaGooglePlusG/></i></a>
                </div>
            </div>
            <div className="footer-center col-md-4 col-sm-6">
                <div>
                    <i className="fa fa-map-marker"><FaMapMarkerAlt/></i>
                    <p><span> 1 Main Street</span> Nashville, TN</p>
                </div>
                <div>
                    <i className="fa fa-phone"><FaPhone/></i>
                    <p> (+00) 0000 000 000</p>
                </div>
                <div>
                    <i className="fa fa-envelope"><FaEnvelope/></i>
                    <p><a href="#"> office@onestop.com</a></p>
                </div>
            </div>
            <div className="footer-right col-md-4 col-sm-6">
                <h2> One Stop Print Shop<span></span></h2>
                <p className="menu">
                    <a href="#"> Home</a> | |
                    <a href="#"> Contact</a>
                </p>
                <p className="name"> OneStopPrintShop &copy; 2021</p>
            </div>
        </footer>
    )
};

export default Footer