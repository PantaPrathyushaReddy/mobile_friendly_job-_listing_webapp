import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSuggested, setShowAllSuggested] = useState(false);
  const [showAllRecommended, setShowAllRecommended] = useState(false);
  const [userData, setUserData] = useState({
    location: 'Hyderabad,India',
    phone: '+91 8688582536',
    email: 'prathyushapanta@gmail.com',
    aboutMe: 'I am a motivated and dedicated software developer with 2 years of hands-on experience in designing and developing user-friendly and responsive web applications. I specialize in frontend development using technologies like React.js, JavaScript, HTML, CSS, and Tailwind CSS. I enjoy solving real-world problems through clean, efficient code and collaborating with cross-functional teams to deliver high-quality products. I am eager to take on new challenges and grow my skills in a dynamic work environment.',  experience: [
      {
        id: 1,
        title: 'Software Develveloper',
        company: 'KPI Tech Services',
        location: 'Hyderabad,India',
        period: 'Jul 2023-March 2025'
      }
    ],
    education: [
      {
        id: 1,
        degree: 'Computer Science and Engineer',
        school: 'Sri Mittapalli Institute of Technology for Womens',
        period: '2018 - 2022'
      }
    ],
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    progress: 9
  });
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Designer",
      company: "Info Corp",
      location: "New York",
      level: "Senior",
      type: "Full Time",
      salary: "50k - 70k",
      workMode: "Remote",
      timePosted: "10 hours ago",
      saved: false,
      companyLogo: "I",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat.",
      responsibilities: [
        "Build responsive and user-friendly web interfaces",
        "Collaborate with UX designers to implement designs",
        "Optimize applications for maximum performance",
        "Implement best practices for web development"
      ]
    },
    {
      id: 2,
      title: "Python Developer",
      company: "Code INC",
      location: "Germany",
      level: "Senior",
      type: "Full Time",
      salary: "80k-90k",
      workMode: "Remote",
      timePosted: "2 days ago",
      saved: false,
      companyLogo: "C",
      description: "Join our team as a Python Developer to build scalable and efficient backend systems. We're looking for someone who is passionate about clean code and innovative solutions.",
      responsibilities: [
        "Develop and maintain Python-based applications",
        "Write clean, testable, and efficient code",
        "Integrate user-facing elements with server-side logic",
        "Implement security and data protection measures"
      ]
    },
    {
      id: 3,
      title: "Product Engineer",
      company: "Cube Tech",
      location: "UK",
      level: "Senior",
      type: "Part Time",
      salary: "60k-75k",
      workMode: "Remote",
      timePosted: "1 week ago",
      saved: false,
      companyLogo: "C",
      description: "We're seeking an experienced Product Engineer to join our innovative team. You'll be working on cutting-edge products that solve real-world problems.",
      responsibilities: [
        "Lead product development initiatives",
        "Collaborate with cross-functional teams",
        "Design and implement new product features",
        "Analyze and improve product performance"
      ]
    },
    {
      id: 4,
      title: "UI/UX Designer",
      company: "Design Co",
      location: "Canada",
      level: "Mid-Level",
      type: "Full Time",
      salary: "65k-80k",
      workMode: "Hybrid",
      timePosted: "3 days ago",
      saved: false,
      companyLogo: "D",
      description: "Join our creative team as a UI/UX Designer to craft beautiful and intuitive user experiences for our digital products.",
      responsibilities: [
        "Create user-centered designs",
        "Develop UI mockups and prototypes",
        "Conduct user research and testing",
        "Collaborate with development team"
      ]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      company: "Cloud Systems",
      location: "Australia",
      level: "Senior",
      type: "Full Time",
      salary: "90k-110k",
      workMode: "Remote",
      timePosted: "5 days ago",
      saved: false,
      companyLogo: "C",
      description: "Looking for an experienced DevOps Engineer to help us build and maintain our cloud infrastructure.",
      responsibilities: [
        "Manage cloud infrastructure",
        "Implement CI/CD pipelines",
        "Monitor system performance",
        "Ensure system security"
      ]
    },
    {
      id: 6,
      title: "Full Stack Developer",
      company: "Tech Solutions",
      location: "Singapore",
      level: "Senior",
      type: "Full Time",
      salary: "75k-95k",
      workMode: "Remote",
      timePosted: "1 day ago",
      saved: false,
      companyLogo: "T",
      description: "Join our team as a Full Stack Developer to work on exciting projects using the latest technologies.",
      responsibilities: [
        "Develop full-stack applications",
        "Write clean and maintainable code",
        "Optimize application performance",
        "Collaborate with the development team"
      ]
    }
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleSaveJob = (jobId) => {
    setJobs(jobs.map(job => 
      job.id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const searchJobs = (query) => {
    if (!query) return jobs;
    return jobs.filter(job => 
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.company.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredJobs = searchJobs(searchQuery);

  const updateUserProfile = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExperience = (experience) => {
    setUserData(prev => ({
      ...prev,
      experience: [...prev.experience, { ...experience, id: prev.experience.length + 1 }]
    }));
  };

  const addEducation = (education) => {
    setUserData(prev => ({
      ...prev,
      education: [...prev.education, { ...education, id: prev.education.length + 1 }]
    }));
  };

  const deleteExperience = (id) => {
    setUserData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const deleteEducation = (id) => {
    setUserData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const value = {
    jobs,
    searchQuery,
    handleSearch,
    userData,
    updateUserProfile,
    addExperience,
    addEducation,
    deleteExperience,
    deleteEducation,
    toggleSaveJob,
    filteredJobs,
    showAllSuggested,
    setShowAllSuggested,
    showAllRecommended,
    setShowAllRecommended
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppProvider };
