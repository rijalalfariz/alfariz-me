"use client"
import React, { useState } from 'react';

interface EducationItem {
  id: string;
  degree: string;
  date: string;
  gpa: string;
  details: string[];
}

interface ExperienceItem {
  id: string;
  company: string;
  date: string;
  position: string;
  details: string[];
}

const PersonalInfo: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const educationData: EducationItem[] = [
    {
      id: 'edu1',
      degree: 'D4 - Informatics Engineering',
      date: 'Nov 2023 - Jan 2025',
      gpa: 'GPA: 3.61/4.00',
      details: [
        'Thesis : Classroom Attendance System using Face Recognition with Deep Metric Learning Algorithm',
        'Design face recognition algorithm that could scan 10-20 faces up to 10 meters away. Achieve efficient face recognition that integrated with website can run up to 20 scan/second'
      ]
    },
    {
      id: 'edu2',
      degree: 'D3 - Informatics Engineering',
      date: 'Nov 2023 - Jan 2025',
      gpa: 'GPA: 3.61/4.00',
      details: [
        'Thesis : Face Attendance System using Face Recognition with Normalized Convolutional Neural Network',
        'Appointed the head of EBIO organization that have impact to 100+ students',
        'Achieve TOEFL score 503'
      ]
    }
  ];

  const experienceData: ExperienceItem[] = [
    {
      id: 'exp1',
      company: 'Morning Glory Enterprise',
      date: 'Nov 2023 - Jan 2025',
      position: 'Full-stack Web Developer',
      details: [
        '15-20 professionals',
        '5+ small to ecosystem scale projects with 200-300/mo. project total sprint hours',
        'Advance AI structured prompting for 30-50% more efficient work hours',
        'Optimize website SEO for a performance score of 90-100',
        'Negotiate project value that could increase project income of company by 20-30%'
      ]
    },
    {
      id: 'exp2',
      company: 'Kementerian Komunikasi dan Informatika Kabupaten Nganjuk',
      date: 'Jul 2020 - Aug 2020',
      position: 'Full-stack Web Developer Intern',
      details: [
        'Collaborated in a team of 3 to develop an employee attendance website using face recognition technology',
        'Led backend & front end development, design project structure and achieve face recognition accuracy score above 90%',
        'Deliver application in 1 month sprint that impact the working efficiency of 50+ workers'
      ]
    }
  ];

  const handleItemClick = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-gray-50 min-h-screen">
      <section className="mb-10">
        <h2 className="text-3xl font-bold mb-5 text-gray-800">Personal Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center gap-4">
            <span className="text-2xl">👤</span>
            <div>
              <strong className="block text-sm text-gray-600 mb-1">Born</strong>
              <p className="text-base text-gray-800">22 June 2000</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📍</span>
            <div>
              <strong className="block text-sm text-gray-600 mb-1">Location</strong>
              <p className="text-base text-gray-800">Pasuruan, East Java, Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-bold text-gray-100 whitespace-nowrap pointer-events-none select-none z-0">
            EDUCATION
          </div>
          <h2 className="text-2xl font-bold mb-3 text-gray-800 relative z-10">Education</h2>
          <p className="text-gray-600 mb-5 relative z-10">Politeknik Elektronika Negeri Surabaya</p>
          
          {educationData.map((edu) => (
            <div
              key={edu.id}
              className={`bg-white rounded-lg mb-4 cursor-pointer transition-all duration-300 relative z-10 shadow-sm hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md ${
                expandedItem === edu.id ? 'ring-2 ring-gray-300' : ''
              }`}
              onClick={() => handleItemClick(edu.id)}
            >
              <div className="flex items-center p-5 gap-4">
                <span className="text-2xl flex-shrink-0">🎓</span>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{edu.degree}</h3>
                  <p className="text-sm text-gray-600">{edu.date}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap">{edu.gpa}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItem === edu.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <ul className="space-y-2">
                    {edu.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-gray-400 flex-shrink-0">
                          {index === 0 ? '📝' : index === 1 ? '🏆' : '🎯'}
                        </span>
                        <span className="text-gray-600 text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-bold text-gray-100 whitespace-nowrap pointer-events-none select-none z-0">
            EXPERIENCE
          </div>
          <h2 className="text-2xl font-bold mb-5 text-gray-800 relative z-10">Experience</h2>
          
          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className={`bg-white rounded-lg mb-4 cursor-pointer transition-all duration-300 relative z-10 shadow-sm hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md ${
                expandedItem === exp.id ? 'ring-2 ring-gray-300' : ''
              }`}
              onClick={() => handleItemClick(exp.id)}
            >
              <div className="flex items-center p-5 gap-4">
                <span className="text-2xl flex-shrink-0">💼</span>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{exp.company}</h3>
                  <p className="text-sm text-gray-600">{exp.date}</p>
                </div>
                <span className="text-sm text-gray-600 font-medium whitespace-nowrap text-right">{exp.position}</span>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedItem === exp.id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <ul className="space-y-2">
                    {exp.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-gray-400 flex-shrink-0">•</span>
                        <span className="text-gray-600 text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default PersonalInfo;