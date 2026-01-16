import { TechStackItem, TechStackConnection, Project, Certificate } from '@/interface/InterfaceList';

export const techStacks: TechStackItem[] = [
  {
    key: "js",
    icon: "js",
    name: "Javascript",
    proficiency: 0.85
  },
  {
    key: "react",
    icon: "react",
    name: "React.js",
    proficiency: 0.75
  },
  {
    key: "ts",
    icon: "typescript",
    name: "Typescript",
    proficiency: 0.7
  },
  {
    key: "jquery",
    icon: "jquery",
    name: "jQuery",
    proficiency: 0.85
  },
  {
    key: "html",
    icon: "html5",
    name: "HTML",
    proficiency: 0.85
  },
  {
    key: "css",
    icon: "css3",
    name: "CSS",
    proficiency: 0.8
  },
  {
    key: "bootstrap",
    icon: "bootstrap5",
    name: "Bootstrap",
    proficiency: 0.75
  },
  {
    key: "tailwindcss",
    icon: "tailwindcss",
    name: "TailwindCSS",
    proficiency: 0.7
  },
  {
    key: "node",
    icon: "nodejs",
    name: "Node.js",
    proficiency: 0.7
  },
  {
    key: "next",
    icon: "nextjs",
    name: "Next.js",
    proficiency: 0.75
  },
  {
    key: "php",
    icon: "php",
    name: "PHP",
    proficiency: 0.75
  },
  {
    key: "laravel",
    icon: "laravel",
    name: "Laravel",
    proficiency: 0.7
  },

  {
    key: "silverstripe",
    name: "Silverstripe",
    proficiency: 0.8
  },
  {
    key: "python",
    icon: "python",
    name: "Python",
    proficiency: 0.75
  },
  {
    key: "django",
    icon: "django",
    name: "Django",
    proficiency: 0.75
  },
  {
    key: "tensorflow",
    name: "Tensorflow",
    proficiency: 0.6
  },
  {
    key: "mysql",
    icon: "mysql",
    name: "MySQL",
    proficiency: 0.75
  },
  {
    key: "postgresql",
    icon: "postgresql",
    name: "PostgreSQL",
    proficiency: 0.7
  },
  {
    key: "git",
    icon: "git",
    name: "Git",
    proficiency: 0.7
  },
  {
    key: "figma",
    icon: "figma",
    name: "Figma",
    proficiency: 0.85
  },
];

export const techStackConns: TechStackConnection[] = [
  { from: "js", to: "react" },
  { from: "js", to: "jquery" },
  { from: "js", to: "node" },
  { from: "js", to: "next" },
  { from: "react", to: "node" },
  { from: "react", to: "next" },
  { from: "react", to: "ts" },
  { from: "react", to: "react" },
  { from: "html", to: "next" },
  { from: "html", to: "css" },
  { from: "html", to: "js" },
  { from: "css", to: "bootstrap" },
  { from: "css", to: "tailwindcss" },
  { from: "ts", to: "next" },
  { from: "ts", to: "node" },
  { from: "php", to: "laravel" },
  { from: "php", to: "silverstripe" },
  { from: "mysql", to: "postgresql" },
  { from: "python", to: "django" },
  { from: "python", to: "tensorflow" },
];

export const projects: Project[] = [
  {
    title: "Muatmuat",
    tagLine: "Logistics Super App Ecosystem",
    description: "Logistic ecosystem for managing transportation, product, and logistic related activity.",
    longDescription: "A powerful logistics management ecosystem developed by PT AZLogistik, designed to streamline transportation and logistics operations across multiple platforms. Muatmuat integrates fleet management, shipment coordination, advertising, and e-commerce for commercial vehicle parts into a single responsive, multi-language environment.",
    feature: [
      "Multi-role access control (Admin, Shipper, Transporter, Seller, Buyer)",
      "Load marketplace and ad platform for logistics services",
      "E-commerce for truck parts via Muatparts",
      "Built-in translation management",
    ],
    image: [
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752823375/WhatsApp_Image_2025-07-18_at_14.10.47_uelt3d.jpg',
    ],
    tech: ['React.js', 'Next.js', 'TailwindCSS', 'Node.js', 'JQuery', 'Silverstripe', 'Bootstrap'],
    tags: ["Logistic", "Multi Language", "Super-app", "E-commerce"],
    isPrivate: false,
    projectLink: "https://muatmuat.com/",
  },
  {
    title: "Baris UINSA",
    description: 'E-learning platform for Universitas Islam Negeri Sunan Ampel Surabaya. Features exam, module, & learning cms',
    image: [
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752943180/baris-uinsa-1_h6hhoi.png',
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752943185/baris-uinsa-2_q0kigi.png',
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752943190/baris-uinsa-3_uomadz.png',
    ],
    tech: ['Laravel', 'Bootstrap', 'jQuery'],
    isPrivate: false,
    projectLink: "https://baris.uinsa.ac.id/"
  },
  {
    title: 'Monitoring Mesin Angguk',
    description: 'Web platform for managing and monitor oil Pump state on oil mine. Features realtime alerting system using Iot technologies.',
    image: [
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752986485/angguk2_w6zubk.jpg',
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752986477/angguk1_oekvva.jpg'
    ],
    tech: ['Laravel', 'jQuery', 'Pusher', 'Websocket', 'Bootstrap', 'CURL', 'MySQL'],
    isPrivate: false,
  },
  {
    title: 'C.F.A.S.',
    description: 'Web based platform for class face attendance system (CFAS). Used for managing attendee and monitor attendance using face recognition.',
    image: [
      'https://res.cloudinary.com/djou33ws6/image/upload/v1753111932/8189cdd9-5a16-4208-831e-b6594a76c866.png',
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752991177/CFAS_xoe7fy.png',
    ],
    tech: ['Django', 'Dlib', 'face_recognition', 'Websocket', 'jQuery', 'Bootstrap'],
    isPrivate: false,
    gitLink: "https://github.com/rijalalfariz/face-attendance"
  },
  {
    title: 'Muatpart',
    description: 'Part of Muatmuat ecosystem specifically built as E-commerce platorm for truck and logistic spareparts or services.',
    image: [
      'https://res.cloudinary.com/djou33ws6/image/upload/v1752910429/muatparts_zlgnjg.jpg'
    ],
    tech: ['React.js', 'Next.js', 'Node.js', 'TailwindCSS'],
    isPrivate: false,
  },
  {
    title: 'Company Profile/Landing Page',
    description: 'Representation of multiple and various product for a company with optimized SEO & performance score.',
    image: [
      'https://res.cloudinary.com/djou33ws6/image/upload/v1753071723/fa360d27-9b59-4428-9e74-610b20828219.png',
      'https://res.cloudinary.com/djou33ws6/image/upload/v1753071748/cb1bad3d-85fe-48c5-9081-6706c91c7fcf.png',
      'https://res.cloudinary.com/djou33ws6/image/upload/v1753071768/415be1e1-439d-4a0c-8e06-723e6d7b774d.png'
    ],
    tech: ['Bootstrap', 'jQuery', 'HTML', 'CSS'],
    isPrivate: false,
  },
  {
    title: 'Dashboard Executive Pemprov Jawa Timur',
    description: 'Platform to display dataset in graphics interface. Allowing users to view briefly about datasets uploaded by OPD (regional autonomy apparatus). Has multiple user levels and permissions.',
    image: [
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573828/image_2_mfhjvq.jpg',
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573829/image_x8f47e.jpg',
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573827/image_1_gug6e9.jpg'
    ],
    tech: ['Metabase', 'React.js', 'Next.js', 'Nest.js', 'Postgresql', 'Docker', 'SSO auth'],
    isPrivate: false,
  },
  {
    title: 'Dashboard Monitoring Monev',
    description: 'Just like Dashboard Executive Pemprov Jawa Timur, a platform to display dataset in graphics interface, but its more general and with different point-of view. Allowing users to view briefly about datasets uploaded by OPD (regional autonomy apparatus) and OPD scores with the data they have. Also has multiple user levels and permissions.',
    image: [
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573757/image_pys7pc.jpg',
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573795/WhatsApp_Image_2026-01-16_at_21.29.33_nvek4r.jpg'
    ],
    tech: ['Metabase', 'React.js', 'Next.js', 'Nest.js', 'Postgresql', 'Docker', 'SSO auth'],
    isPrivate: false,
  },
  {
    title: 'Satu Data Pemprov Jawa Timur',
    description: 'Platform to manage dataset from regional autonomy apparatus and displays the datasets to the public (opendata). Featuring data approval from multiple user levels and data quality score monitoring for each dataset created.',
    image: [
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768572868/image_ma7tq2.jpg',
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768572710/WhatsApp_Image_2026-01-16_at_21.11.09_nohlfp.jpg'
    ],
    tech: ['Angular', 'FastAPI', 'Postgresql', 'Pandas', 'Docker', 'sqlAlchemy', 'Python', 'Node js'],
    isPrivate: false,
  },
  {
    title: 'Portal Data Jawa Timur',
    description: 'Simple Landing page to direct users to all platforms created by Jatim Government. The platform includes Open Data, Satu Data, Satu Peta, and Dashboard Publik. Each platform has its own service and features.',
    image: [
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573882/data_jatim_fzcpcc.jpg',
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573881/data_jatim_2_al2e31.jpg'
    ],
    tech: ['Bootstrap', 'HTML', 'CSS', 'Next js'],
    isPrivate: false,
  },
  {
    title: 'Bolt Construction Tech SaaS',
    description: 'A platform to manage construction related features including RFI, Action Items, Submittals, Drawing, and file managements. It has multiple user levels and permissions such as, project admin, manager, design teams, and general constructor. This platform also features a pdf editor and drawing. Allowing users to attach and customize their attachment on certain menus.',
    image: [
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573892/image_rv4ml8.png',
      'https://res.cloudinary.com/dswhxavef/image/upload/v1768573891/image_1_piqnlt.jpg'
    ],
    tech: ['React Navite', 'Nest js', 'Node js', 'AWS S3 Bucket', 'AWS Appsync', 'AWS GraphQL', 'AWS Dynamo DB', 'PostgreSQL'],
    isPrivate: true,
  },
]

export const certificates: Certificate[] = [
  {
    src: 'https://res.cloudinary.com/djou33ws6/image/upload/v1753153792/ffac9ed7-c9f1-429f-8c8e-f292773e6c78.png',
  },
  {
    src: 'https://res.cloudinary.com/djou33ws6/image/upload/v1753153831/ea337004-8d33-400c-a33c-b46f16593dce.png',
  },
  {
    src: 'https://res.cloudinary.com/djou33ws6/image/upload/v1753153841/f76ab928-5365-4c50-9951-ce7174b859ab.png',
  },
  {
    src: 'https://res.cloudinary.com/djou33ws6/image/upload/v1753153802/33c9aae0-a62b-4d96-b712-9079eafe0cf2.png',
  },
  {
    src: 'https://res.cloudinary.com/djou33ws6/image/upload/v1753153810/011656bf-80a3-4d7b-af09-cf69dd57806e.png',
  },
]
