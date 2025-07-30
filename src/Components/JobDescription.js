import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './JobDescription.css';
const JobDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { jobs } = useAppContext();
  
  const job = jobs.find(j => j.id === parseInt(id));
  
  if (!job) {
    return <div>Job not found</div>;
  }

  const jobData = job;

  return (
    <div className="job-description">
      <header className="job-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate(-1)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h2>Job Description</h2>
          <button className="share-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </header>

      <div className="job-content">
        <div className="company-logo">
          <div className="logo-container">
            <svg width="90" height="40" viewBox="0 0 40 40" fill="#6B4EFF" align="center">
              <rect width="40" height="40" rx="8"/>
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="20">
                {jobData.company[0]}
              </text>
            </svg>
          </div>
        </div>

        <div className="job-info1" >
          <h3 className="job-title">{jobData.title}</h3>
          <p className="company-location">{jobData.company} | {jobData.location}</p>
          <p className="salary">{jobData.salary}</p>
          <div className="job-meta">
            <div className="tags-container">
              <span className="tag">{jobData.level}</span>
              <span className="tag">{jobData.type}</span>
              <span className="tag">{jobData.workMode}</span>
            </div>
           
          </div>
        </div>

        <div className="content-tabs">
          <button className="tab active">Job Details</button>
          <button className="tab">About Company</button>
        </div>

        <div className="job-details">
          <section className="details-section">
            <h4>Job Description</h4>
            <p>{jobData.description}</p>
          </section>

          <section className="details-section">
            <h4>Key Responsibilities</h4>
            <ul className="responsibilities-list">
              {jobData.responsibilities.map((resp, index) => (
                <li key={index}>
                  <span className="bullet">•</span> {resp}
                </li>
              ))}
            </ul>
          </section>
        </div>
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDescription;
