"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import DivTransH from '../elements/DivTransH';

interface EducationItem {
  id: string;
  degree: string;
  date: string;
  gpa: string;
  thesis: string;
  achievements: string[];
  details?: string[];
}

interface ExperienceItem {
  id: string;
  company: string;
  date: string;
  position: string;
  details: string[];
}

const PersonalInfo: React.FC = () => {
  const [expandedItem, setExpandedItem] = useState<string[]>([]);

  const educationData: EducationItem[] = [
    {
      id: 'edu1',
      degree: 'D4 - Informatics Engineering',
      date: 'Nov 2023 - Jan 2025',
      gpa: 'GPA: 3.61/4.00',
      thesis: 'Thesis : Classroom Attendance System using Face Recognition with Deep Metric Learning Algorithm',
      achievements: [
        'Design face recognition algorithm that could scan 10-20 faces up to 10 meters away. Achieve efficient face recognition that integrated with website can run up to 20 scan/second'
      ]
    },
    {
      id: 'edu2',
      degree: 'D3 - Informatics Engineering',
      date: 'Nov 2023 - Jan 2025',
      gpa: 'GPA: 3.61/4.00',
      thesis: 'Thesis : Face Attendance System using Face Recognition with Normalized Convolutional Neural Network',
      achievements: [
        'Appointed the head of EBIO organization that have impact to 100+ students',
        'Achieve TOEFL score 503'
      ],
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
    setExpandedItem(prev => {
      return expandedItem.includes(itemId) ? [...prev.filter(v => v != itemId)] : [...prev, itemId];
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-10 bg-gray-50">
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-5">Personal Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-5 w-1/2">
          <div className="flex gap-4">
            <span className="text-2xl">
              <FontAwesomeIcon icon={["fas", "cake-candles"]} />
            </span>
            <div>
              <strong className="block text-sm mt-2">Born</strong>
              <p className="text-base">22 June 2000</p>
            </div>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl">
              <FontAwesomeIcon icon={["fas", "location-dot"]} />
            </span>
            <div>
              <strong className="block text-sm mt-2">Location</strong>
              <p className="text-base">Pasuruan, East Java, Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="relative overflow-x-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-bold text-gray-100 whitespace-nowrap pointer-events-none select-none z-0">
            EDUCATION
          </div>
          <h2 className="text-2xl font-bold relative z-10">Education</h2>
          <p className="mb-2 relative z-10">Politeknik Elektronika Negeri Surabaya</p>

          {educationData.map((edu) => (
            <div
              key={edu.id}
              className={`backdrop-blur-sm rounded-lg mb-4 cursor-pointer transition-all duration-500 relative z-10 shadow-sm hover:bg-[var(--bg-2)] hover:-translate-y-0.5 hover:shadow-md`}
              onClick={() => handleItemClick(edu.id)}
            >
              <div className={"flex py-3 px-5 gap-4 transition-all" + (expandedItem.includes(edu.id) ? '' : ' mt-2')}>
                <div className="flex flex-col items-center">
                  <span className="text-2xl flex-shrink-0">
                    <FontAwesomeIcon icon={["fas", "graduation-cap"]} />
                  </span>
                  <div className={"w-px bg-[var(--fg-9)] transition-all duration-500" + (expandedItem.includes(edu.id) ? ' h-full' : ' h-0')}></div>
                </div>
                <div className="flex-col">
                  <div className="flex">
                    <div className="flex-grow">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <p className="text-xs font-bold text-[var(--mg-5)]">{edu.date}</p>
                    </div>
                    <span className="text-sm font-bold whitespace-nowrap">{edu.gpa}</span>
                  </div>
                  <DivTransH open={expandedItem.includes(edu.id)}>
                    <div className="pt-5">
                      <div className="grid grid-cols-[24px_1fr] justify-items-center gap-2">
                        <FontAwesomeIcon icon={["fas", "book"]} className="text-[var(--mg-5)] mt-1" />
                        <p className="text-sm leading-relaxed">{edu.thesis}</p>
                        <div className="grid justify-items-center grid-rows-[1fr_1fr]">
                          <FontAwesomeIcon icon={["fas", "trophy"]} className="text-[var(--mg-5)] mt-1"/>
                          <div className={"w-px bg-[var(--mg-5)] transition-all duration-500" + (edu.achievements.length > 1 ? ' h-full' : ' h-0')}></div>
                        </div>
                        <div className="grid">
                          {edu.achievements.map((detail, index) => (
                            <p key={index} className="text-sm leading-relaxed">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DivTransH>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="relative overflow-x-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl md:text-9xl font-bold text-gray-100 whitespace-nowrap pointer-events-none select-none z-0">
            EXPERIENCE
          </div>
          <h2 className="text-2xl font-bold mb-5 relative z-10">Experience</h2>

          {experienceData.map((exp) => (
            <div
              key={exp.id}
              className={`trigger-speed-transition bg-white rounded-lg mb-4 cursor-pointer transition-all duration-300 relative z-10 shadow-sm hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-md`}
              onClick={() => handleItemClick(exp.id)}
            >
              <div className="flex items-center p-5 gap-4">
                <span className="text-2xl flex-shrink-0">
                  <FontAwesomeIcon icon={["fas", "briefcase"]} />
                </span>
                <div className="flex-grow">
                  <h3 className="font-bold">{exp.company}</h3>
                  <p className="text-xs font-bold text-[var(--mg-5)]">{exp.date}</p>
                </div>
                <span className="text-sm font-medium text-right max-w-[120px]">{exp.position}</span>
              </div>
              <DivTransH open={expandedItem.includes(exp.id)}>
                <div className="px-5 pb-5">
                  <ul className="">
                    {exp.details.map((detail, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-3 text-gray-400 flex-shrink-0">•</span>
                        <span className="text-sm leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </DivTransH>
            </div>
          ))}
        </section>
      </div >
    </div >
  );
};

export default PersonalInfo;