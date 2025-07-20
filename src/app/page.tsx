"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Ufo from '@/components/ufo';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(far, fas, fab);

const PortfolioWebsite = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    const sections = ['hero', 'about', 'projects', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      }
      return false;
    });
    if (current) setActiveSection(current);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleParallax = () => {
      const scrollY = window.scrollY;
      const paralaxElems = document.querySelectorAll('.paralax');

      paralaxElems.forEach((elem) => {
        const tx = elem.getAttribute('data-tx') || '0';
        const ty = elem.getAttribute('data-ty') || '0';
        const e = elem as HTMLElement;
        e.style.transform = `translateY(${scrollY * parseFloat(ty)}px) translateX(${scrollY * parseFloat(tx)}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll('.fade-in-on-scroll');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 1 });

    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const slider = document.getElementById('scroll-slider');
    const section = slider?.parentElement?.parentElement?.parentElement;

    const handleScrollSliders = () => {
      if (!slider || !section) return;

      const scrollStart = section.offsetTop;
      const scrollEnd = scrollStart + section.offsetHeight;
      const scrollY = window.scrollY;

      console.log('scrollStart', scrollStart)
      console.log('scrollEnd', scrollEnd)
      console.log('scrollY', scrollY)

      if (scrollY >= scrollStart && scrollY <= scrollEnd) {
        const scrollProgress = scrollY - scrollStart;
        slider.style.transform = `translateX(-${scrollProgress}px)`;
      }
    };

    window.addEventListener('scroll', handleScrollSliders);
    return () => window.removeEventListener('scroll', handleScrollSliders);
  }, []);

  const projects = [
    {
      title: "Logistic & Transport Tender Management Platform",
      description: "A full-stack e-commerce solution for managing Tenders and Logistics between Shippers and Transporters. This project includes  including Admin backoffice for managing users & their access, activity, and monitor Tender data",
      tags: ["PHP-Silverstripe", "jQuery", "HTML-CSS", "File management", "PDF generator", "Mailing & Notifications"],
      image: "/project/logistic.svg",
      imageClass: "bg-white",
    },
    {
      title: "Logistic Ads Management Platform",
      description: "Web application to bridge between Sellers and Buyers in the Logistic industry. This project includes Admin backoffice for managing users access, activity, and monitor Ads data & profit. Major features includes dynamic & customizable form fields for Ads data (CMS-like), that needs tricky ERD design",
      tags: ["PHP-Silverstripe", "jQuery", "HTML-CSS", "Dynamic form fields", "Async functions & callback", "File management"],
      image: "/project/seller_buyer.svg",
      imageClass: "bg-white",
    },
    {
      title: "Logistic Partition Product Management",
      description: "A platform for managing Truck Partition products. My part is focusing on managing product discounts with certain rules that set by Admin.",
      tags: ["Node.js", "React.js", "Next.js", "Async functions & callback"],
      image: "/project/truck_part.svg",
      imageClass: "bg-white",
    },
    {
      title: "Face-recognition Attendance System",
      description: "Real-time attendance monitor system using face recognition technology that prioritize performance, attendance simplicity, and accuracy.",
      tags: ["Python-ML", "Django", "jQuery", "HTML-CSS", "Face-recognition", "tensorflow", "Web-socket"],
      image: "/project/face_recognition.svg",
      imageClass: "bg-white",
    },
    {
      title: "Oil Rig Pump Monitoring System",
      description: "Real-time platform to monitor pump performance and condition that connected to a customized IoT device using curl and web-socket.",
      tags: ["Laravel", "jQuery", "HTML-CSS", "Web-socket", "CURL"],
      image: "/project/oil_rig.svg",
      imageClass: "bg-white",
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2b0a53] to-[#000000] relative overflow-x-clip">
      <Ufo/>
      <Image
        src="/space/Wave1.svg"
        alt="wave1"
        width={200}
        height={200}
        className="min-w-[120dvw] absolute -top-[70dvh] -left-10 z-0 paralax"
        data-ty='0.3'
        data-tx='-0.2'
      />
      <Image
        src="/space/Wave2.svg"
        alt="wave2"
        width={200}
        height={200}
        className="min-w-[120dvw] absolute -top-[50dvh] -left-10 z-0 paralax"
        data-ty='0.6'
      />
      <Image
        src="/space/small-stars.svg"
        alt="stars"
        width={200}
        height={200}
        className="min-w-[90dvw] absolute top-[5dvh] left-10 z-0 paralax"
        data-ty='0.3'
      />
      <Image
        src="/space/medium-stars.svg"
        alt="stars"
        width={200}
        height={200}
        className="min-w-[90dvw] absolute top-[120dvh] left-20 z-0 paralax"
        data-ty='0.4'
      />
      <Image
        src="/space/small-stars.svg"
        alt="stars"
        width={200}
        height={200}
        className="min-w-[90dvw] absolute top-[150dvh] left-10 z-0 paralax"
        data-ty='0.3'
      />
      <Image
        src="/space/medium-stars.svg"
        alt="stars"
        width={200}
        height={200}
        className="min-w-[90dvw] absolute top-[1dvh] left-20 z-0 paralax"
        data-ty='0.4'
      />
      <Image
        src="/space/small-stars.svg"
        alt="stars"
        width={200}
        height={200}
        className="min-w-[90dvw] absolute top-[270dvh] left-10 z-0 paralax"
        data-ty='0.3'
      />
      <Image
        src="/space/small-meteor.svg"
        alt="meteor"
        width={200}
        height={200}
        className="min-w-[390px] absolute -top-[100px] left-20 z-0 paralax"
        data-ty='0.6'
        data-tx='-0.2'
      />
      <Image
        src="/space/planet1.svg"
        alt="planet1"
        width={0}
        height={0}
        className="min-w-[50px] absolute top-[500px] left-[600px] z-0 paralax"
        data-ty='0.2'
      />
      <Image
        src="/space/planet2.svg"
        alt="planet2"
        width={200}
        height={200}
        className="min-w-[700px] absolute top-[100px] left-10 z-0 paralax"
        data-ty='0.1'
      />
      <Image
        src="/space/rocket.svg"
        alt="rocket"
        width={200}
        height={200}
        className="min-w-[700px] absolute top-[550px] -left-20 z-0 paralax"
        data-ty='0.1'
        data-tx='0.5'
      />
      <Image
        src="/space/satelite.svg"
        alt="satelite"
        width={200}
        height={200}
        className="min-w-[400px] absolute top-[900px] left-[180px] z-0 paralax"
        data-ty='0.1'
        data-tx='-0.05'
      />
      <Image
        src="/space/astronaut.svg"
        alt="astronaut"
        width={200}
        height={200}
        className="min-w-[250px] absolute top-[2700px] left-[400px] z-0 paralax"
        data-ty='0.1'
        data-tx='0.2'
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-fit left-1/2 -translate-x-1/2 rounded-b-lg bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center h-12">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className={`${activeSection === 'hero' ? 'text-indigo-900' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Welcome</a>
              <a href="#about" className={`${activeSection === 'about' ? 'text-indigo-900' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Skills</a>
              <a href="#projects" className={`${activeSection === 'projects' ? 'text-indigo-900' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Signature</a>
              <a href="#contact" className={`${activeSection === 'contact' ? 'text-indigo-900' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#hero" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Welcome</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Skills</a>
              <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Signature</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen relative overflow-hidden text-white p-20"
      >
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 gap-20 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="text-center md:text-left space-y-6 max-w-lg w-full">
          </div>

          {/* Avatar Image */}
          <div className="mt-10 md:mt-0 w-full flex flex-col gap-10 items-center justify-center">
            <Image src="/img/fariz-avatar.png" alt="Fariz Avatar" width={300} height={300} />
            <h1 className="text-lg text-center md:text-lg font-bold leading-tight">Fariz - Web Developer</h1>
            <div className="flex justify-center md:justify-center gap-4">
              <a
                href="/cv.pdf"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-indigo-700 transition"
              >
                My CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-white text-indigo-700 rounded-full font-semibold hover:bg-opacity-90 transition"
              >
                Hire me!
              </a>
            </div>
            <div className='p-5 m-5 fade-in-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out'>
              A graduate of Politeknik Elektronika Negeri Surabaya (PENS) in Informatics Engineering, with over 3 years of experience as a Full Stack Web Developer. Have strong interest in building responsive, user-friendly applications. Comfortable working in teams and continuously learning to tackle technical challenges effectively.
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12 fade-in-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">Skills</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
              </p>
              <div className="grid grid-cols-2 gap-4 text-gray-700">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                  <p className="text-gray-600">React, jQuery(js-ts), Native HTML-CSS-JS</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Backend</h3>
                  <p className="text-gray-600">PHP(Laravel, Silverstripe), Python(Django)</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Database</h3>
                  <p className="text-gray-600">MySQL, PostgreSQL</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Tools</h3>
                  <p className="text-gray-600">Git, AI-tools(Claude, Builder.io, Copilot)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      {/* 
      <section className="h-[calc(300dvh+500px)]">
        <div className="overflow-hidden flex items-center bg-white sticky top-[200px]">
          <div
            id="scroll-slider"
            className="flex gap-10 will-change-transform"
            style={{ width: '300vw' }} // Adjust based on number of slides
          >
            <div className="min-w-[100vw] bg-indigo-200 flex items-center justify-center text-4xl font-bold">
              Slide 1
            </div>
            <div className="min-w-[100vw] bg-green-200 flex items-center justify-center text-4xl font-bold">
              Slide 2
            </div>
            <div className="min-w-[100vw] bg-pink-200 flex items-center justify-center text-4xl font-bold">
              Slide 3
            </div>
          </div>
        </div>
      </section> */}

      <section id="projects" className={`pt-20 pb-[300px] h-[2200px]`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-[50px]">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="flex items-center">
            <div
              id="scroll-slider"
              className="flex gap-10 will-change-transform ml-20"
              style={{ width: '300vw' }} // Adjust based on number of slides
            >
              {projects.map((project, index) => (
                <div key={index} className="relative bg-[var(--background)] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-[350px]">
                  <Image src={project.image} alt={project.title} className={"h-48 object-cover min-w-[350px] " + project.imageClass} width={300} height={300} />
                  <div className="p-6 h-[300px] [scrollbar-width:none] overflow-y-auto mb-px">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-b from-transparent to-[var(--background)]"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-[15dvw] pb-20 bg-[#56423d] relative">
        <Image
          src="/space/mars.svg"
          alt="mars"
          width={200}
          height={200}
          className="w-full absolute -top-[300px] left-0 z-0"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-[min-content_min-content] gap-20 justify-center auto-cols-min">
            <div className="space-y-6 w-fit">
              <div>
                <h3 className="text-xl font-semibold mb-4">Professionals</h3>
                <div className="space-y-4">
                  <a href="github.com/rijalalfariz" className="whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200">
                    <i className="fa-brands fa-github" aria-hidden="true"></i>
                    <span>rijalalfariz</span>
                  </a>
                  <a href="linkedin.com/in/rijaal_alfariz" className="whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200">
                    <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                    <span>rijaal_alfariz</span>
                  </a>
                  <a href="#" className="whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200">
                    <i className="fa-regular fa-envelope" aria-hidden="true"></i>
                    <span>rijalfariz.work@gmail.com</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="">Surabaya, Indonesia</p>
              </div>
            </div>
            <div className="space-y-6 w-fit">
              <div>
                <h3 className="text-xl font-semibold mb-4">Community</h3>
                <div className="space-y-4">
                  <a href="wa.me/6285861513613" className="whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200">
                    <i className="fa-solid fa-phone" aria-hidden="true" />
                    <span>+62 858-6151-3613</span>
                  </a>
                  <a href="instagram.com/rijaal_alfariz" className="whitespace-nowrap flex items-center space-x-3 hover:text-[#E49D6E] transition-colors duration-200">
                    <i className="fa-brands fa-instagram" aria-hidden="true" />
                    <span>rijaal_alfariz</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2f4858] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 M Rijal Al Fariz - Hire Me!.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;