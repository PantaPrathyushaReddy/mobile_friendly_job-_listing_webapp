import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

import {
  FaHome,
  FaBriefcase,
  FaBookmark,
  FaUser,
  FaSearch,
  FaRegBookmark,
} from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import "./Home.css";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const JobCard = ({ job, onCardClick, onSaveClick }) => (
  <div className="job-card" onClick={() => onCardClick(job.id)}>
    <div className="header1">
    <div className="card-content">

      <div className="job-info">
        <div className="job-header">

        <div className="job-logo">{job.companyLogo}</div>
        <div className="job-title1">
        
          {job.title}
          <p className="company-info">
          {job.company} | {job.location}
        </p>
          
        </div>
        </div>
       
        <div className="job-tags">
          <span className="tag1">{job.level}</span>
          <span className="tag1">{job.type}</span>
          <span className="tag1">{job.salary}</span>
        </div>
        <div></div>
        <p className="time-posted">{job.timePosted}</p>
      </div>
    </div>
    <button
      className="bookmark-button"
      onClick={(e) => {
        e.stopPropagation();
        onSaveClick(job.id);
      }}
    >
      {job.saved ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  </div>
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const {
    searchQuery,
    handleSearch: contextHandleSearch,
    toggleSaveJob: contextToggleSaveJob,
    filteredJobs,
    showAllSuggested,
    setShowAllSuggested,
    showAllRecommended,
    setShowAllRecommended,
  } = useAppContext();

  const [activeTab, setActiveTab] = useState("home");
  const [showFilters, setShowFilters] = useState(false);

  
  const allJobs = [...filteredJobs];
  const suggestedJobs = allJobs.slice(0, Math.min(3, allJobs.length));
  const recommendedJobs = allJobs.length > 3 ? allJobs.slice(3) : [];

  const displayedSuggestedJobs = showAllSuggested
    ? suggestedJobs
    : suggestedJobs.slice(0, 1);
  const displayedRecommendedJobs = showAllRecommended
    ? recommendedJobs
    : recommendedJobs.slice(0, 1);

  const handleSearch = (e) => {
    contextHandleSearch(e.target.value);
  };

  return (
    <div className="home-container">
      <header className="custom-header">
  <div className="top-bar">
    <button className="menu-button">
      <span className="menu-icon">☰</span>
    </button>
    <div className="right-icons">
      <button className="icon-button">
        <NotificationImportantIcon size={18} />
      </button>
      <div className="header-profile" onClick={() => navigate("/profile")}>
        <img
          src="/Prathyusha.jpeg"
          alt="Profile"
          className="profile-pic"
        />
      </div>
    </div>
  </div>
  <h1 className="main-heading">Let's Find Job</h1>
</header>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search Job"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
        <button
          className="filter-button"
          onClick={() => setShowFilters(!showFilters)}
        >
          <IoFilter size={20} />
        </button>
      </div>

      <main className="main-content">
        {filteredJobs.length === 0 ? (
          <div className="no-results">
            <p>No jobs found matching your search criteria</p>
          </div>
        ) : (
          <>
            {suggestedJobs.length > 0 && (
              <div className="section suggested-jobs">
                <div className="section-header">
                  <h2>Suggested for you</h2>
                  {suggestedJobs.length > 1 && (
                    <button
                      className="view-all"
                      onClick={() => setShowAllSuggested((prev) => !prev)}
                    >
                      {showAllSuggested ? "Show Less" : "View All"}
                    </button>
                  )}
                </div>
                <div className="jobs-list">
                  {displayedSuggestedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onCardClick={(id) => navigate(`/job/${id}`)}
                      onSaveClick={contextToggleSaveJob}
                    />
                  ))}
                </div>
              </div>
            )}

            {recommendedJobs.length > 0 && (
              <div className="section recommended-jobs">
                <div className="section-header">
                  <h2>Recommended for you</h2>
                  {recommendedJobs.length > 1 && (
                    <button
                      className="view-all"
                      onClick={() => setShowAllRecommended((prev) => !prev)}
                    >
                      {showAllRecommended ? "Show Less" : "View All"}
                    </button>
                  )}
                </div>
                <div className="jobs-list">
                  {displayedRecommendedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      onCardClick={(id) => navigate(`/job/${id}`)}
                      onSaveClick={contextToggleSaveJob}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <nav className="bottom-nav">
        <div
          className={`nav-item ${activeTab === "home" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("home");
            navigate("/");
          }}
        >
          <FaHome size={20} />
          <span>Home</span>
        </div>
        <div
          className={`nav-item ${activeTab === "jobs" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("jobs");
            navigate("/jobs");
          }}
        >
          <FaBriefcase size={20} />
          <span>Jobs</span>
        </div>
        <div
          className={`nav-item ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("saved");
            navigate("/saved");
          }}
        >
          <FaBookmark size={20} />
          <span>Saved</span>
        </div>
        <div
          className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("profile");
            navigate("/profile");
          }}
        >
          <FaUser size={20} />
          <span>Profile</span>
        </div>
      </nav>
    </div>
  );
};

export default Home;
