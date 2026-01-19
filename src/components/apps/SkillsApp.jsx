const SKILLS = {
    '🌐 Frontend Development': ['React.js', 'Next.js', 'Vite', 'HTML5, CSS3, JavaScript (ES6+)', 'Tailwind CSS', 'Responsive UI Design', 'Component-Based Architecture', 'State Management & UI Logic'],
    '⚙️ Backend Development': ['Node.js', 'Express.js', 'REST API Design', 'Authentication & Authorization Systems', 'Background Jobs & Event-Driven Workflows', 'API Security & Validation', 'MVC / Layered Architecture'],
    '🗄️ Databases': ['MongoDB', 'PostgreSQL (via Supabase)', 'Mongoose ORM', 'Schema Design', 'CRUD Operations', 'Query Optimization'],
    '🔐 Authentication & Security': ['JWT Authentication', 'Password Hashing (bcrypt)', 'Protected Routes & Middleware', 'Secure Environment Variable Management', 'Role-Based Access Control (RBAC)', 'Error Handling & Data Protection'],
    '🚀 DevOps & Deployment': ['Docker (Containerization)', 'Kubernetes (Orchestration)', 'CI/CD Pipelines (GitHub Actions)', 'Linux Server Environments', 'VPS Deployment', 'Infrastructure as Code (IaC)', 'Automated Build & Release Pipelines'],
    '⚡ Real-Time & Automation Systems': ['Real-Time API Data Handling', 'Background Job Processing (Inngest)', 'Event-Driven Architecture', 'Automated Email Workflows', 'Alert & Notification Systems'],
    '🧠 AI & Data Integration': ['AI APIs (for stock insights & summaries)', 'External API Integration (Stock Market APIs)', 'Data Visualization (Charts & Graphs)', 'Intelligent Alert Systems'],
    '🎨 UI/UX & Interaction Design': ['GSAP Animations', 'Interactive Scroll Effects', 'Motion-Based UX', 'Retro UI Recreation (Windows XP UI)', 'Draggable & Resizable Windows', 'Custom UI Components', 'Visual Hierarchy & UX Principles'],
    '🛠️ Developer Tools': ['Git & GitHub', 'ESLint & Prettier', 'Docker CLI', 'Postman / API Testing', 'VS Code', 'Environment Configuration', 'Logging & Debugging'],
    '🤝 Soft / Engineering Skills': ['System Design & Architecture', 'Production-Ready Application', 'Problem Solving & Debugging', 'Code Maintainability & Modularity', 'Performance Optimization', 'Security-First Thinking', 'CI/CD & Deployment Automation', 'UX-Driven Development']
}

export default function SkillsApp() {
    return (
        <div style={{ padding: 16, background: '#ECE9D8', height: '100%', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {Object.entries(SKILLS).map(([cat, skills]) => (
                    <fieldset key={cat} style={{ padding: '12px 14px', border: '1px solid #D5D5CF', borderRadius: 3, background: '#fff' }}>
                        <legend style={{ fontSize: 11, color: '#1A66C4', fontWeight: 'bold', background: '#ECE9D8', padding: '0 4px', border: '1px solid #D5D5CF', borderRadius: 2 }}>{cat}</legend>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '6px 16px' }}>
                            {skills.map((name) => (
                                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <span style={{ color: '#E59700', fontSize: 14 }}>•</span>
                                    <span style={{ fontSize: 11, color: '#000' }}>{name}</span>
                                </div>
                            ))}
                        </div>
                    </fieldset>
                ))}
            </div>
        </div>
    )
}
