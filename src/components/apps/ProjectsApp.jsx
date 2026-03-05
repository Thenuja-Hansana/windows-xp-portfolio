import { useState } from 'react';
import { asset } from '../../utils/assetPath';

const PROJECTS = [
    {
        id: 1,
        title: "Subscription Management Backend Platform",
        img: asset("/project_banner_subscription.png"),
        overview: "A production-ready REST API that allows users to manage and track subscriptions securely, featuring authentication, protected routes, and automated workflows.",
        tech: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT Auth", "bcrypt"],
        techColors: ["#68a063", "#888", "#47a248", "#880000", "#d4a017", "#c0392b"],
        architecture: [
            { icon: "🔀", label: "Routes", desc: "Define API endpoints" },
            { icon: "⚙️", label: "Controllers", desc: "Handle business logic" },
            { icon: "🗄️", label: "Models", desc: "Define database schemas" },
            { icon: "🛡️", label: "Middleware", desc: "Handle authentication and errors" },
            { icon: "🔧", label: "Config Layer", desc: "Manage environment variables and database connection" },
        ],
        security: [
            "Password hashing using bcrypt",
            "Token-based authentication using JWT",
            "Protected routes with middleware",
            "Secure environment variables for sensitive data",
            "Structured error handling to prevent data leak",
        ],
        links: [{ label: 'GitHub', url: '#', icon: '🐙' }],
        category: "Backend",
        categoryColor: "#2e7d32",
    },
    {
        id: 2,
        title: "Production API Automation & Deployment System",
        img: asset("/project_banner_devops.png"),
        overview: "A deployment focused project where a backend API is containerized and deployed using modern DevOps practices. The workflow includes CI/CD automation and structured production configuration to ensure reliable and consistent releases.",
        tech: ["Git", "GitHub Actions", "Docker", "Kubernetes", "IaC", "Linux"],
        techColors: ["#f05032", "#2088ff", "#0db7ed", "#326ce5", "#7b42bc", "#fcc624"],
        architecture: [
            { icon: "📁", label: "Source Control", desc: "Version-managed codebase with Git" },
            { icon: "🔄", label: "CI/CD Pipeline", desc: "Automated build and deployment workflows" },
            { icon: "🐳", label: "Containerization", desc: "Dockerized application for consistent environments" },
            { icon: "☸️", label: "Orchestration", desc: "Kubernetes-managed container deployment" },
            { icon: "🏗️", label: "Infrastructure Layer", desc: "Automated provisioning and configuration" },
        ],
        flow: "Code Push → CI Pipeline → Docker Build → Deploy → Live Environment",
        security: [
            "Environment-based configuration for sensitive variables",
            "Container isolation for secure runtime",
            "Automated build validation through CI checks",
            "Controlled deployment workflow via pipeline automation",
        ],
        links: [{ label: 'GitHub', url: '#', icon: '🐙' }],
        category: "DevOps",
        categoryColor: "#0277bd",
    },
    {
        id: 3,
        title: "Awwwards-Level Agency Website — Chasien",
        img: asset("/project_banner_agency.png"),
        overview: "A visually dynamic agency website designed to feel interactive and alive. Built using React and powered by GSAP animations, the project focuses on fluid motion, smooth transitions, and immersive scrolling effects to create a premium browsing experience.",
        tech: ["React", "Tailwind CSS", "GSAP", "HTML", "JavaScript", "CSS"],
        techColors: ["#61dafb", "#06b6d4", "#88ce02", "#e34c26", "#f7df1e", "#264de4"],
        animationInfo: [
            "Component-based UI structure with reusable design elements",
            "Interactive scroll-based animations using GSAP",
            "Smooth page transitions and visual effects",
            "Responsive design optimized for desktop and mobile",
            "Seamless deployment for public access",
        ],
        designApproach: "The project demonstrates attention to animated user experience and visual hierarchy, blending performance with aesthetics. Motion and transitions are crafted to elevate user engagement while maintaining usability.",
        links: [
            { label: 'GitHub', url: '#', icon: '🐙' },
            { label: 'Live Site', url: '#', icon: '🌐' },
        ],
        category: "Frontend",
        categoryColor: "#6a1b9a",
    },
    {
        id: 4,
        title: "Windows XP Retro Portfolio",
        img: asset("/project_banner_xp.png"),
        overview: "An interactive and nostalgic portfolio website designed to painstakingly recreate the classic Windows XP desktop experience. Built using React, this project features functional applications, authentic UI elements, and a fully interactive environment designed to engage visitors with a unique, memorable, and playful presentation of skills and projects.",
        tech: ["React", "Vite", "CSS", "HTML", "JavaScript"],
        techColors: ["#61dafb", "#646cff", "#264de4", "#e34c26", "#f7df1e"],
        animationInfo: [
            "Authentic Windows XP boot system and login sequences with classic sound effects",
            "Fully functional taskbar, Start menu, and draggable, resizable application windows",
            "Interactive desktop applications including a working Media Player, Contact form, and interactive folders",
            "Component-based UI structure for modular, maintainable, and reusable code",
            "Seamless integration of retro aesthetics with modern web performance",
        ],
        designApproach: "The project demonstrates a meticulous attention to detail in replicating the classic Windows XP aesthetic, blending nostalgic design with modern web technologies. Interactions, sounds, and visual elements are carefully crafted to provide an immersive user experience while effectively and creatively showcasing professional work and capabilities.",
        links: [
            { label: 'GitHub', url: 'https://github.com/Thenuja-Hansana/windows-xp-portfolio', icon: '🐙' },
            { label: 'Live Site', url: 'https://thenujahansana.dev/', icon: '🌐' },
        ],
        category: "Full Stack",
        categoryColor: "#00695c",
    },
    {
        id: 5,
        title: "Reqruita (SDGP) - Anti Cheating Interview Platform",
        img: asset("/project_banner_requita.png"),
        overview: "Building a Secure Interview platform to prevent candidates from cheating in their online interviews with a dashboard integrated for the HR team and for the interviewer to monitor, manage and evaluate candidates in real time.",
        tech: ["Electron.js", "React", "Node.js", "Express.js", "WebRTC", "CSS"],
        techColors: ["#47848F", "#61dafb", "#68a063", "#888", "#23ce6b", "#264de4"],
        architecture: [
            { icon: "🛡️", label: "Security Gate", desc: "Hardware validation before entry" },
            { icon: "🐚", label: "Electron Shell", desc: "Desktop locking & environment isolation" },
            { icon: "🌉", label: "IPC Bridge", desc: "Secure communication between processes" },
            { icon: "🎥", label: "WebRTC Engine", desc: "Real-time monitoring & screen sharing" },
            { icon: "📊", label: "HR Dashboard", desc: "Management & evaluation interface" },
        ],
        flow: "Validation → Environment Locking → Real-time Monitoring → Secure Evaluation",
        links: [
            { label: 'GitHub', url: 'https://github.com/Thenuja-Hansana/Reqruita-CS80', icon: '🐙' },
            { label: 'Live Site', url: 'https://reqruita.com/', icon: '🌐' },
        ],
        category: "Full Stack",
        categoryColor: "#1a5fa8",
    },
];

