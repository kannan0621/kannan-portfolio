const calculateExp = () => {
  const start = new Date('2023-06-01');
  const now = new Date();
  const diffMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const years = (diffMonths / 12).toFixed(1);
  return `${years}+ Yrs`;
};

export const initialPortfolioData = {
  hero: {
    name: "R. KANNAN",
    title: "MERN Stack Developer",
    subTitle: "Designing & Building Scalable, High-Performance Front-End & Full-Stack Web Applications",
    location: "Coimbatore, Tamil Nadu, India",
    phone: "+91 6369307080",
    email: "r.kannan0621@gmail.com",
    github: "https://github.com/rkannan0621",
    linkedin: "https://linkedin.com/in/rkannan0621",
    availability: "Available for Immediate Roles & Projects",
    experienceYears: calculateExp(),
    projectsCount: "50+"
  },
  about: {
    summary: `Motivated MERN Stack Developer with ${calculateExp()} of hands-on experience designing and deploying scalable web applications using MongoDB, Express.js, React.js, and Node.js. Specialized in engineering high-throughput RESTful APIs, JWT authentication, role-based access control (RBAC), and high-performance front-end UIs. Reduced page load times by 42% and supported 25,000+ active users across enterprise client applications.`,
    whoIAm: "I am a dedicated front-end and full-stack engineer driven by building efficient RESTful services and intuitive user interfaces. With a strong background in Mechanical Engineering, I bring systematic problem solving, algorithmic thinking, and structural precision to web applications.",
    learningGoals: "Continuously advancing expertise in microservices architecture, Next.js 14, WebSockets, cloud deployments (AWS/Vercel), and advanced performance optimization.",
    careerGoals: "Aiming to contribute to high-impact engineering teams by building resilient, user-centric, and high-performance digital products.",
    stats: [
      { label: "Years Experience", value: calculateExp() },
      { label: "Projects Delivered", value: "50+" },
      { label: "Performance Optimization", value: "42%" }
    ]
  },
  skills: [
    { name: "React.js", category: "Frontend", level: 95, icon: "React" },
    { name: "JavaScript (ES6+)", category: "Frontend", level: 92, icon: "Js" },
    { name: "Redux & State Optimization", category: "Frontend", level: 85, icon: "Redux" },
    { name: "HTML5 & CSS3", category: "Frontend", level: 95, icon: "Html" },
    { name: "Tailwind CSS & Bootstrap", category: "Frontend", level: 90, icon: "Css" },
    { name: "Material UI", category: "Frontend", level: 88, icon: "Mui" },
    { name: "Axios & Fetch API", category: "Frontend", level: 92, icon: "Api" },
    { name: "Node.js", category: "Backend", level: 90, icon: "Node" },
    { name: "Express.js", category: "Backend", level: 90, icon: "Express" },
    { name: "RESTful API Engineering", category: "Backend", level: 95, icon: "Rest" },
    { name: "JWT Authentication", category: "Backend", level: 90, icon: "Jwt" },
    { name: "RBAC (Role-Based Access)", category: "Backend", level: 90, icon: "Rbac" },
    { name: "MVC Architecture", category: "Backend", level: 88, icon: "Mvc" },
    { name: "MongoDB", category: "Database", level: 90, icon: "Mongo" },
    { name: "Mongoose ORM", category: "Database", level: 90, icon: "Mongoose" },
    { name: "Database Schema Design", category: "Database", level: 85, icon: "Db" },
    { name: "Git & GitHub Workflow", category: "Tools", level: 90, icon: "Git" },
    { name: "Protected Routing", category: "Tools", level: 92, icon: "Route" },
    { name: "Responsive Web Design", category: "Tools", level: 95, icon: "Mobile" },
    { name: "Performance & Code-Splitting", category: "Tools", level: 88, icon: "Speed" }
  ],
  experience: [
    {
      id: "exp-1",
      role: "Front-End Developer",
      company: "Harvee Designs",
      location: "Coimbatore, Tamil Nadu",
      period: "Feb 2024 – Present",
      type: "Full-Time",
      description: "Leading front-end architecture and RESTful API integration for client React.js applications.",
      points: [
        "Engineered 12+ responsive React.js web application UIs integrated with RESTful APIs, accelerating data rendering speed by 35% and ensuring seamless client-server state synchronization.",
        "Architected responsive, component-driven front-end UIs serving 25,000+ monthly active users; implemented secure API consumption using Axios & Fetch API with JWT Bearer token authorization.",
        "Developed customizable dark/light mode context, smooth section scrolling, and high-resolution print features using modern React Hooks, cutting UI bundle load time by 28%.",
        "Optimized front-end rendering performance through strategic Redux state management, lazy loading, and code-splitting, reducing initial DOM paint time by 42% across mobile and desktop."
      ],
      skills: ["React.js", "JavaScript (ES6+)", "RESTful APIs", "Axios", "Redux", "Tailwind CSS", "Git"]
    },
    {
      id: "exp-2",
      role: "MERN Stack Developer Trainee",
      company: "Smartcliff Technologies",
      location: "Coimbatore, Tamil Nadu",
      period: "Jun 2023 – Nov 2023",
      type: "Training & Application Development",
      description: "Intensive training and application development in MongoDB, Express, React, Node.js.",
      points: [
        "Constructed 15+ RESTful API endpoints utilizing Node.js and Express.js with CRUD operations, Mongoose ORM, and JWT authentication, maintaining 99.9% API uptime.",
        "Implemented Role-Based Access Control (RBAC) across Admin, Instructor, and Student user roles, securing 100% of sensitive API routes against unauthorized requests.",
        "Designed normalized MongoDB database schemas for 10+ scalable data models, facilitating sub-50ms database query response times during peak user traffic."
      ],
      skills: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "RBAC", "Mongoose"]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "Learning Management System (LMS)",
      subtitle: "Enterprise Role-Based Learning Platform",
      category: "Full Stack",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "REST API"],
      description: "Architected an LMS using the MERN stack with RESTful API backend, JWT authentication, and role-based access control (RBAC) for admin, instructor, and student roles.",
      highlights: [
        "Architected an enterprise MERN LMS supporting 5,000+ enrolled students and 150+ courses with RESTful backend, JWT authentication, and RBAC authorization.",
        "Engineered MongoDB Mongoose schemas for users, enrollments, and progress tracking, reducing database query latency by 40% via strategic indexing.",
        "Streamlined course lifecycle workflows (creation, enrollment, video lesson tracking) via 20+ secure REST API endpoints, achieving a 98% user satisfaction rating."
      ],
      github: "https://github.com/rkannan0621/lms-mern-project",
      demo: "https://lms-demo.kannan.dev",
      featured: true,
      badge: "Featured MERN Project"
    },
    {
      id: "proj-2",
      title: "Responsive Developer Portfolio & Dynamic CMS",
      subtitle: "Recruiter-Optimized MERN Portfolio App",
      category: "Full Stack",
      tech: ["React.js", "Tailwind CSS", "JavaScript", "jsPDF", "Node.js", "Express.js", "MongoDB"],
      description: "Built a responsive single-page React.js portfolio with dark/light mode (Context API), downloadable single-page PDF resume (jsPDF), smooth scrolling, and an admin CMS content manager.",
      highlights: [
        "Created a RESTful CMS API enabling instant live updates for 100% of portfolio text, skills, and project cards with JWT authorization.",
        "Integrated single-page PDF resume generator with quantified impact metrics and instant download.",
        "Achieved 100/100 Lighthouse performance and accessibility scores with mobile-first responsive layout and zero layout shifts."
      ],
      github: "https://github.com/rkannan0621/developer-portfolio",
      demo: "https://kannan.dev",
      featured: true,
      badge: "Live Portfolio"
    },
    {
      id: "proj-3",
      title: "E-Commerce REST API with RBAC & Auth",
      subtitle: "High Throughput Backend Micro-service",
      category: "Backend",
      tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "Bcrypt"],
      description: "Engineered scalable REST backend for an e-commerce platform supporting product catalogs, customer carts, order placement, and vendor role authorization.",
      highlights: [
        "Developed JWT token validation & password hashing with Bcrypt, securing 50,000+ daily API transactions.",
        "Constructed optimized Mongoose aggregation pipelines, accelerating analytics and inventory query speed by 45%."
      ],
      github: "https://github.com/rkannan0621/ecommerce-api-mern",
      demo: "https://api.kannan.dev",
      featured: false,
      badge: "Backend Microservice"
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.E. – Mechanical Engineering",
      institution: "P.A. College of Engineering and Technology, Pollachi",
      period: "2019 – 2023",
      details: "First Class Degree. Built strong analytical foundation, mathematical modeling, and engineering logic."
    },
    {
      id: "edu-2",
      degree: "Diploma – Mechanical Engineering",
      institution: "P.A. Polytechnic College, Pollachi",
      period: "2016 – 2019",
      details: "First Class with Distinction. Specialization in CAD design, structural mechanics, and technical projects."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      title: "MERN Stack Development",
      issuer: "N-School Academy, Coimbatore",
      year: "2023",
      credentialUrl: "https://n-school.com/verify/rkannan-mern",
      topics: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "JWT Auth", "RBAC"]
    }
  ]
};
