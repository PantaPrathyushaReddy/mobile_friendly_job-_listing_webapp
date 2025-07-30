import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import './Profile.css';
import GroupIcon from '@mui/icons-material/Group';
import LocationPinIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import ArticleIcon from '@mui/icons-material/Article';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';

import SchoolIcon from '@mui/icons-material/School';
const Profile = () => {
  const navigate = useNavigate();
  const {
    userData,
    updateUserProfile,
    addExperience,
    addEducation,
  } = useAppContext();

  const [editMode, setEditMode] = useState({
    contactInfo: false,
    about: false
  });

  const [showAddExperience, setShowAddExperience] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    period: ''
  });

  const [editingId, setEditingId] = useState(null);
  const [editingData, setEditingData] = useState({
    title: '',
    company: '',
    location: '',
    period: ''
  });

  const [showAddEducation, setShowAddEducation] = useState(false);
  const [newEducation, setNewEducation] = useState({
    degree: '',
    school: '',
    period: ''
  });

  const handleContactEdit = () => {
    setEditMode(prev => ({ ...prev, contactInfo: !prev.contactInfo }));
  };

  const handleAboutEdit = () => {
    setEditMode(prev => ({ ...prev, about: !prev.about }));
  };

  const handleContactSave = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    updateUserProfile('location', formData.get('location'));
    updateUserProfile('phone', formData.get('phone'));
    updateUserProfile('email', formData.get('email'));
    setEditMode(prev => ({ ...prev, contactInfo: false }));
  };

  const handleAboutSave = (e) => {
    e.preventDefault();
    updateUserProfile('about', e.target.about.value);
    setEditMode(prev => ({ ...prev, about: false }));
  };

  const handleAddExperience = (e) => {
    e.preventDefault();
    addExperience(newExperience);
    setNewExperience({
      title: '',
      company: '',
      location: '',
      period: ''
    });
    setShowAddExperience(false);
  };

  const handleEditExperience = (exp) => {
    setEditingId(exp.id);
    setEditingData({
      title: exp.title,
      company: exp.company,
      location: exp.location,
      period: exp.period
    });
  };

  const handleSaveEditExperience = () => {
    const updatedExperience = userData.experience.map(exp =>
      exp.id === editingId ? { ...exp, ...editingData } : exp
    );

    updateUserProfile('experience', updatedExperience);

    setEditingId(null);
    setEditingData({
      title: '',
      company: '',
      location: '',
      period: ''
    });
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    addEducation(newEducation);
    setNewEducation({
      degree: '',
      school: '',
      period: ''
    });
    setShowAddEducation(false);
  };

  const [editingEduId, setEditingEduId] = useState(null);
const [editingEduData, setEditingEduData] = useState({
  degree: '',
  school: '',
  period: ''
});
const handleEditEducation = (edu) => {
  setEditingEduId(edu.id);
  setEditingEduData({
    degree: edu.degree,
    school: edu.school,
    period: edu.period
  });
};

