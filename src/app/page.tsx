"use client"
import React, { useState, useEffect } from 'react';
import { Mail, ChevronDown } from 'lucide-react';

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
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Hi, Im John Doe</h1>
          <p className="text-xl md:text-2xl mb-8">Full Stack Developer & UI/UX Designer</p>
          <div className="flex justify-center space-x-4">
            <a href="#contact" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-200">Get in Touch</a>
            <a href="#projects" className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-200">View Work</a>
          </div>
          <div className="mt-12">
            <ChevronDown className="w-8 h-8 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="/api/placeholder/500/500" alt="Profile" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <p className="text-lg text-gray-600 mb-6">
                Im a passionate developer with over 5 years of experience in creating beautiful and functional web applications. 
                My expertise spans across front-end and back-end development, with a special focus on creating intuitive user experiences.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Frontend</h3>
                  <p className="text-gray-600">React, Vue, Angular</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Backend</h3>
                  <p className="text-gray-600">Node.js, Python, Java</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Database</h3>
                  <p className="text-gray-600">MongoDB, PostgreSQL</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Tools</h3>
                  <p className="text-gray-600">Git, Docker, AWS</p>
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
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
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
      <section id="contact" className="py-20 bg-white">
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
                    <span>github.com/johndoe</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                    <span>linkedin.com/in/johndoe</span>
                  </a>
                  <a href="#" className="flex items-center space-x-3 text-gray-600 hover:text-indigo-600 transition-colors duration-200">
                    <Mail className="w-6 h-6" />
                    <span>john.doe@example.com</span>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-gray-600">San Francisco, California</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2025 John Doe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioWebsite;