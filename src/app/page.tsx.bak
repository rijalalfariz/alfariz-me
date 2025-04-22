"use client"
import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown } from 'lucide-react';
import Image from 'next/image';

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

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management",
      tags: ["React", "Node.js", "MongoDB"],
      image: "/api/placeholder/400/300"
    },
    {
      title: "AI Image Generator",
      description: "Web application that generates unique artwork using machine learning",
      tags: ["Python", "TensorFlow", "AWS"],
      image: "/api/placeholder/400/300"
    },
    {
      title: "Financial Dashboard",
      description: "Real-time financial data visualization and analysis platform",
      tags: ["Vue.js", "D3.js", "Firebase"],
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[var(--background)] shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Portfolio</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#hero" className={`${activeSection === 'hero' ? 'text-indigo-600' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Home</a>
              <a href="#about" className={`${activeSection === 'about' ? 'text-indigo-600' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>About</a>
              <a href="#projects" className={`${activeSection === 'projects' ? 'text-indigo-600' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Projects</a>
              <a href="#contact" className={`${activeSection === 'contact' ? 'text-indigo-600' : 'text-gray-600'} hover:text-indigo-500 transition-colors duration-200`}>Contact</a>
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
              <a href="#hero" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a>
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</a>
              <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Projects</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Hi, Im M Rijal Al Fariz</h1>
          <p className="text-xl md:text-2xl mb-8">Web Developer</p>
          <div className="flex justify-center space-x-4">
            <a href="#contact" className="bg-[var(--background)] text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-200">Get in Touch</a>
            <a href="#projects" className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--background)] hover:text-indigo-600 transition-all duration-200">View Work</a>
          </div>
          <div className="mt-12">
            <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
          </div>
        </div>
        <div>
          <Image src={'/img/me.png'} width={700} height={0} alt='me'/>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image src="https://picsum.photos/500" alt="Profile" className="rounded-lg shadow-lg" width={500} height={500}/>
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Im a passionate developer with over 3 years of experience in creating beautiful and functional web applications. 
                My expertise spans across front-end (mostly) and back-end development, with a special focus on creating intuitive user experiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
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
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-[var(--background)] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <Image src={'https://picsum.photos/300'} alt={project.title} className="w-full h-48 object-cover" width={300} height={300} />
                <div className="p-6">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors duration-200">
                  Send Message
                </button>
              </form>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
                <div className="space-y-4">
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                    <span>github.com/rijalalfariz</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                    <span>linkedin.com/in/rijaal_alfariz</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                    <Mail className="w-6 h-6" />
                    <span>rijalfariz@gmail.com</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-gray-600">Surabaya, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 M Rijal Al Fariz - Hire Me!.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;