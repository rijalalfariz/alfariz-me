"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonalInfo from '@/components/section/PersonalInfo';
import TechStack from '@/components/section/TechStack';
import Signature from '@/components/section/Signature';
import Footer from '@/components/section/Footer';
library.add(far, fas, fab);

interface Progress {
  start: string;
  current: string;
  finish: string;
}

interface HeroState {
  width: Progress;
  height: Progress;
  left: Progress;
  top: Progress;
  minWidth: Progress;
  clipPath: {
    radius: Progress;
    x: Progress;
    y: Progress;
  }
}

const PortfolioWebsite = () => {
  const heroRef = useRef(null);
  const firstContainerRef = useRef(null);
  const [heroState, setHeroState] = useState<HeroState>({
    width: { start: "2150", current: "2150", finish: "184" },
    height: { start: "1209", current: "1209", finish: "103" },
    left: { start: "", current: "-40%", finish: "-35px" },
    top: { start: "0", current: "0", finish: "7px" },
    minWidth: { start: "", current: "140vw", finish: "184px" },
    clipPath: {
      radius: { start: "100%", current: "100%", finish: "18%" },
      x: { start: "64%", current: "64%", finish: "51%" },
      y: { start: "-90%", current: "-90%", finish: "30%" }
    }
  });
  const [firstSectionScrollPercentage, setFirstSectionScrollPercentage] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const sections = ['tech-stack', 'signature', 'contact'];
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

  const initHeroState = heroState;
  useEffect(() => {
    if (!heroRef.current) return;

    // init state
    initHeroState.left.start = (heroRef.current as HTMLImageElement).offsetLeft + "px";
    initHeroState.minWidth.start = (heroRef.current as HTMLImageElement).clientWidth + "px";

    // console.log('a', initHeroState)
    setHeroState({
      ...heroState,
      ...initHeroState
    })


    const handleScroll = () => {
      if (!firstContainerRef.current) return;
      const eHeight = (firstContainerRef.current as HTMLDivElement).clientHeight;
      const percentage = Math.min(window.scrollY / eHeight, 1);
      setFirstSectionScrollPercentage(percentage);

      // Helper to interpolate between start and finish values
      const interpolate = (start: string, finish: string) => {
        const startNum = parseFloat(start);
        const finishNum = parseFloat(finish);
        const unit = start.replace(/[0-9.\-]/g, '') || finish.replace(/[0-9.\-]/g, '');
        return (startNum + (finishNum - startNum) * percentage) + unit;
      };

      setHeroState(prev => ({
        ...prev,
        width: {
          ...prev.width,
          current: interpolate(prev.width.start, prev.width.finish)
        },
        height: {
          ...prev.height,
          current: interpolate(prev.height.start, prev.height.finish)
        },
        left: {
          ...prev.left,
          current: interpolate(prev.left.start, prev.left.finish)
        },
        top: {
          ...prev.top,
          current: interpolate(prev.top.start, prev.top.finish)
        },
        minWidth: {
          ...prev.minWidth,
          current: interpolate(prev.minWidth.start, prev.minWidth.finish)
        },
        clipPath: {
          radius: {
            ...prev.clipPath.radius,
            current: interpolate(prev.clipPath.radius.start, prev.clipPath.radius.finish)
          },
          x: {
            ...prev.clipPath.x,
            current: interpolate(prev.clipPath.x.start, prev.clipPath.x.finish)
          },
          y: {
            ...prev.clipPath.y,
            current: interpolate(prev.clipPath.y.start, prev.clipPath.y.finish)
          }
        }
      }));
    }

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    }
  }, [])
  //  [mask-image:linear-gradient(to_bottom,white,transparent)]

  return (
    <div className="relative overflow-y-hidden">
      <div
        className="fixed top-0 w-full h-32 mt-0 pointer-events-none z-30"
        style={{
          background: 'linear-gradient(to bottom, #D1D1ED, transparent)',
          mixBlendMode: 'color-dodge',
        }}
      />
      {/* <div className="pointer-events-none fixed top-0 left-0 right-0 h-[70px] z-30 backdrop-blur-xl [mask-image:linear-gradient(to_bottom,white,transparent)] bg-white/50" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[80px] z-30 backdrop-blur-lg [mask-image:linear-gradient(to_bottom,white,transparent)] bg-white/50" /> */}
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[2px] z-30 backdrop-blur-[120px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[12px] z-30 backdrop-blur-[6px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[20px] z-30 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[32px] z-30 backdrop-blur-[5px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[40px] z-30 backdrop-blur-[4px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[55px] z-30 backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[75px] z-30 backdrop-blur-[2px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[100px] z-30 backdrop-blur-[1px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />
      <div className="pointer-events-none fixed top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-[var(--bg-1)] to-transparent z-20 opacity-[0.1]" />
      <Image
        id="aa"
        ref={heroRef}
        className="fixed z-10"
        src="/img/me-large.png"
        width={parseInt(heroState.width?.current || '0')}
        height={parseInt(heroState.height?.current || '0')}
        alt="me"
        style={{
          left: heroState.left?.current,
          top: heroState.top?.current,
          minWidth: heroState.minWidth?.current,
          clipPath: `circle(${heroState.clipPath?.radius.current} at ${heroState.clipPath?.x.current} ${heroState.clipPath?.y.current})`
        }}
      />
      <div className="fixed top-0 w-full overflow-hidden z-50">
        <div className="relative flex z-50 justify-between">
          <Image
            src="/img/me-square.png"
            width={59}
            height={59}
            alt="me square"
            className={"object-contain rounded-full z-10 transition-all ml-[30px] mt-[6px]" + (firstSectionScrollPercentage == 1 ? " opacity-100 delay-100 duration-300" : " opacity-0 duration-0")}
          />

          <div className="flex gap-5 nav-menu-init h-9 items-center py-3 px-5 mt-4 mx-5 bg-white/50 rounded-full backdrop-blur-sm
              [&>div]:cursor-pointer [&>div]:grid [&>div]:justify-center [&>div]:items-center [&>div]:justify-items-center
              [&>div>div]:bg-[var(--fg-9)] [&>div>div]:rounded-full [&>div>div]:h-0 [&>div>div]:w-0 [&>div>div]:transition-all [&>div>div]:duration-100
              ">
            <div className={`filter drop-shadow-[0_0_12px_rgba(255,255,255,100)] ${activeSection === "tech-stack" ? "font-bold" : ""}`}>
              <a href="#tech-stack" onClick={() => setActiveSection('tech-stack')}>Tech Stack</a>
              <div className="" />
            </div>
            <div className={`filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] ${activeSection === "signature" ? "font-bold" : ""}`}>
              <a href="#signature" onClick={() => setActiveSection('signature')}>Signature</a>
              <div className="" />
            </div>
            <div className={`filter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] ${activeSection === "contact" ? "font-bold" : ""}`}>
              <a href="#contact" onClick={() => setActiveSection('contact')}>Contact Me</a>
              <div className="" />
            </div>
          </div>
        </div>
      </div>

      <div ref={firstContainerRef} className="relative flex justify-end p-5 z-20 mb-[100px]" id="first-container">
        <div className="grid w-[45%] justify-start items-center content-start pt-[300px] pl-[100px]">
          <h2>25 Y.O.</h2>
          <p>Pasuruan, Indonesia</p>
        </div>
        <div className="w-[55%] grid p-5 justify-start">
          <div className="relative flex items-center">
            <div className="absolute text-[72px] z-10">
              <b>M Rijal Al Fariz</b><br />
              <p>Web Developer</p>
            </div>
            <div className="
                [mask-image:radial-gradient(ellipse_at_45%_50%,var(--mg-4)_-100%,transparent_70%)]
                text-center max-w-[40vw]
              ">Web development | Figma | VSCode | Vanilla | Trae | Prompt Engineering | Adobe XD | UI/UX | Web design | Cursor | Copilot | Claude | Git | HTML | CSS | Javascript | Python | Typescript | React.js | Next.js | PHP | Laravel | Silverstripe | Django | Tailwind CSS | Bootstrap | jQuery | mPdf | Payment Gateway | Midtrans | Django-rest-framework | face_recognition | Machine learning | Artificial Intelligence | Pytorch | Dlib | CI/CD | Web deployment | Database engineering | MySQL | PostgreSQL | Git | HTML | CSS | Javascript | Python | Typescript | React.js | Next.js | PHP | Laravel | Silverstripe | Django | Tailwind CSS | Bootstrap | jQuery | mPdf | Payment Gateway | Midtrans | Django-rest-framework | face_recognition | Machine learning | React.js | Next.js | Artificial Intelligence | Pytorch | Web deployment | Database engineering | MySQL | PostgreSQL | Git | HTML | CSS | Javascript | Python | Typescript | React.js | Next.js | PHP | Laravel | Silverstripe | Django | Tailwind CSS | Bootstrap | jQuery | mPdf | Payment Gateway | Midtrans | Django-rest-framework | face_recognition | Machine learning | Artificial Intelligence | Pytorch | Dlib | CI/CD | Database engineering | MySQL | PostgreSQL | Vagrant | Docker | Responsive application | API | Node.JS | AI Training | Data analyzation | Realtime web application | IoT | Websocket | Pusher | Cron job | Email  & message broker | Data structure |</div>
          </div>

          <div className="grid gap-1 justify-start items-start">
            <div className="flex rounded-full w-[360px] py-1 pl-8 pr-1 shadow-md bg-[var(--bg-1)] items-center justify-between">
              <input className="focus:outline-none text-lg w-full" type="text" name="mail_content" id="main-content-1" value="Hi, I`m interested in you" readOnly/>
              <div className="animate-plane-fly cursor-pointer overflow-hidden rounded-full bg-[var(--fg-9)] text-[var(--bg-1)] min-w-[48px] min-h-[48px] items-center justify-center flex">
                <FontAwesomeIcon className="pr-1 pb-1 transform icon" icon={["fas", "paper-plane"]} />
              </div>
            </div>
            <a className="flex items-center gap-2 text-sm underline" href="#">My resume
              <FontAwesomeIcon icon={["fas", "up-right-from-square"]} />
            </a>
          </div>
        </div>
      </div>

      <PersonalInfo />
      <TechStack />
      <Signature />
      <Footer />
    </div>
  );
}

export default PortfolioWebsite;