const handleSaveEditEducation = () => {
  const updatedEducation = userData.education.map(edu =>
    edu.id === editingEduId ? { ...edu, ...editingEduData } : edu
  );
  updateUserProfile('education', updatedEducation);
  setEditingEduId(null);
};


  return (
    <div className="profile">
      <header className="profile-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <h2>Profile</h2>
        <button className="settings-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
          </svg>
        </button>
      </header>

      <div className="profile-content">
        {/* Contact Info */}
        <section className="contact-info">
          <div className="section-header">
            <div className="section-title">
              <GroupIcon className="section-icon" />
              <h3>Contact Info</h3>
            </div>
            <button className="edit-button" onClick={handleContactEdit}>
              {editMode.contactInfo ? 'Save' : '✎'}
            </button>
          </div>
          <hr style={{ border: 'none', height: '1px', backgroundColor: '#9a8ed7ff', margin: '5px 0' }} />

          {editMode.contactInfo ? (
            <form onSubmit={handleContactSave} className="edit-form">
              <div className="form-group">
                <label>Location</label>
                <input name="location" defaultValue={userData.location} />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="phone" defaultValue={userData.phone} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" defaultValue={userData.email} />
              </div>
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          ) : (
            <div className="info-details">
              <div className="info-item">
                <span className="icon"><LocationPinIcon /></span>
                <p>{userData.location}</p>
              </div>
              <div className="info-item">
                <span className="icon"><LocalPhoneIcon /></span>
                <p>{userData.phone}</p>
              </div>
              <div className="info-item">
                <span className="icon"><EmailIcon /></span>
                <p>{userData.email}</p>
              </div>
            </div>
          )}
        </section>

        {/* About Me */}
        <section className="about-me">
          <div className="section-header">
            <div className="section-title">
              <ArticleIcon className="section-icon" />
              <h3>About Me</h3>
            </div>
            <button className="edit-button" onClick={handleAboutEdit}>
              {editMode.about ? 'Save' : '✎'}
            </button>
          </div>
          <hr style={{ border: 'none', height: '1px', backgroundColor: '#9a8ed7ff', margin: '5px 0' }} />

          {editMode.about ? (
            <form onSubmit={handleAboutSave} className="edit-form">
              <textarea name="about" defaultValue={userData.about} rows="4" />
              <button type="submit" className="save-button">Save Changes</button>
            </form>
          ) : (
            <p className="about-content">{userData.aboutMe}</p>
          )}
        </section>

        {/* Experience */}
        <section className="experience">
        
<div className="section-header">
            <div className="section-title">
              <WorkOutlineIcon className="section-icon" />
            <h3>Experience</h3>
            </div>
            {!showAddExperience && (
              <button className="add-button" onClick={() => setShowAddExperience(true)}>+</button>
            )}
          </div>
          <hr style={{ border: 'none', height: '1px', backgroundColor: '#9a8ed7ff', margin: '5px 0' }} />

          {showAddExperience && (
            <form className="add-form" onSubmit={handleAddExperience}>
              <input
                placeholder="Job Title"
                value={newExperience.title}
                onChange={e => setNewExperience(prev => ({ ...prev, title: e.target.value }))}
              />
              <input
                placeholder="Company"
                value={newExperience.company}
                onChange={e => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
              />
              <input
                placeholder="Location"
                value={newExperience.location}
                onChange={e => setNewExperience(prev => ({ ...prev, location: e.target.value }))}
              />
              <input
                placeholder="Period (e.g., Jan 2020 - Present)"
                value={newExperience.period}
                onChange={e => setNewExperience(prev => ({ ...prev, period: e.target.value }))}
              />
              <button type="submit">Add Experience</button>
            </form>
          )}

          <div className="experience-list">
            {userData.experience.map(exp => (
              <div key={exp.id} className="experience-item">
                {editingId === exp.id ? (
  <div className="experience-edit-form">
    <div className="form-group">
      <label>Title</label>
      <input
        value={editingData.title}
        onChange={e => setEditingData(prev => ({ ...prev, title: e.target.value }))}
      />
    </div>
    <div className="form-group">
      <label>Company</label>
      <input
        value={editingData.company}
        onChange={e => setEditingData(prev => ({ ...prev, company: e.target.value }))}
      />
    </div>
    <div className="form-group">
      <label>Location</label>
      <input
        value={editingData.location}
        onChange={e => setEditingData(prev => ({ ...prev, location: e.target.value }))}
      />
    </div>
    <div className="form-group">
      <label>Period</label>
      <input
        value={editingData.period}
        onChange={e => setEditingData(prev => ({ ...prev, period: e.target.value }))}
      />
    </div>
    <div className="form-buttons">
      <button className="save-button" onClick={() => handleSaveEditExperience(exp.id)}>
        Save
      </button>
      <button className="cancel-button" onClick={() => setEditingId(null)}>
        Cancel
      </button>
    </div>
  </div>
) : (
<div className="experience-card-inner">
                     <div className="experience-logo">🏢</div>
                     <div className="experience-details">
                       <div className="experience-title-row">
                         <h4>{exp.title}</h4>
                        <button className="edit-button" onClick={() => handleEditExperience(exp)}>✎</button>
                      </div>
                      <p><em>{exp.company}</em> | {exp.location}</p>
                      <p className="date">{exp.period}</p>                     </div>
                  </div>
)}

              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="education">
           <div className="section-header">
            <div className="section-title">
              <SchoolIcon className='section-icon'/>
            <h3>Education</h3>
            </div>
             {!showAddEducation && (
              <button className="add-button" onClick={() => setShowAddEducation(true)}>+</button>
            )}
          </div>
          <hr style={{ border: 'none', height: '1px', backgroundColor: '#9a8ed7ff', margin: '5px 0'}}/>
          {showAddEducation && (
            <form className="add-form" onSubmit={handleAddEducation}>
              <input placeholder="Degree" value={newEducation.degree} onChange={e => setNewEducation(prev => ({ ...prev, degree: e.target.value }))} />
              <input placeholder="School" value={newEducation.school} onChange={e => setNewEducation(prev => ({ ...prev, school: e.target.value }))} />
              <input placeholder="Period (e.g., 2016 - 2020)" value={newEducation.period} onChange={e => setNewEducation(prev => ({ ...prev, period: e.target.value }))} />
              <button type="submit">Add Education</button>
            </form>
          )}

          <div className="education-list">
            {userData.education.map(edu => (
  <div key={edu.id} className="education-item">
    {editingEduId === edu.id ? (
  <form className="education-edit-form" onSubmit={(e) => {
    e.preventDefault();
    handleSaveEditEducation();
  }}>
    <div className="form-group">
      <label htmlFor="degree">Degree</label>
      <input
        id="degree"
        placeholder="e.g. B.Tech in Computer Engineering"
        value={editingEduData.degree}
        onChange={e => setEditingEduData(prev => ({ ...prev, degree: e.target.value }))}
      />
    </div>
    <div className="form-group">
      <label htmlFor="school">School / University</label>
      <input
        id="school"
        placeholder="e.g. Tech University"
        value={editingEduData.school}
        onChange={e => setEditingEduData(prev => ({ ...prev, school: e.target.value }))}
      />
    </div>
    <div className="form-group">
      <label htmlFor="period">Study Period</label>
      <input
        id="period"
        placeholder="e.g. 2016 - 2020"
        value={editingEduData.period}
        onChange={e => setEditingEduData(prev => ({ ...prev, period: e.target.value }))}
      />
    </div>
    <div className="form-buttons">
      <button type="submit" className="save-button">💾 Save</button>
      <button type="button" className="cancel-button" onClick={() => setEditingEduId(null)}>Cancel</button>
    </div>
  </form>
) : (
    
    <div className="experience-card-inner">
            <div className="experience-logo">🎓</div>
                   <div className="experience-details">
                     <div className="experience-title-row">
                        <h4>{edu.degree}</h4>
                        <button className="edit-button" onClick={() => handleEditEducation(edu)}>✎</button>
                      </div>
                      <p>{edu.school}</p>
                       <p className="date">{edu.period}</p>
                     </div>
                   </div>
    )}
  </div>
))}

          </div>
        </section>
      </div>
      <nav className="bottom-nav">
        <button className="nav-item" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span>Home</span>
        </button>
        <button className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span>My Jobs</span>
        </button>
        <button className="nav-item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>Chat</span>
        </button>
        <button className="nav-item active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 3a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <span>Profile</span>
        </button>
      </nav>
    </div>
  );
};

export default Profile;

