import { useState } from 'react'
import { asset } from '../../utils/assetPath'

export default function AboutMeApp() {
    const [activeTab, setActiveTab] = useState('profile')

    const tabs = [
        { id: 'profile', label: 'General' },
        { id: 'education', label: 'Education' },
        { id: 'interest', label: 'Experience' },
    ]

    return (
        <div style={{
            fontFamily: 'Tahoma, Arial, sans-serif',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            background: '#ECE9D8', // Classic XP window background
            padding: '8px',
            boxSizing: 'border-box',
        }}>
            {/* XP Tab Bar */}
            <div style={{ display: 'flex', borderBottom: '1px solid #919B9C', position: 'relative', zIndex: 1, paddingLeft: 2 }}>
                {tabs.map(tab => {
                    const isActive = activeTab === tab.id
                    return (
                        <div
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            style={{
                                padding: '4px 8px',
                                cursor: 'default',
                                fontSize: 11,
                                backgroundColor: isActive ? '#ECE9D8' : '#F5F4EA',
                                border: '1px solid #919B9C',
                                borderBottom: isActive ? '1px solid #ECE9D8' : '1px solid #919B9C',
                                borderTopLeftRadius: 3,
                                borderTopRightRadius: 3,
                                marginTop: isActive ? 0 : 2,
                                marginBottom: isActive ? -1 : 0,
                                marginLight: 1,
                                zIndex: isActive ? 2 : 1,
                                height: isActive ? 22 : 20,
                                boxSizing: 'border-box',
                            }}
                        >
                            {tab.label}
                        </div>
                    )
                })}
            </div>

            {/* Tab content area (inset border) */}
            <div style={{
                flex: 1,
                border: '1px solid #919B9C',
                borderTop: 'none',
                background: '#ECE9D8',
                padding: '12px',
                overflowY: 'auto',
                boxShadow: '-1px -1px 0 #fff inset, 1px 1px 0 #fff inset',
            }}>
                {activeTab === 'profile' && <ProfileTab />}
                {activeTab === 'education' && <EducationTab />}
                {activeTab === 'interest' && <InterestTab />}
            </div>

            {/* Bottom button row */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, marginTop: 8 }}>
                <button className="xp-button" style={{ width: 75 }} onClick={() => { }}>OK</button>
                <button className="xp-button" style={{ width: 75 }} onClick={() => { }}>Cancel</button>
                <button className="xp-button" style={{ width: 75, color: '#888' }} disabled>Apply</button>
            </div>
        </div>
    )
}

function ProfileTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                    width: 64, height: 64,
                    border: '2px solid #fff',
                    outline: '1px solid #ACA899',
                    background: '#fff',
                    padding: 2,
                }}>
                    <img src={asset('/img/user-profile.png')} alt="Thenuja" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                    <h2 style={{ margin: 0, fontSize: 16, fontWeight: 'bold', color: '#000' }}>Thenuja Hansana</h2>
                    <div style={{ fontSize: 11, color: '#333', marginTop: 2 }}>Full-Stack Developer</div>
                    <div style={{ fontSize: 11, color: '#333', marginTop: 2 }}>Location: Sri Lanka</div>
                </div>
            </div>

            <fieldset style={{ padding: '8px 10px', border: '1px solid #D5D5CF', borderRadius: 3, margin: '8px 0 0' }}>
                <legend style={{ fontSize: 11, color: '#1A66C4' }}>User Summary</legend>
                <div style={{ fontSize: 11, color: '#000', lineHeight: 1.5, background: '#fff', border: '1px solid #7F9DB9', padding: 6, height: 180, overflowY: 'auto' }}>
                    I'm a <span style={{ fontWeight: 'bold', color: '#000080' }}>19 yr old full stack developer</span> obsessed with building <span style={{ fontWeight: 'bold', color: '#000080' }}>scalable applications</span> with eye-catching frontend and rock-solid backend.
                    <br /><br />
                    And I also <span style={{ fontWeight: 'bold', color: '#000080' }}>teach students how to code</span> on <a href="#" target="_blank" rel="noreferrer" style={{ color: '#0000FF', textDecoration: 'underline' }}>YouTube</a>.
                    <br /><br />
                    When I'm not building, you'll probably find me grinding <a href="#" onClick={(e) => { e.preventDefault(); alert('🎉 SOLVED! (Simulated confetti)'); }} style={{ color: '#0000FF', cursor: 'pointer', textDecoration: 'underline' }}>LeetCode</a> and shipping <a href="#" onClick={(e) => { e.preventDefault(); if (window.openGamesMenu) window.openGamesMenu(); }} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#0000FF' }}>small video games</a> that I develop :)
                </div>
            </fieldset>
        </div>
    )
}

function EducationTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <fieldset style={{ padding: '12px 14px', border: '1px solid #D5D5CF', borderRadius: 3 }}>
                <legend style={{ fontSize: 11, color: '#1A66C4', fontWeight: 'bold' }}>Education</legend>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', borderBottom: '1px solid #ccc', paddingBottom: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 32, marginTop: 4 }}>🎓</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#000' }}>University of Westminster</div>
                        <div style={{ fontSize: 11, color: '#333', marginTop: 2 }}>Computer Science, Computer Software Engineering</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>2024 – 2028</div>

                        <div style={{ fontSize: 11, color: '#444', marginTop: 6 }}>
                            <strong>Activities and societies:</strong> Member Of IEEE Computer Science Society
                        </div>
                        <div style={{ fontSize: 11, color: '#222', marginTop: 6, lineHeight: 1.5 }}>
                            Pursuing a degree in Computer Science with a strong foundation in programming, problem-solving, and modern technologies. Passionate about software development and continuously building skills to apply in real-world projects.
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 32, marginTop: 4 }}>🎓</div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#000' }}>Informatics Institute of Technology (IIT Campus)</div>
                        <div style={{ fontSize: 11, color: '#333', marginTop: 2 }}>Foundation degree, Computer Science</div>
                        <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>Sep 2023 – Apr 2024</div>

                        <div style={{ fontSize: 11, color: '#444', marginTop: 6 }}>
                            <strong>Grade:</strong> Merit
                        </div>
                        <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>
                            <strong>Activities and societies:</strong> member of the English Club
                        </div>
                        <div style={{ fontSize: 11, color: '#222', marginTop: 6, lineHeight: 1.5 }}>
                            A comprehensive foundation degree program that introduced me to the core concepts of software engineering and programming, equipping me with the skills necessary to excel in my Bachelor's degree.
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

function InterestTab() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <fieldset style={{ padding: '12px 14px', border: '1px solid #D5D5CF', borderRadius: 3 }}>
                <legend style={{ fontSize: 11, color: '#1A66C4', fontWeight: 'bold' }}>Work Experience</legend>

                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 32, marginTop: 4 }}>💼</div>
                    <div style={{ flex: 1 }}>
                        {/* Company & role header */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 4 }}>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 'bold', color: '#000' }}>
                                    <a
                                        href="https://chasien.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{ color: '#0033CD', textDecoration: 'underline', cursor: 'pointer' }}
                                    >
                                        Chasien.com
                                    </a>
                                    <span style={{ color: '#555', fontWeight: 'normal', fontSize: 11, marginLeft: 6 }}>· Remote</span>
                                </div>
                                <div style={{ fontSize: 12, fontWeight: 'bold', color: '#333', marginTop: 2 }}>Junior Frontend Developer</div>
                            </div>
                            <div style={{ fontSize: 11, color: '#666', whiteSpace: 'nowrap' }}>Jul 2024 – Sep 2025</div>
                        </div>

                        {/* Responsibilities */}
                        <div style={{ marginTop: 10 }}>
                            <ul style={{ margin: 0, paddingLeft: 16, fontSize: 11, color: '#222', lineHeight: 1.7 }}>
                                <li>
                                    Contributed to frontend development of full-stack web applications using{' '}
                                    <strong>Next.js</strong> and <strong>React</strong>, delivering responsive,
                                    high-performance user interface designs using HTML, CSS, Tailwind CSS, and
                                    modern JavaScript (ES6+).
                                </li>
                                <li>
                                    Utilised frontend tools and workflows including <strong>TypeScript</strong>,
                                    Git, CI/CD pipelines, and modern build tools to maintain code quality and
                                    streamline delivery.
                                </li>
                            </ul>
                        </div>

                        {/* Tech tag row */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 10 }}>
                            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Git', 'CI/CD'].map(tag => (
                                <span key={tag} style={{
                                    background: '#EEF2FF',
                                    border: '1px solid #316AC5',
                                    borderRadius: 2,
                                    padding: '1px 6px',
                                    fontSize: 10,
                                    color: '#003399',
                                }}>{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    )
}

