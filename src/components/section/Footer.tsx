import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedinIn,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Footer: React.FC = () => {
  return (
    <section id="contact" className="inverted p-5 bg-(--mg-6) relative">
      <div className="max-w-7xl mx-auto p-5 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="grid md:grid-cols-[min-content_min-content] gap-20 justify-center auto-cols-min">
          <div className="space-y-6 w-fit">
            <div>
              <h3 className="text-xl font-semibold mb-4">Professionals</h3>
              <div className="flex divide-x gap-5">
                <a href="https://github.com/rijalalfariz" className="pr-5 whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGithub} aria-hidden="true" />
                  <span>rijalalfariz</span>
                </a>
                <a href="https://linkedin.com/in/rijaal_alfariz" className="pr-5 whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} aria-hidden="true" />
                  <span>rijaal_alfariz</span>
                </a>
                <a href="mailto:rijalfariz.work@gmail.com" className="pr-5 whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200">
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                  <span>rijalfariz.work@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
          <div className="space-y-6 w-fit">
            <div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <div className="flex gap-5 divide-x">
                <a href="https://wa.me/6285861513613" className="pr-5 whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faPhone} aria-hidden="true" />
                  <span>+62 858-6151-3613</span>
                </a>
                <a href="https://instagram.com/rijaal_alfariz" className="pr-5 whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} aria-hidden="true" />
                  <span>rijaal_alfariz</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center mt-5">
        <div
          className="h-px w-full mb-3"
          style={{
            background: 'linear-gradient(to right, transparent, black 50%, transparent)',
            opacity: 0.5,
          }}
        />
        <div className="text-center text-xs text-black/70 mb-2">
          &copy; 2025 M RIjal Al Fariz. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Footer;