import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6 ">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Maalem+. All rights
                    reserved.
                </p>
                <div className="flex space-x-4 mt-2 md:mt-0">
                    <a href="/about" className="hover:text-white">
                        About
                    </a>
                    <a href="/contact" className="hover:text-white">
                        Contact
                    </a>
                    <a href="/privacy" className="hover:text-white">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