/* ── individual card ── */
function ProjectCard({ p }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="proj-card">
            {/* Banner */}
            <div className="proj-banner-wrap">
                <img src={p.img} alt={p.title} className="proj-banner-img" />
                <span className="proj-category-badge" style={{ background: p.categoryColor }}>
                    {p.category}
                </span>
            </div>

            {/* Body */}
            <div className="proj-body">
                <h3 className="proj-title">{p.title}</h3>

                {/* Overview */}
                <div className="proj-section">
                    <div className="proj-section-label">📋 Overview</div>
                    <p className="proj-text">{p.overview}</p>
                </div>

                {/* Tech Stack */}
                <div className="proj-section">
                    <div className="proj-section-label">🛠️ Tech Stack</div>
                    <div className="proj-tags">
                        {p.tech.map((t, i) => (
                            <span key={t} className="proj-tag" style={{ borderColor: p.techColors[i] || '#999', color: p.techColors[i] || '#333' }}>
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Read More toggle */}
                {!expanded && (p.architecture || p.flow || p.animationInfo || p.designApproach || p.security || (p.links && p.links.length > 0)) && (
                    <button className="proj-readmore-btn" onClick={() => setExpanded(true)}>
                        ▼ Read More...
                    </button>
                )}

                {/* Expanded Section */}
                {expanded && (
                    <div className="proj-expanded">
                        {/* Architecture */}
                        {p.architecture && (
                            <div className="proj-section">
                                <div className="proj-section-label">🏛️ Architecture</div>
                                <div className="proj-arch-list">
                                    {p.architecture.map((a, i) => (
                                        <div key={i} className="proj-arch-item">
                                            <span className="proj-arch-icon">{a.icon}</span>
                                            <div>
                                                <strong>{a.label}</strong>
                                                <span className="proj-arch-arrow"> → </span>
                                                <span className="proj-arch-desc">{a.desc}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Flow */}
                        {p.flow && (
                            <div className="proj-section">
                                <div className="proj-section-label">🔄 Deployment Flow</div>
                                <div className="proj-flow-banner">
                                    {p.flow.split(' → ').map((step, i, arr) => (
                                        <span key={i} className="proj-flow-group">
                                            <span className="proj-flow-step">{step}</span>
                                            {i < arr.length - 1 && <span className="proj-flow-arrow">→</span>}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Animation / Interaction Features */}
                        {p.animationInfo && (
                            <div className="proj-section">
                                <div className="proj-section-label">✨ Features & Interactions</div>
                                <ul className="proj-bullet-list">
                                    {p.animationInfo.map((a, i) => <li key={i}>{a}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Design Approach */}
                        {p.designApproach && (
                            <div className="proj-section">
                                <div className="proj-section-label">🎨 Design Approach</div>
                                <p className="proj-text proj-text-italic">{p.designApproach}</p>
                            </div>
                        )}

                        {/* Security */}
                        {p.security && (
                            <div className="proj-section">
                                <div className="proj-section-label">🔒 Security Features</div>
                                <ul className="proj-bullet-list">
                                    {p.security.map((s, i) => <li key={i}>{s}</li>)}
                                </ul>
                            </div>
                        )}

                        {/* Links */}
                        <div className="proj-section">
                            <div className="proj-section-label">🔗 Links</div>
                            <div className="proj-links">
                                {p.links.map(l => (
                                    <a key={l.label} href={l.url} className="proj-link-btn" target="_blank" rel="noreferrer">
                                        {l.icon} {l.label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <button className="proj-less-btn" onClick={() => setExpanded(false)}>
                            ▲ Show Less
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── container ── */
export default function ProjectsApp({ contentReady }) {
    return (
        <>
            <style>{`
                /* ── Scrollable Container ── */
                .proj-container {
                    flex: 1;
                    overflow-y: auto;
                    background: #d4d0c8;
                    padding: 16px;
                    height: 100%;
                    font-family: Tahoma, Geneva, sans-serif;
                }

                /* Slight XP inset scrollbar feel */
                .proj-container::-webkit-scrollbar { width: 16px; }
                .proj-container::-webkit-scrollbar-track { background: #d4d0c8; border-left: 1px solid #999; }
                .proj-container::-webkit-scrollbar-thumb { background: linear-gradient(to right, #e8e8e8, #c0c0c0, #a0a0a0); border: 1px solid #808080; }

                /* ── Header Banner ── */
                .proj-header {
                    background: linear-gradient(135deg, #1a5fa8 0%, #2d7dd2 50%, #1a5fa8 100%);
                    border: 2px solid #0a3d7a;
                    border-radius: 4px;
                    padding: 12px 20px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 2px 2px 4px rgba(0,0,0,0.3);
                }
                .proj-header-icon {
                    font-size: 28px;
                    filter: drop-shadow(0 2px 2px rgba(0,0,0,0.4));
                }
                .proj-header-title {
                    color: #fff;
                    font-size: 16px;
                    font-weight: bold;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                    letter-spacing: 0.3px;
                }
                .proj-header-sub {
                    color: rgba(255,255,255,0.8);
                    font-size: 11px;
                    margin-top: 2px;
                }

                /* ── Grid ── */
                .proj-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 16px;
                    align-content: start;
                    align-items: start;
                }

                /* ── Card ── */
                .proj-card {
                    background: #fff;
                    border: 1px solid #7f9db9;
                    border-radius: 3px;
                    box-shadow: 2px 2px 5px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.7);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    transition: box-shadow 0.2s, transform 0.2s;
                }
                .proj-card:hover {
                    box-shadow: 3px 3px 10px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.7);
                    transform: translateY(-1px);
                }

                /* ── Banner ── */
                .proj-banner-wrap {
                    position: relative;
                    width: 100%;
                    height: 170px;
                    overflow: hidden;
                    background: #1a1a2e;
                    flex-shrink: 0;
                }
                .proj-banner-img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                    transition: transform 0.4s ease;
                }
                .proj-card:hover .proj-banner-img {
                    transform: scale(1.04);
                }
                .proj-category-badge {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    color: #fff;
                    font-size: 10px;
                    font-weight: bold;
                    padding: 3px 8px;
                    border-radius: 10px;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.4);
                }

                /* ── Body ── */
                .proj-body {
                    padding: 14px 14px 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    flex: 1;
                }

                /* ── Title ── */
                .proj-title {
                    font-size: 13px;
                    font-weight: bold;
                    color: #003399;
                    margin: 0;
                    line-height: 1.35;
                    border-bottom: 1px solid #d0d7e5;
                    padding-bottom: 8px;
                }

                /* ── Section ── */
                .proj-section {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .proj-section-label {
                    font-size: 10.5px;
                    font-weight: bold;
                    color: #1a5fa8;
                    text-transform: uppercase;
                    letter-spacing: 0.4px;
                }
                .proj-text {
                    font-size: 11px;
                    color: #333;
                    line-height: 1.55;
                    margin: 0;
                }
                .proj-text-italic {
                    font-style: italic;
                    color: #555;
                }

                /* ── Tech Tags ── */
                .proj-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                }
                .proj-tag {
                    font-size: 10px;
                    padding: 2px 7px;
                    border: 1px solid;
                    border-radius: 2px;
                    background: #f7f7f7;
                    font-weight: bold;
                    white-space: nowrap;
                }

                /* ── Read More / Less ── */
                .proj-readmore-btn {
                    align-self: flex-start;
                    background: linear-gradient(to bottom, #f0f0f0, #d8d8d8);
                    border: 1px solid #999;
                    border-radius: 2px;
                    color: #003399;
                    font-size: 10.5px;
                    font-family: Tahoma, Geneva, sans-serif;
                    font-weight: bold;
                    padding: 3px 10px;
                    cursor: pointer;
                    margin-top: 4px;
                    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    transition: background 0.15s;
                }
                .proj-readmore-btn:hover {
                    background: linear-gradient(to bottom, #dce8f7, #b8d0ef);
                    border-color: #1a5fa8;
                }
                .proj-readmore-btn:active {
                    background: linear-gradient(to bottom, #c0d4ec, #9fc0e0);
                }

                .proj-less-btn {
                    align-self: flex-start;
                    background: linear-gradient(to bottom, #f0f0f0, #d8d8d8);
                    border: 1px solid #999;
                    border-radius: 2px;
                    color: #666;
                    font-size: 10.5px;
                    font-family: Tahoma, Geneva, sans-serif;
                    padding: 3px 10px;
                    cursor: pointer;
                    margin-top: 6px;
                    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                }
                .proj-less-btn:hover {
                    background: linear-gradient(to bottom, #e8e8e8, #c8c8c8);
                }

                /* ── Expanded Section ── */
                .proj-expanded {
                    border-top: 1px dashed #b0bdd6;
                    padding-top: 10px;
                    margin-top: 4px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                /* ── Architecture List ── */
                .proj-arch-list {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }
                .proj-arch-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 6px;
                    font-size: 11px;
                    color: #333;
                    line-height: 1.4;
                }
                .proj-arch-icon {
                    font-size: 13px;
                    flex-shrink: 0;
                    margin-top: 1px;
                }
                .proj-arch-arrow {
                    color: #1a5fa8;
                    font-weight: bold;
                }
                .proj-arch-desc {
                    color: #555;
                }

                /* ── Flow Banner ── */
                .proj-flow-banner {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    align-items: center;
                    background: #f0f4fb;
                    border: 1px solid #b0c4de;
                    border-radius: 3px;
                    padding: 8px 10px;
                }
                .proj-flow-group {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                .proj-flow-step {
                    background: #1a5fa8;
                    color: #fff;
                    font-size: 10px;
                    font-weight: bold;
                    padding: 2px 7px;
                    border-radius: 10px;
                    white-space: nowrap;
                }
                .proj-flow-arrow {
                    color: #1a5fa8;
                    font-weight: bold;
                    font-size: 12px;
                }

                /* ── Bullet List ── */
                .proj-bullet-list {
                    margin: 0;
                    padding-left: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }
                .proj-bullet-list li {
                    font-size: 11px;
                    color: #333;
                    line-height: 1.45;
                }

                /* ── Links ── */
                .proj-links {
                    display: flex;
                    gap: 6px;
                    flex-wrap: wrap;
                }
                .proj-link-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    background: linear-gradient(to bottom, #f5f5f5, #ddd);
                    border: 1px solid #888;
                    border-radius: 2px;
                    color: #003399;
                    text-decoration: none;
                    font-size: 11px;
                    font-family: Tahoma, Geneva, sans-serif;
                    font-weight: bold;
                    padding: 4px 12px;
                    box-shadow: 1px 1px 2px rgba(0,0,0,0.2);
                    transition: all 0.15s;
                }
                .proj-link-btn:hover {
                    background: linear-gradient(to bottom, #dce8f7, #b8d0ef);
                    border-color: #1a5fa8;
                    color: #001a7a;
                }

                /* ── Reveal animation ── */
                .xp-content-reveal { opacity: 0; transition: opacity 0.4s ease; }
                .xp-content-visible { opacity: 1; }
            `}</style>

            <div className={`proj-container xp-content-reveal ${contentReady ? 'xp-content-visible' : ''}`}>
                {/* Header */}
                <div className="proj-header">
                    <div className="proj-header-icon">💼</div>
                    <div>
                        <div className="proj-header-title">My Projects</div>
                        <div className="proj-header-sub">5 Projects · Click "Read More" on any card to expand full details</div>
                    </div>
                </div>

                {/* Grid */}
                <div className="proj-grid">
                    {PROJECTS.map(p => <ProjectCard key={p.id} p={p} />)}
                </div>
            </div>
        </>
    );
}
